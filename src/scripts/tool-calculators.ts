import { calculateDailyNoiseExposure } from '../lib/daily-noise-exposure.mjs';

const MAX_ROWS = 12;

const formatDecimal = (value: number, digits = 1, locale = 'en') => new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(Object.is(value, -0) ? 0 : value);
const formatSigned = (value: number, locale = 'en') => `${value < 0 ? '−' : value > 0 ? '+' : ''}${formatDecimal(Math.abs(value), 1, locale)}`;

let numberInputId = 0;

const updateNumberStepperState = (input: HTMLInputElement) => {
  const stepper = input.closest<HTMLElement>('[data-number-stepper]');
  const upButton = stepper?.querySelector<HTMLButtonElement>('[data-number-step="up"]');
  const downButton = stepper?.querySelector<HTMLButtonElement>('[data-number-step="down"]');
  if (!upButton || !downButton) return;

  const value = input.valueAsNumber;
  upButton.disabled = Number.isFinite(value) && input.max !== '' && value >= Number(input.max);
  downButton.disabled = Number.isFinite(value) && input.min !== '' && value <= Number(input.min);
};

const initializeNumberSteppers = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>('[data-number-stepper]').forEach((stepper) => {
    if (stepper.dataset.numberStepperReady === 'true') return;

    const label = stepper.querySelector<HTMLLabelElement>('[data-number-label]');
    const input = stepper.querySelector<HTMLInputElement>('input[type="number"]');
    const upButton = stepper.querySelector<HTMLButtonElement>('[data-number-step="up"]');
    const downButton = stepper.querySelector<HTMLButtonElement>('[data-number-step="down"]');
    if (!label || !input || !upButton || !downButton) return;

    numberInputId += 1;
    input.id = `calculator-number-${numberInputId}`;
    label.htmlFor = input.id;
    stepper.dataset.numberStepperReady = 'true';

    const changeByStep = (direction: 'up' | 'down') => {
      if (direction === 'up') input.stepUp();
      else input.stepDown();
      input.dispatchEvent(new Event('input', { bubbles: true }));
      updateNumberStepperState(input);
    };

    upButton.addEventListener('click', () => changeByStep('up'));
    downButton.addEventListener('click', () => changeByStep('down'));
    input.addEventListener('input', () => updateNumberStepperState(input));
    updateNumberStepperState(input);
  });
};

const initializeNoiseDoseCalculator = (calculator: HTMLElement) => {
  const form = calculator.querySelector<HTMLFormElement>('[data-noise-dose-form]');
  const list = calculator.querySelector<HTMLElement>('[data-exposure-list]');
  const template = calculator.querySelector<HTMLTemplateElement>('[data-exposure-template]');
  const addButton = calculator.querySelector<HTMLButtonElement>('[data-add-exposure]');
  const doseOutput = calculator.querySelector<HTMLElement>('[data-dose-output]');
  const doseDetail = calculator.querySelector<HTMLElement>('[data-dose-detail]');
  if (!form || !list || !template || !addButton || !doseOutput || !doseDetail) return;
  const rows = () => Array.from(list.querySelectorAll<HTMLElement>('[data-exposure-row]'));

  const updateRowControls = () => {
    const currentRows = rows();
    currentRows.forEach((row, index) => {
      const legend = row.querySelector('legend');
      const removeButton = row.querySelector<HTMLButtonElement>('[data-remove-exposure]');
      const durationInput = row.querySelector<HTMLInputElement>('[data-exposure-duration]');
      const durationUnit = row.querySelector<HTMLSelectElement>('[data-exposure-unit]');
      if (legend) legend.textContent = `Exposure period ${index + 1}`;
      if (removeButton) removeButton.disabled = currentRows.length === 1;
      if (durationInput) {
        durationInput.max = durationUnit?.value === 'minutes' ? '1440' : '24';
        updateNumberStepperState(durationInput);
      }
    });
    addButton.disabled = currentRows.length >= MAX_ROWS;
  };

  const update = () => {
    const periods = rows().map((row) => {
      const level = row.querySelector<HTMLInputElement>('[data-exposure-level]')?.valueAsNumber ?? Number.NaN;
      const duration = row.querySelector<HTMLInputElement>('[data-exposure-duration]')?.valueAsNumber ?? Number.NaN;
      const unit = row.querySelector<HTMLSelectElement>('[data-exposure-unit]')?.value;
      return { level, hours: unit === 'minutes' ? duration / 60 : duration };
    });

    if (periods.some(({ level, hours }) => !Number.isFinite(level) || !Number.isFinite(hours) || hours <= 0 || hours > 24)) {
      doseOutput.textContent = '—';
      doseDetail.textContent = 'Enter a valid level and duration for every period.';
      return;
    }
    if (periods.reduce((total, { hours }) => total + hours, 0) > 24) {
      doseOutput.textContent = '—';
      doseDetail.textContent = 'The combined daily duration cannot exceed 24 hours.';
      return;
    }

    const dose = periods.reduce((total, { level, hours }) => {
      const referenceHours = 8 * Math.pow(2, (85 - level) / 3);
      return total + (hours / referenceHours) * 100;
    }, 0);
    const digits = dose < 10 ? 2 : 1;
    doseOutput.textContent = `${formatDecimal(dose, digits)}%`;
    if (Math.abs(dose - 100) < 0.05) doseDetail.textContent = 'At 100% of the daily reference dose.';
    else if (dose < 100) doseDetail.textContent = `${formatDecimal(100 - dose, digits)} percentage points below the daily reference dose.`;
    else doseDetail.textContent = `${formatDecimal(dose - 100, digits)} percentage points above the daily reference dose.`;
  };

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('change', () => {
    updateRowControls();
    update();
  });
  addButton.addEventListener('click', () => {
    if (rows().length >= MAX_ROWS) return;
    list.append(template.content.cloneNode(true));
    initializeNumberSteppers(rows().at(-1) ?? list);
    updateRowControls();
    update();
    rows().at(-1)?.querySelector<HTMLInputElement>('input')?.focus();
  });
  list.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-remove-exposure]');
    if (!button || rows().length === 1) return;
    button.closest('[data-exposure-row]')?.remove();
    updateRowControls();
    update();
  });

  updateRowControls();
  update();
};

