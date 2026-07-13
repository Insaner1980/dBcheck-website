import {
  getProPriceForCountry,
  parseCloudflareTraceCountry,
  splitPriceDisplay,
} from '../data/prices';

function renderPrice(element: HTMLElement, displayPrice: string) {
  const { prefix, amount, suffix } = splitPriceDisplay(displayPrice);
  const priceParts = [];
  if (prefix) {
    priceParts.push(Object.assign(document.createElement('span'), {
      className: 'plan-cur', textContent: prefix,
    }));
  }
  priceParts.push(Object.assign(document.createElement('span'), {
      className: 'plan-amount',
      textContent: amount,
  }));
  if (suffix) {
    priceParts.push(Object.assign(document.createElement('span'), {
      className: 'plan-cur', textContent: suffix,
    }));
  }
  element.replaceChildren(...priceParts);
}

async function localizeProPrice() {
  const priceElement = document.querySelector<HTMLElement>('[data-localized-pro-price]');
  if (!priceElement) return;

  try {
    const response = await fetch('/cdn-cgi/trace', { cache: 'no-store' });
    if (!response.ok) return;

    const countryCode = parseCloudflareTraceCountry(await response.text());
    renderPrice(priceElement, getProPriceForCountry(countryCode));
  } catch {
    // Staattinen EUR-hinta on tarkoituksellinen varavaihtoehto.
  }
}

void localizeProPrice();
