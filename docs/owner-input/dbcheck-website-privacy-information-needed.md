# dBcheck website privacy information still needed

Google Analytics 4 and Cloudflare Web Analytics are disabled. The website no longer needs an analytics consent panel or GA4-specific privacy disclosures.

The following owner-controlled facts are still required before complete English and German website privacy or provider-information pages can be published. No placeholders or guessed personal details should be added to production pages.

## 1. Controller identity approved for publication

1. **Missing fact:** The exact natural-person or legal-entity identity that the owner approves for publication as the controller of `dbcheck.app`.
2. **Why it is needed:** Finnvek is currently a brand rather than a separate legal person. A brand name alone does not identify the natural-person controller.
3. **Where Codex searched:** The website checkout and Git history, the dBcheck Android checkout and privacy draft, the live dBcheck and Finnvek sites, and the site audit.
4. **Related facts found:** The owner has no registered business entity for Finnvek and has approved `contact@finnvek.com` as the public privacy contact. Existing Finnvek material contains a personal operator identity, but the owner has not approved publishing that identity on `dbcheck.app`.
5. **Blocked page:** English and German website privacy pages and any separate provider-information page.
6. **Example answer type:** “Publish this exact real person or legal entity as the controller: [owner-approved identity].”

## 2. Provider-information geographical address or applicability decision

1. **Missing fact:** An exact geographical address approved for any legally required provider information, or a qualified legal decision that a separate provider-information page is not required for this publication.
2. **Why it is needed:** `Turku, Finland` is not a complete geographical address, and a home or other personal address must not be guessed or copied without approval.
3. **Where Codex searched:** Both repositories, Git history, the live sites, the audit, and current Finnish provider-information requirements.
4. **Related facts found:** The public contact is `contact@finnvek.com`. No separate business or service address was found or approved.
5. **Blocked page:** A separate provider-information page. This does not by itself require placing a home address on the privacy page.
6. **Example answer type:** “Use this exact legitimate service address: [owner-approved address],” or “Qualified counsel confirms that no separate provider-information page is required.”

## Confirmed technical facts

- No Google Analytics 4 tag, request, event, or cookie is configured in the website source.
- Cloudflare Web Analytics is disabled.
- Cloudflare hosts and secures the static website under its standard account terms; no separately negotiated Google or Cloudflare agreement exists.
- Customer-configured Workers Logs, Workers Traces, Log Explorer, and Logpush are not enabled for `dbcheck.app`.
- The website has no submitted web form and does not request microphone or other browser permissions.