const initializeDistanceCalculator = (calculator: HTMLElement) => {
  const form = calculator.querySelector<HTMLFormElement>('[data-distance-form]');
  const levelInput = calculator.querySelector<HTMLInputElement>('[data-reference-level]');
  const referenceInput = calculator.querySelector<HTMLInputElement>('[data-reference-distance]');
  const targetInput = calculator.querySelector<HTMLInputElement>('[data-target-distance]');
  const levelOutput = calculator.querySelector<HTMLElement>('[data-distance-output]');
  const changeOutput = calculator.querySelector<HTMLElement>('[data-distance-change]');
  if (!form || !levelInput || !referenceInput || !targetInput || !levelOutput || !changeOutput) return;
  const locale = calculator.dataset.locale ?? 'en';

  const update = () => {
    const level = levelInput.valueAsNumber;
    const referenceDistance = referenceInput.valueAsNumber;
    const targetDistance = targetInput.valueAsNumber;
    if (![level, referenceDistance, targetDistance].every(Number.isFinite) || referenceDistance <= 0 || targetDistance <= 0) {
      levelOutput.textContent = '—';
      changeOutput.textContent = calculator.dataset.invalidMessage ?? '';
      return;
    }

    const change = -20 * Math.log10(targetDistance / referenceDistance);
    levelOutput.textContent = `${formatDecimal(level + change, 1, locale)} dB`;
    changeOutput.textContent = `${calculator.dataset.changeLabel}: ${formatSigned(change, locale)} dB`;
  };

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  update();
};

const initializeAddDecibelsCalculator = (calculator: HTMLElement) => {
  const form = calculator.querySelector<HTMLFormElement>('[data-add-decibels-form]');
  const list = calculator.querySelector<HTMLElement>('[data-level-list]');
  const template = calculator.querySelector<HTMLTemplateElement>('[data-level-template]');
  const addButton = calculator.querySelector<HTMLButtonElement>('[data-add-level]');
  const combinedOutput = calculator.querySelector<HTMLElement>('[data-combined-output]');
  const combinedDetail = calculator.querySelector<HTMLElement>('[data-combined-detail]');
  if (!form || !list || !template || !addButton || !combinedOutput || !combinedDetail) return;
  const locale = calculator.dataset.locale ?? 'en';

  const rows = () => Array.from(list.querySelectorAll<HTMLElement>('[data-level-row]'));

  const updateRowControls = () => {
    const currentRows = rows();
    currentRows.forEach((row, index) => {
      const legend = row.querySelector('legend');
      const removeButton = row.querySelector<HTMLButtonElement>('[data-remove-level]');
      if (legend) legend.textContent = `${calculator.dataset.rowLabel} ${index + 1}`;
      if (removeButton) removeButton.disabled = currentRows.length <= 2;
    });
    addButton.disabled = currentRows.length >= MAX_ROWS;
  };

  const update = () => {
    const levels = rows().map((row) => row.querySelector<HTMLInputElement>('[data-sound-level]')?.valueAsNumber ?? Number.NaN);
    if (levels.some((level) => !Number.isFinite(level))) {
      combinedOutput.textContent = '—';
      combinedDetail.textContent = calculator.dataset.invalidMessage ?? '';
      return;
    }

    const maximum = Math.max(...levels);
    const normalizedEnergy = levels.reduce((sum, level) => sum + Math.pow(10, (level - maximum) / 10), 0);
    const combined = maximum + 10 * Math.log10(normalizedEnergy);
    const value = formatDecimal(combined, 1, locale);
    combinedOutput.textContent = `${value} dB`;
    combinedDetail.textContent = (calculator.dataset.detailTemplate ?? '').replace('{count}', String(levels.length)).replace('{value}', value);
  };

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  addButton.addEventListener('click', () => {
    if (rows().length >= MAX_ROWS) return;
    list.append(template.content.cloneNode(true));
    initializeNumberSteppers(rows().at(-1) ?? list);
    updateRowControls();
    update();
    rows().at(-1)?.querySelector<HTMLInputElement>('input')?.focus();
  });
  list.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-remove-level]');
    if (!button || rows().length <= 2) return;
    button.closest('[data-level-row]')?.remove();
    updateRowControls();
    update();
  });

  updateRowControls();
  update();
};

