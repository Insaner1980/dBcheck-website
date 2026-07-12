---
title: "NIOSH vs OSHA Noise Exposure Limits"
description: "Compare NIOSH and OSHA noise limits, including criterion levels, exchange rates, dose, TWA, hearing conservation, and legal status."
slug: "niosh-vs-osha-noise-exposure-limits"
primaryIntent: "User wants to understand the practical difference between NIOSH and OSHA noise-exposure limits."
contentCluster: "Noise exposure and hearing risk"
researchSources:
  - "CDC/NIOSH, Understand Noise Exposure"
  - "CDC/NIOSH, Understanding Noise Exposure Limits"
  - "CDC/NIOSH, Noise-Induced Hearing Loss"
  - "CDC/NIOSH, Health Hazard Evaluation Report 2007-0235-3064"
  - "OSHA, 29 CFR 1910.95 Occupational Noise Exposure"
  - "OSHA, 29 CFR 1910.95 Appendix A Noise Exposure Computation"
  - "OSHA Technical Manual, Section III, Chapter 5"
  - "World Health Organization, Deafness and hearing loss: Safe listening"
  - "European Union, Directive 2003/10/EC noise exposure summary"
lastReviewed: "2026-07-12"
---

NIOSH and OSHA use different occupational noise limits. NIOSH recommends 85 dBA over eight hours with a 3 dB exchange rate. OSHA's permissible exposure limit for general industry is 90 dBA over eight hours with a 5 dB exchange rate. NIOSH is a health-based recommendation. OSHA is a legally enforceable standard for covered United States workplaces. [NIOSH][1] [OSHA][3]

The higher OSHA criterion does not mean that 90 dBA is biologically safer than 85 dBA. The two systems have different purposes, histories, and calculation rules.

[What Is a Safe Decibel Level?](/articles/what-is-a-safe-decibel-level/)
## NIOSH REL and OSHA PEL at a glance

| Feature | NIOSH | OSHA general industry |
|---|---|---|
| Main limit | 85 dBA for 8 hours | 90 dBA for 8 hours |
| Name | Recommended Exposure Limit, REL | Permissible Exposure Limit, PEL |
| Status | Health-based recommendation | Enforceable workplace regulation for covered employers |
| Exchange rate | 3 dB | 5 dB |
| 100% dose | 85 dBA for 8 hours | 90 dBA for 8 hours |
| Hearing conservation trigger | NIOSH recommends prevention at or above the REL | 85 dBA 8-hour TWA, equal to 50% OSHA dose |
| Time at 100 dBA for 100% dose | 15 minutes | 2 hours |

Sources: [NIOSH][1], [NIOSH limits][2], [OSHA][3], and [OSHA Appendix A][4].

The differences become especially important when a dosimeter, calculator, or report shows a percentage. A value of 100% means the allowance under the selected model has been reached. It does not have one universal meaning outside that model.

## What the NIOSH REL is

NIOSH is the National Institute for Occupational Safety and Health. It conducts research and publishes recommendations intended to prevent work-related injury and illness.

Its noise REL is 85 dBA as an eight-hour time-weighted average. NIOSH uses a 3 dB exchange rate, so every 3 dB increase halves the reference duration:

- 85 dBA for 8 hours
- 88 dBA for 4 hours
- 91 dBA for 2 hours
- 94 dBA for 1 hour
- 97 dBA for 30 minutes
- 100 dBA for 15 minutes

The 3 dB exchange rate follows the equal-energy relationship. A 3 dB increase approximately doubles sound energy, so the same reference dose is reached in half the time. [NIOSH limits][2]

NIOSH designed the REL to reduce the risk of material hearing impairment over a working lifetime. It does not eliminate all risk. NIOSH has reported residual estimated risk even at the 85 dBA criterion. [NIOSH hearing loss][5]

[Why Does 85 dB Matter?](/articles/why-does-85-db-matter/)
## What the OSHA PEL is

OSHA is the Occupational Safety and Health Administration. Its standards are legally enforceable in covered United States workplaces.

For general industry, OSHA's PEL is 90 dBA as an eight-hour TWA. OSHA uses a 5 dB exchange rate, so every 5 dB increase halves the permitted duration under the PEL table:

- 90 dBA for 8 hours
- 95 dBA for 4 hours
- 100 dBA for 2 hours
- 105 dBA for 1 hour
- 110 dBA for 30 minutes
- 115 dBA for 15 minutes

OSHA also requires a hearing conservation program when employee exposure reaches or exceeds an eight-hour TWA of 85 dBA. That action level is equivalent to 50% OSHA dose. [OSHA][3]

