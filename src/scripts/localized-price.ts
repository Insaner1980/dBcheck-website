import {
  getFreePriceForCountry,
  getProPriceForCountry,
  parseCloudflareTraceCountry,
  splitPriceDisplay,
} from '../data/prices';
import { scrambleValue } from './motion';

function renderPrice(element: HTMLElement, displayPrice: string) {
  const { prefix, amount, suffix } = splitPriceDisplay(displayPrice);
  const prefixElement = element.querySelector<HTMLElement>('[data-price-prefix]');
  const amountElement = element.querySelector<HTMLElement>('[data-price-amount]');
  const suffixElement = element.querySelector<HTMLElement>('[data-price-suffix]');

  if (!prefixElement || !amountElement || !suffixElement) return;

  prefixElement.textContent = prefix;
  suffixElement.textContent = suffix;
  scrambleValue(amountElement, amount);
}

const hasPriceTargets = (element: HTMLElement) =>
  ['prefix', 'amount', 'suffix'].every((part) => element.querySelector(`[data-price-${part}]`));

async function localizePrices() {
  const freePriceElement = document.querySelector<HTMLElement>('[data-localized-free-price]');
  const proPriceElement = document.querySelector<HTMLElement>('[data-localized-pro-price]');
  if (!freePriceElement || !proPriceElement) return;

  try {
    const response = await fetch('/cdn-cgi/trace', { cache: 'no-store' });
    if (!response.ok) return;

    const countryCode = parseCloudflareTraceCountry(await response.text());
    if (!hasPriceTargets(freePriceElement) || !hasPriceTargets(proPriceElement)) return;
    renderPrice(freePriceElement, getFreePriceForCountry(countryCode));
    renderPrice(proPriceElement, getProPriceForCountry(countryCode));
  } catch {
    // Staattinen EUR-hinta on tarkoituksellinen varavaihtoehto.
  }
}

queueMicrotask(() => {
  void localizePrices();
});