const initializeDailyExposureCalculator = (calculator: HTMLElement) => {
  const form = calculator.querySelector<HTMLFormElement>('[data-daily-exposure-form]');
  const list = calculator.querySelector<HTMLElement>('[data-daily-period-list]');
  const template = calculator.querySelector<HTMLTemplateElement>('[data-daily-template]');
  const addButton = calculator.querySelector<HTMLButtonElement>('[data-add-daily]');
  const output = calculator.querySelector<HTMLElement>('[data-daily-output]');
  const category = calculator.querySelector<HTMLElement>('[data-daily-category]');
  const hoursOutput = calculator.querySelector<HTMLElement>('[data-daily-hours]');
  if (!form || !list || !template || !addButton || !output || !category || !hoursOutput) return;
  const locale = calculator.dataset.locale ?? 'en';
  const rows = () => Array.from(list.querySelectorAll<HTMLElement>('[data-daily-period]'));
  const updateControls = () => {
    const current = rows();
    current.forEach((row, index) => {
      const legend = row.querySelector('legend');
      const remove = row.querySelector<HTMLButtonElement>('[data-remove-daily]');
      const duration = row.querySelector<HTMLInputElement>('[data-daily-duration]');
      const unit = row.querySelector<HTMLSelectElement>('[data-daily-unit]');
      if (legend) legend.textContent = `${calculator.dataset.rowLabel} ${index + 1}`;
      if (remove) remove.disabled = current.length === 1;
      if (duration) { duration.max = unit?.value === 'minutes' ? '1440' : '24'; updateNumberStepperState(duration); }
    });
    addButton.disabled = current.length >= MAX_ROWS;
  };
  const update = () => {
    const periods = rows().map((row) => {
      const level = row.querySelector<HTMLInputElement>('[data-daily-level]')?.valueAsNumber ?? Number.NaN;
      const duration = row.querySelector<HTMLInputElement>('[data-daily-duration]')?.valueAsNumber ?? Number.NaN;
      const unit = row.querySelector<HTMLSelectElement>('[data-daily-unit]')?.value;
      return { level, hours: unit === 'minutes' ? duration / 60 : duration };
    });
    try {
      const result = calculateDailyNoiseExposure(periods);
      output.textContent = `${formatDecimal(result.lex8h, 1, locale)} dB(A)`;
      category.textContent = calculator.dataset[result.category === 'below-lower' ? 'categoryBelow' : result.category === 'lower' ? 'categoryLower' : 'categoryUpper'] ?? '';
      hoursOutput.textContent = `${calculator.dataset.hoursLabel}: ${formatDecimal(result.totalHours, 1, locale)} h`;
    } catch (error) {
      output.textContent = '—';
      category.textContent = error instanceof RangeError && error.message === 'duration-over-24h' ? calculator.dataset.durationMessage ?? '' : calculator.dataset.invalidMessage ?? '';
      hoursOutput.textContent = '';
    }
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('change', () => { updateControls(); update(); });
  addButton.addEventListener('click', () => { if (rows().length >= MAX_ROWS) return; list.append(template.content.cloneNode(true)); initializeNumberSteppers(rows().at(-1) ?? list); updateControls(); update(); rows().at(-1)?.querySelector<HTMLInputElement>('input')?.focus(); });
  list.addEventListener('click', (event) => { const button = (event.target as Element).closest<HTMLButtonElement>('[data-remove-daily]'); if (!button || rows().length === 1) return; button.closest('[data-daily-period]')?.remove(); updateControls(); update(); });
  updateControls(); update();
};

initializeNumberSteppers(document);
document.documentElement.classList.add('number-steppers-ready');
document.querySelectorAll<HTMLElement>('[data-noise-dose-calculator]').forEach(initializeNoiseDoseCalculator);
document.querySelectorAll<HTMLElement>('[data-distance-calculator]').forEach(initializeDistanceCalculator);
document.querySelectorAll<HTMLElement>('[data-add-decibels-calculator]').forEach(initializeAddDecibelsCalculator);
document.querySelectorAll<HTMLElement>('[data-daily-exposure-calculator]').forEach(initializeDailyExposureCalculator);
