const MAX_ROWS = 12;

const formatDecimal = (value: number, digits = 1) => value.toFixed(digits).replace('-0.0', '0.0');
const formatSigned = (value: number) => `${value < 0 ? '−' : value > 0 ? '+' : ''}${formatDecimal(Math.abs(value))}`;

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
      if (durationInput) durationInput.max = durationUnit?.value === 'minutes' ? '1440' : '24';
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

  const update = () => {
    const level = levelInput.valueAsNumber;
    const referenceDistance = referenceInput.valueAsNumber;
    const targetDistance = targetInput.valueAsNumber;
    if (![level, referenceDistance, targetDistance].every(Number.isFinite) || referenceDistance <= 0 || targetDistance <= 0) {
      levelOutput.textContent = '—';
      changeOutput.textContent = 'Enter valid positive distances and a reference level.';
      return;
    }

    const change = -20 * Math.log10(targetDistance / referenceDistance);
    levelOutput.textContent = `${formatDecimal(level + change)} dB`;
    changeOutput.textContent = `Change from reference: ${formatSigned(change)} dB`;
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

  const rows = () => Array.from(list.querySelectorAll<HTMLElement>('[data-level-row]'));

  const updateRowControls = () => {
    const currentRows = rows();
    currentRows.forEach((row, index) => {
      const legend = row.querySelector('legend');
      const removeButton = row.querySelector<HTMLButtonElement>('[data-remove-level]');
      if (legend) legend.textContent = `Sound level ${index + 1}`;
      if (removeButton) removeButton.disabled = currentRows.length <= 2;
    });
    addButton.disabled = currentRows.length >= MAX_ROWS;
  };

  const update = () => {
    const levels = rows().map((row) => row.querySelector<HTMLInputElement>('[data-sound-level]')?.valueAsNumber ?? Number.NaN);
    if (levels.some((level) => !Number.isFinite(level))) {
      combinedOutput.textContent = '—';
      combinedDetail.textContent = 'Enter a valid value for every sound level.';
      return;
    }

    const maximum = Math.max(...levels);
    const normalizedEnergy = levels.reduce((sum, level) => sum + Math.pow(10, (level - maximum) / 10), 0);
    const combined = maximum + 10 * Math.log10(normalizedEnergy);
    combinedOutput.textContent = `${formatDecimal(combined)} dB`;
    combinedDetail.textContent = `${levels.length} independent levels combine to ${formatDecimal(combined)} dB.`;
  };

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  addButton.addEventListener('click', () => {
    if (rows().length >= MAX_ROWS) return;
    list.append(template.content.cloneNode(true));
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

document.querySelectorAll<HTMLElement>('[data-noise-dose-calculator]').forEach(initializeNoiseDoseCalculator);
document.querySelectorAll<HTMLElement>('[data-distance-calculator]').forEach(initializeDistanceCalculator);
document.querySelectorAll<HTMLElement>('[data-add-decibels-calculator]').forEach(initializeAddDecibelsCalculator);
