---
title: "What Is Noise Dose?"
description: "What noise dose percentages mean, how sound level and exposure time accumulate, what 100% dose represents, and why NIOSH and OSHA dose values differ."
slug: "what-is-noise-dose"
locale: "en"
translationKey: "what-is-noise-dose"
clusterKey: "exposure"
primaryIntent: "User wants to understand noise dose percentages and how daily exposure accumulates."
contentCluster: "Noise exposure and hearing risk"
researchSources:
  - "CDC/NIOSH, Understand Noise Exposure"
  - "CDC/NIOSH, Health Hazard Evaluation Report 2011-0087-3241"
  - "CDC/NIOSH, Health Hazard Evaluation Report 2007-0235-3064"
  - "OSHA, 29 CFR 1910.95 Appendix A Noise Exposure Computation"
  - "OSHA, 29 CFR 1910.95 Occupational Noise Exposure"
  - "World Health Organization, Deafness and hearing loss: Safe listening"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-12"
---

Noise dose expresses accumulated sound exposure as a percentage of the allowance defined by a selected standard. It combines sound level and exposure time into one value. Under the NIOSH occupational model, eight hours at 85 dBA equals 100% daily dose. Under OSHA's permissible exposure limit calculation, eight hours at 90 dBA equals 100% dose. [NIOSH][1] [OSHA][4]

A dose percentage is not a measurement of biological damage. It shows how exposure compares with a named risk-management criterion.

[What Is a Safe Decibel Level?](/articles/what-is-a-safe-decibel-level/)
## How level and time become one percentage

Each period of noise uses part of the exposure allowance for its level. The louder the sound, the shorter the reference duration under the selected model.

The general dose formula is:

$
D=100\left(\frac{C_1}{T_1}+\frac{C_2}{T_2}+\cdots+\frac{C_n}{T_n}\right)
$

where:

- $D$ is the dose percentage
- $C_i$ is the actual time spent at a sound level
- $T_i$ is the full reference duration allowed at that level under the selected standard

Source: [NIOSH formula][2] and [OSHA Appendix A][3].

If a person spends half of the allowed duration at one level, that period contributes 50% dose. If another period contributes a further 50%, the combined dose is 100%.

## A simple NIOSH dose example

Under NIOSH guidance:

- 85 dBA for 8 hours equals 100% dose
- 88 dBA for 4 hours equals 100% dose
- 91 dBA for 2 hours equals 100% dose
- 94 dBA for 1 hour equals 100% dose

Suppose a day includes:

- 4 hours at 85 dBA
- 30 minutes at 94 dBA

The first period uses half of its eight-hour reference duration:

$
\frac{4}{8}=0.5
$

The second period uses half of its one-hour reference duration:

$
\frac{0.5}{1}=0.5
$

The combined dose is:

$
100(0.5+0.5)=100\%
$

This does not mean the two sound environments were identical. It means they contributed the same fraction of the NIOSH daily reference dose.

## What 100% dose means

A 100% dose means that the allowance defined by the selected standard has been fully used.

Under NIOSH, 100% daily dose is equivalent to eight hours at 85 dBA or another energy-equivalent combination under its 3 dB exchange rate. A result above 100% exceeds the NIOSH recommended daily limit. [NIOSH][1]

Under OSHA's permissible exposure limit, 100% dose is equivalent to eight hours at 90 dBA under its 5 dB exchange rate. OSHA's hearing conservation action level is an eight-hour TWA of 85 dBA, which corresponds to 50% OSHA dose. [OSHA standard][4]

The standard must therefore be stated beside the percentage. “100% dose” is incomplete if the reader cannot tell whether the calculation uses NIOSH, OSHA, or another framework.

## Dose is not a hearing-damage score

A dose of 100% does not mean that a person's hearing is 100% damaged. A dose of 40% does not prove that no injury occurred.

Noise dose has several limits:

- it compares exposure with a population-level criterion
- it cannot measure injury inside the ear
- it cannot account precisely for individual susceptibility
- it can be wrong when the sound measurement is wrong
- an average dose may not fully describe a very intense impulse
- it does not diagnose hearing loss or acoustic trauma

The most accurate wording is that a person has used a stated percentage of the selected exposure allowance.

## Why the NIOSH 3 dB exchange rate changes dose quickly

NIOSH halves the reference duration for each 3 dB increase. This follows the approximate doubling of sound energy.

Consider one hour of exposure:

| Level | Full NIOSH reference duration | Dose from one hour |
|---:|---:|---:|
| 85 dBA | 8 hours | 12.5% |
| 88 dBA | 4 hours | 25% |
| 91 dBA | 2 hours | 50% |
| 94 dBA | 1 hour | 100% |
| 97 dBA | 30 minutes | 200% |

The table shows why a few decibels can make a large difference. One hour at 94 dBA reaches the full NIOSH daily dose. One hour at 97 dBA reaches twice that allowance.

These percentages apply to average A-weighted exposure under the NIOSH model. They are not a complete assessment of blasts, gunshots, fireworks, or other impulses.

[Why Does 85 dB Matter?](/articles/why-does-85-db-matter/)
[NIOSH Exposure Time at 85 dBA: How the Model Works](/articles/how-long-can-you-listen-at-85-db/)
## Daily exposure can come from several places

Dose accumulates across separate periods. A workplace measurement does not make sound from a commute, power tools, headphones, or an evening event disappear biologically.

A calculator may combine several periods when each has a representative average level and duration. For example:

- 2 hours at 88 dBA contributes 50% NIOSH dose
- 1 hour at 91 dBA contributes 50%
- the combined NIOSH daily dose is 100%

The same exposure history can be divided into more periods without changing the result, provided the level and time estimates remain correct.

