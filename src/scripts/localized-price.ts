import {
  getFreePriceForCountry,
  getProPriceForCountry,
  parseCloudflareTraceCountry,
  splitPriceDisplay,
} from '../data/prices';

function renderPrice(element: HTMLElement, displayPrice: string) {
  const { prefix, amount, suffix } = splitPriceDisplay(displayPrice);
  const prefixElement = element.querySelector<HTMLElement>('[data-price-prefix]');
  const amountElement = element.querySelector<HTMLElement>('[data-price-amount]');
  const suffixElement = element.querySelector<HTMLElement>('[data-price-suffix]');

  if (!prefixElement || !amountElement || !suffixElement) return;

  prefixElement.textContent = prefix;
  amountElement.textContent = amount;
  suffixElement.textContent = suffix;
}

async function localizePrices() {
  const freePriceElement = document.querySelector<HTMLElement>('[data-localized-free-price]');
  const proPriceElement = document.querySelector<HTMLElement>('[data-localized-pro-price]');
  if (!freePriceElement || !proPriceElement) return;

  try {
    const response = await fetch('/cdn-cgi/trace', { cache: 'no-store' });
    if (!response.ok) return;

    const countryCode = parseCloudflareTraceCountry(await response.text());
    renderPrice(freePriceElement, getFreePriceForCountry(countryCode));
    renderPrice(proPriceElement, getProPriceForCountry(countryCode));
  } catch {
    // Staattinen EUR-hinta on tarkoituksellinen varavaihtoehto.
  }
}

void localizePrices();