The action level and PEL serve different regulatory functions. The action level triggers hearing conservation requirements. The PEL is the permissible exposure limit used in the standard.

## Why the exchange rate changes the result

An exchange rate states how many decibels are needed to halve or double the reference time.

NIOSH uses 3 dB. OSHA uses 5 dB. As the sound level rises, the NIOSH allowance falls faster.

At 100 dBA:

- NIOSH reaches 100% dose in 15 minutes.
- OSHA reaches 100% PEL dose in 2 hours.

Two hours at 100 dBA is therefore 800% of the NIOSH daily dose because it is eight times the 15-minute NIOSH allowance. The same exposure is 100% under the OSHA PEL calculation.

This does not mean the exposure changes physically when the standard changes. The recorded sound is the same. The percentage changes because the criterion level and exchange rate are different.

[NIOSH Exposure Time at 85 dBA: How the Model Works](/articles/how-long-can-you-listen-at-85-db/)
## How the same 85 dBA shift appears under each system

Consider a constant eight-hour exposure at 85 dBA.

Under NIOSH:

- 85 dBA for 8 hours equals 100% dose.
- The exposure reaches the NIOSH REL.

Under OSHA:

- 85 dBA for 8 hours equals 50% OSHA dose.
- The exposure reaches OSHA's hearing conservation action level.
- It does not reach OSHA's 90 dBA PEL.

The same sound history can therefore be described as 100% NIOSH dose and 50% OSHA dose. A report that states only “dose 100%” or “dose 50%” is incomplete.

## TWA means different criterion math

Both systems use an eight-hour TWA, but their dose conversions differ.

OSHA publishes this relationship between dose and TWA:

$
TWA_{OSHA}=16.61\log_{10}\left(\frac{D}{100}\right)+90
$

The NIOSH relationship is:

$
TWA_{NIOSH}=10\log_{10}\left(\frac{D}{100}\right)+85
$

Sources: [OSHA Appendix A][4] and [NIOSH TWA][6].

At 100% dose, the OSHA equation returns 90 dBA and the NIOSH equation returns 85 dBA. The equations should not be mixed.

A dosimeter also needs the correct frequency weighting, measurement threshold, exchange rate, and criterion duration. Selecting a label in the interface without changing the calculation does not create a valid alternative standard.

## How dose is calculated from several periods

Both systems can combine exposure at several levels through a sum of time fractions:

$
D=100\left(\frac{C_1}{T_1}+\frac{C_2}{T_2}+\cdots+\frac{C_n}{T_n}\right)
$

The actual times $C_i$ may be the same in both calculations, but the reference times $T_i$ differ because NIOSH and OSHA use different criterion levels and exchange rates.

A worker might spend part of a shift near one machine and another part using a louder tool. The complete exposure should include both periods. A single measurement from the quieter task does not represent the full shift.

[What Is Noise Dose?](/articles/what-is-noise-dose/)
## NIOSH is a recommendation, OSHA is a legal standard

This distinction is central.

NIOSH recommendations are intended to guide prevention using current occupational health evidence. NIOSH does not enforce workplace compliance.

OSHA writes and enforces regulations under United States law. Its standard determines legal duties for employers and employees within its scope. State plans and industry-specific rules may add details or use other requirements.

A workplace may comply with the OSHA PEL while exceeding the more protective NIOSH REL. Legal compliance and the strongest available health recommendation are not the same claim.

OSHA's higher criterion also should not be described as a finding that 90 dBA for eight hours is safe. The PEL is a regulatory limit that includes feasibility considerations as well as worker protection.

## Who should use each framework

Use the NIOSH model when the purpose is health-based occupational risk reduction, educational comparison, or a conservative daily dose estimate under the NIOSH recommendation.

Use the OSHA model when assessing the specific requirements of the OSHA standard for a covered United States workplace. A compliant assessment requires the procedures, equipment, calibration, employee exposure evaluation, and documentation required for the task.

A phone app may help identify a possible concern. OSHA describes smartphone apps as rough screening tools and does not accept them as documentation of compliance. [OSHA manual][7]

[Phone Sound Meter vs Professional Sound Level Meter](/articles/phone-sound-meter-vs-professional-meter/)
## Neither system is a general recreational safety guarantee

NIOSH and OSHA were created for occupational settings. Their assumptions include work shifts, working lifetimes, employer controls, hearing conservation, exposure monitoring, and hearing protection.

A concert visitor, headphone user, musician, gamer, or home workshop user may still find the energy relationships informative, but the occupational limits should not be presented as personal guarantees.

WHO's recreational listening guidance uses a weekly model. For adults, WHO uses 80 dB for 40 hours per week as a reference allowance. Its examples include 85 dB for 12 hours and 30 minutes per week and 100 dB for 20 minutes per week. [WHO][8]

The WHO values should not be inserted into an OSHA or NIOSH daily dose calculation without a clearly defined method. They address a different time basis and use context.

## How EU occupational values differ

The European Union noise directive uses its own action and limit values:

- 80 dBA daily or weekly exposure as the lower action value
- 85 dBA as the upper action value
- 87 dBA as the exposure limit value, taking hearing-protector attenuation into account

The directive also includes peak action and limit values and requires attention to impulsive noise, vulnerable workers, ototoxic substances, and vibration. [EU][9]

These values are not alternate names for the NIOSH REL or OSHA PEL. An EU workplace assessment should follow the applicable European and national rules rather than substituting a United States table.

## Impulse noise remains a separate concern

NIOSH and OSHA duration tables focus on average exposure. Very short impacts or blasts need peak assessment as well.

Both organizations use a 140 dB peak ceiling for impulsive or impact noise. A peak below 140 dB is not automatically harmless. Risk can depend on the peak pressure, rise time, duration, repetition, spectrum, distance, protection, and continuous background exposure. [OSHA manual][7]

Ordinary phones may clip or compress high peaks. An app should not be used to prove that a gunshot, explosion, or firework stayed below a regulatory ceiling.

## Choose the standard before interpreting the number

A useful occupational noise result states:

- NIOSH or OSHA
- A-weighted average or eight-hour TWA
- exchange rate
- criterion level
- dose percentage
- measurement duration
- instrument and calibration information

Without those details, two percentages or exposure times may appear to conflict when they are simply based on different rules.

## Compare standards clearly in dBcheck

Use dBcheck's dosimeter to view an estimated exposure under either the NIOSH REL or OSHA PEL model. Keep the selected standard visible beside TWA, dose, projected dose, and remaining reference time. Use a calibrated professional system and the applicable legal procedure when the result must establish workplace compliance.

[Are Decibel Meter Apps Accurate?](/articles/are-decibel-meter-apps-accurate/)
[How to Measure Decibels With an Android Phone](/articles/how-to-measure-decibels-with-android-phone/)

## Sources

1. CDC/NIOSH, *Understand Noise Exposure*. [https://www.cdc.gov/niosh/noise/prevent/understand.html](https://www.cdc.gov/niosh/noise/prevent/understand.html)
2. CDC/NIOSH, *Understanding Noise Exposure Limits: Occupational vs. General Environmental Noise*. [https://www.cdc.gov/niosh/bulletin/2016/noise.html](https://www.cdc.gov/niosh/bulletin/2016/noise.html)
3. OSHA, *29 CFR 1910.95, Occupational Noise Exposure*. [https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95)
4. OSHA, *Appendix A to 29 CFR 1910.95, Noise Exposure Computation*. [https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95AppA](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95AppA)
5. CDC/NIOSH, *Noise-Induced Hearing Loss*. [https://www.cdc.gov/niosh/noise/about/noise.html](https://www.cdc.gov/niosh/noise/about/noise.html)
6. CDC/NIOSH, *Health Hazard Evaluation Report 2007-0235-3064*. [https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0235-3064.pdf](https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0235-3064.pdf)
7. OSHA Technical Manual, Section III, Chapter 5. [https://www.osha.gov/otm/section-3-health-hazards/chapter-5](https://www.osha.gov/otm/section-3-health-hazards/chapter-5)
8. World Health Organization, *Deafness and hearing loss: Safe listening*. [https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)
9. European Union, *Health and safety at work: exposure to noise*. [https://eur-lex.europa.eu/EN/legal-content/summary/health-and-safety-at-work-exposure-to-noise.html](https://eur-lex.europa.eu/EN/legal-content/summary/health-and-safety-at-work-exposure-to-noise.html)

[1]: https://www.cdc.gov/niosh/noise/prevent/understand.html
[2]: https://www.cdc.gov/niosh/bulletin/2016/noise.html
[3]: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95
[4]: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95AppA
[5]: https://www.cdc.gov/niosh/noise/about/noise.html
[6]: https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0235-3064.pdf
[7]: https://www.osha.gov/otm/section-3-health-hazards/chapter-5
[8]: https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening
[9]: https://eur-lex.europa.eu/EN/legal-content/summary/health-and-safety-at-work-exposure-to-noise.html