A brief sample should not be projected across an entire day unless it represents the later exposure. A five-minute reading from the loudest part of a shift may overstate the full-day average. A reading from a quiet break may understate it.

## Actual dose and projected dose are different

Actual dose is calculated from exposure that has already occurred during the measured period.

Projected dose estimates what the dose could become if an assumed exposure pattern continues to the end of a reference period. A dosimeter might project an early part of a work shift to eight hours, for example.

A projection depends on its assumptions. If the sound level changes later, the projected value may rise or fall. A responsible display should identify:

- the standard being used
- the reference period
- how much time has actually been measured
- the assumption used for the remaining time

Projected dose should not be described as exposure that has already happened. It should also not be treated as a prediction of hearing damage.

## How TWA relates to noise dose

TWA, or time-weighted average, expresses a varying workday as an equivalent eight-hour level under a specified model.

For OSHA dose, the published conversion is:

$
TWA_{OSHA}=16.61\log_{10}\left(\frac{D}{100}\right)+90
$

For NIOSH dose, the corresponding conversion is:

$
TWA_{NIOSH}=10\log_{10}\left(\frac{D}{100}\right)+85
$

Sources: [OSHA Appendix A][3] and [NIOSH TWA][5].

At 100% dose, the formulas return the criterion level for each system:

- 90 dBA for OSHA
- 85 dBA for NIOSH

The formulas are not interchangeable. An OSHA dose percentage should be converted with the OSHA relationship, and a NIOSH dose percentage with the NIOSH relationship.

## Why NIOSH and OSHA dose values differ

NIOSH and OSHA use different criterion levels and exchange rates.

| Feature | NIOSH | OSHA general industry PEL |
|---|---|---|
| Criterion level | 85 dBA for 8 hours | 90 dBA for 8 hours |
| Exchange rate | 3 dB | 5 dB |
| 100% dose | 85 dBA for 8 hours | 90 dBA for 8 hours |
| Main status | Recommended exposure limit | Legally enforceable rule in covered United States workplaces |

Eight hours at 85 dBA equals 100% NIOSH dose but 50% OSHA dose. At higher levels, the difference grows because NIOSH halves the reference time after every 3 dB increase, while OSHA halves it after every 5 dB increase.

A device should never show a dose percentage without identifying the standard. Switching the selected standard can change the result even though the recorded sound has not changed.

[NIOSH vs OSHA Noise Exposure Limits](/articles/niosh-vs-osha-noise-exposure-limits/)
## WHO uses a different time basis

WHO's adult recreational listening guidance uses a weekly allowance, with 80 dB for 40 hours per week as its reference. [WHO][6]

A weekly recreational allowance is not the same quantity as a NIOSH or OSHA daily occupational dose. The percentages should not be combined without a carefully defined conversion and purpose.

A person can still receive exposure from work and recreation during the same week. The reporting systems remain separate even though total sound exposure is cumulative.

## Measurement quality limits the dose calculation

A dose calculation cannot correct an inaccurate input.

A phone reading can be affected by microphone sensitivity, automatic gain control, frequency response, calibration, orientation, wind, room reflections, and high-level clipping. An app may also use the wrong weighting, averaging method, or threshold for the selected standard.

The input should be an A-weighted average or a sequence of representative A-weighted measurements. One rapidly changing live value should not be treated as a stable exposure level.

A phone may be useful for awareness and broad comparisons. Professional measurement is needed when the result establishes workplace compliance, determines engineering controls, or supports another high-consequence decision.

[Are Decibel Meter Apps Accurate?](/articles/are-decibel-meter-apps-accurate/)
[How to Measure Decibels With an Android Phone](/articles/how-to-measure-decibels-with-android-phone/)
## Use dose to guide decisions, not diagnose injury

Noise dose is useful for identifying how quickly exposure is accumulating, comparing different work patterns, and deciding when to reduce level or duration.

Practical responses can include increasing distance, lowering the source level, taking quieter breaks, changing the schedule, using correctly fitted hearing protection, or arranging a professional noise assessment.

The percentage should remain tied to the selected standard and measurement period. It should never be presented as a direct percentage of hearing damage.

## Combine sessions with dBcheck

Use dBcheck's dosimeter, history, and exposure analytics to track estimated dose across measured sessions under a named standard. The planned Noise Dose Calculator can combine several level and duration pairs. Treat the result as a comparison with the selected guideline, and keep actual dose separate from any projected value.

## Sources

1. CDC/NIOSH, *Understand Noise Exposure*. [https://www.cdc.gov/niosh/noise/prevent/understand.html](https://www.cdc.gov/niosh/noise/prevent/understand.html)
2. CDC/NIOSH, *Health Hazard Evaluation Report 2011-0087-3241*. [https://www.cdc.gov/niosh/hhe/reports/pdfs/2011-0087-3241.pdf](https://www.cdc.gov/niosh/hhe/reports/pdfs/2011-0087-3241.pdf)
3. OSHA, *Appendix A to 29 CFR 1910.95, Noise Exposure Computation*. [https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95AppA](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95AppA)
4. OSHA, *29 CFR 1910.95, Occupational Noise Exposure*. [https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95)
5. CDC/NIOSH, *Health Hazard Evaluation Report 2007-0235-3064*. [https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0235-3064.pdf](https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0235-3064.pdf)
6. World Health Organization, *Deafness and hearing loss: Safe listening*. [https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)

[1]: https://www.cdc.gov/niosh/noise/prevent/understand.html
[2]: https://www.cdc.gov/niosh/hhe/reports/pdfs/2011-0087-3241.pdf
[3]: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95AppA
[4]: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.95
[5]: https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0235-3064.pdf
[6]: https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening
