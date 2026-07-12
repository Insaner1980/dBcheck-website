---
title: "NIOSH Exposure Time at 85 dBA: How the Model Works"
description: "How the NIOSH 85 dBA model calculates occupational exposure time from 85 to 115 dBA, and why the result is not a personal safety guarantee."
slug: "how-long-can-you-listen-at-85-db"
primaryIntent: "User wants the NIOSH occupational exposure time for 85 dBA and nearby average sound levels."
contentCluster: "Noise exposure and hearing risk"
researchSources:
  - "CDC/NIOSH, Understand Noise Exposure"
  - "CDC/NIOSH, Understanding Noise Exposure Limits"
  - "CDC/NIOSH, Health Hazard Evaluation Report 2011-0087-3241"
  - "World Health Organization, Deafness and hearing loss: Safe listening"
  - "OSHA Technical Manual, Section III, Chapter 5"
  - "NIDCD, Noise-Induced Hearing Loss"
lastReviewed: "2026-07-12"
---

Under NIOSH occupational guidance, a constant 85 dBA exposure reaches 100% of the recommended daily noise dose in eight hours. That does not mean eight hours is guaranteed to be harmless for every person. It is a population-level risk-management limit for occupational exposure, based on an A-weighted average and a 3 dB exchange rate. [NIOSH][1]

The title uses the common search wording 85 dB, but the NIOSH value is specifically 85 dBA. A live, maximum, or peak reading is not automatically equivalent to an eight-hour A-weighted average.

[What Is a Safe Decibel Level?](/articles/what-is-a-safe-decibel-level/)
## The practical answer at 85 dBA

Eight hours at a steady 85 dBA equals 100% of the NIOSH daily dose. A four-hour exposure at the same level equals 50% of that reference dose. Two hours equals 25%.

Those percentages assume the exposure is measured and calculated according to the NIOSH framework. They do not measure biological damage, and they do not include other loud periods unless those periods are added to the calculation.

A person who spends four hours at 85 dBA and later uses loud tools, attends a concert, or listens through headphones has more total exposure than the first four-hour period alone indicates.

## NIOSH exposure times from 85 to 115 dBA

NIOSH uses a 3 dB exchange rate. Every 3 dB increase halves the time needed to reach the same daily reference dose.

| Average A-weighted level | Time to 100% NIOSH daily dose | Source status |
|---:|---:|---|
| 85 dBA | 8 hours | Published NIOSH table |
| 88 dBA | 4 hours | Published NIOSH table |
| 91 dBA | 2 hours | Published NIOSH table |
| 94 dBA | 1 hour | Published NIOSH table |
| 97 dBA | 30 minutes | Published NIOSH table |
| 100 dBA | 15 minutes | Published NIOSH table |
| 103 dBA | 7 minutes 30 seconds | Derived from the NIOSH formula |
| 106 dBA | 3 minutes 45 seconds | Derived from the NIOSH formula |
| 109 dBA | 1 minute 52.5 seconds | Derived from the NIOSH formula |
| 112 dBA | 56.25 seconds | Derived from the NIOSH formula |
| 115 dBA | 28.125 seconds | Derived from the NIOSH formula |

The commonly published NIOSH consumer table stops at 100 dBA. The values from 103 to 115 dBA are mathematical extensions of the official NIOSH reference-duration formula, not separate promises that those periods are acceptable for every sound or listener. [NIOSH table][2] [NIOSH formula][3]

At very high levels, several cautions become more important:

- a small measurement error changes the calculated time substantially
- many phone microphones compress or clip
- the sound may include peaks that need separate assessment
- the source may be impulsive rather than continuous
- existing exposure from the rest of the day still counts

## The formula behind the table

The NIOSH reference duration is:

$
T(L)=\frac{480}{2^{(L-85)/3}}\text{ minutes}
$

where $L$ is the average A-weighted level in dBA. [NIOSH formula][3]

At 85 dBA, the exponent is zero, so the result is 480 minutes, or eight hours. At 88 dBA, the level is 3 dB higher, so the denominator becomes 2 and the duration falls to 240 minutes. At 91 dBA, it falls to 120 minutes.

The formula describes equal-energy accumulation under the NIOSH occupational model. It should not be used as the sole assessment of gunshots, explosions, fireworks, or other short impulses.

[Is 3 dB Twice as Loud? Sound Energy vs Perceived Loudness](/articles/is-3-db-twice-as-loud/)
## What 100% noise dose means

A 100% NIOSH dose means that the daily exposure allowance under the NIOSH recommended limit has been fully used.

It does not mean that hearing damage definitely occurred. It also does not mean that a dose of 90% proves the day was harmless. Noise dose is a comparison with a selected exposure criterion, not a medical test.

NIOSH estimates residual lifetime risk even at its recommended 85 dBA criterion. Individual susceptibility, previous exposure, frequency content, hearing protection, and measurement uncertainty all affect the real situation.

[What Is Noise Dose?](/articles/what-is-noise-dose/)
## How several exposure periods add together

Exposure periods are added as fractions of the time allowed at each level:

$
D=100\left(\frac{C_1}{T_1}+\frac{C_2}{T_2}+\cdots+\frac{C_n}{T_n}\right)
$

Here, $C_i$ is the actual time at a level and $T_i$ is the NIOSH reference duration for that level.

Consider this example:

- 2 hours at 88 dBA uses 50% of the daily dose because 4 hours is the full reference duration.
- 1 hour at 91 dBA uses another 50% because 2 hours is the full reference duration.
- The combined dose is 100%.

Another combination produces the same total:

- 4 hours at 85 dBA uses 50%.
- 30 minutes at 94 dBA uses 50%.
- The combined dose is 100%.

The order of the periods does not change the energy-based calculation. The total exposure still matters, along with sound character and peak information that the dose model may not fully describe.

## Why the table is not a personal safety guarantee

The table is designed for occupational risk management. It does not predict whether one person will experience an injury after a specific exposure.

Several limitations prevent that interpretation:

**Susceptibility varies.** People exposed to the same level and duration may not have the same outcome.

**Dose is incomplete for impulses.** A brief blast may require peak measurement and separate assessment even when its contribution to an eight-hour average appears limited.

**Measurement uncertainty can be large.** Phone model, calibration, microphone processing, position, wind, room reflections, and overload can change the result.

**Previous exposure matters.** The table does not know what happened earlier in the day, during previous days, or in other environments.

**Hearing protection is not a simple subtraction.** Real attenuation depends on the protector, fit, frequency, and correct use.

A responsible presentation therefore uses “time to 100% NIOSH daily dose” or “NIOSH recommended exposure time,” rather than promising a safe listening time.

## WHO recreational guidance uses a weekly model

WHO's adult recreational listening guidance uses 80 dB for 40 hours per week as its reference allowance. Its examples list 85 dB for 12 hours and 30 minutes per week, 100 dB for 20 minutes per week, and 110 dB for 2.5 minutes per week. [WHO][4]

These values should not be mixed with the NIOSH daily table. WHO addresses recreational sound across a week, while NIOSH addresses occupational exposure across an eight-hour workday and working lifetime.

The body's sound exposure can still come from both settings. A person may receive noise at work, during travel, through headphones, and at an event. The reporting frameworks differ even though the exposures all reach the same ears.

## Continuous noise and impulse noise need different caution

The NIOSH duration table is most useful for average A-weighted exposure. It is not a complete rule for an explosion, gunshot, firework, or sharp impact.

Impulse risk depends on the peak pressure, rise time, duration, repetition, spectrum, distance, and protection. NIOSH and OSHA guidance uses a 140 dB peak ceiling, but peaks below that value are not automatically harmless. [OSHA][5]

A normal phone may underreport the true peak. Do not move closer to an impulse source to test the phone or to obtain a more dramatic number.

## Using a phone measurement for exposure tracking

A smartphone can help identify broad patterns when the measurement procedure is consistent. Use an A-weighted equivalent or average level over a representative period, not one momentary value.

Record:

- phone and app
- calibration state
- A-weighting and averaging period
- distance and position
- measurement duration
- source conditions
- signs of clipping or overload

An estimate far above the reference range can support a decision to reduce exposure. A result close to a boundary should not decide workplace compliance or personal safety. Professional equipment is appropriate when the result affects legal duties, engineering controls, or another high-consequence decision.

[Are Decibel Meter Apps Accurate?](/articles/are-decibel-meter-apps-accurate/)
[How to Measure Decibels With an Android Phone](/articles/how-to-measure-decibels-with-android-phone/)
## Reduce uncertainty before relying on the time

The calculated duration is only as reliable as the input. A stable LAeq from a suitable calibrated meter is more useful than a rapidly changing number on an unverified phone.

At 100 dBA, an error of 3 dB changes the NIOSH reference time by a factor of two. A system that reports 100 dBA when the actual average is 103 dBA would indicate 15 minutes instead of 7 minutes 30 seconds.

This sensitivity is one reason to reduce exposure rather than trying to use every remaining minute shown by a calculator.

## Compare exposure with the correct reference

Use dBcheck's live meter and dosimeter to follow an estimated A-weighted session and view accumulated dose under a named standard. The Safe Exposure Time Calculator can show the time to 100% NIOSH reference dose for a stable average level. Neither result can guarantee that the exposure is harmless, and an uncertain phone reading remains uncertain after calculation.

[Why Does 85 dB Matter?](/articles/why-does-85-db-matter/)
[NIOSH vs OSHA Noise Exposure Limits](/articles/niosh-vs-osha-noise-exposure-limits/)
[Safe Exposure Time Calculator](/tools/safe-listening-time-calculator/)
## Sources

1. CDC/NIOSH, *Understand Noise Exposure*. [https://www.cdc.gov/niosh/noise/prevent/understand.html](https://www.cdc.gov/niosh/noise/prevent/understand.html)
2. CDC/NIOSH, *Understanding Noise Exposure Limits: Occupational vs. General Environmental Noise*. [https://www.cdc.gov/niosh/bulletin/2016/noise.html](https://www.cdc.gov/niosh/bulletin/2016/noise.html)
3. CDC/NIOSH, *Health Hazard Evaluation Report 2011-0087-3241*. [https://www.cdc.gov/niosh/hhe/reports/pdfs/2011-0087-3241.pdf](https://www.cdc.gov/niosh/hhe/reports/pdfs/2011-0087-3241.pdf)
4. World Health Organization, *Deafness and hearing loss: Safe listening*. [https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)
5. OSHA Technical Manual, Section III, Chapter 5. [https://www.osha.gov/otm/section-3-health-hazards/chapter-5](https://www.osha.gov/otm/section-3-health-hazards/chapter-5)
6. NIDCD, *Noise-Induced Hearing Loss*. [https://www.nidcd.nih.gov/health/noise-induced-hearing-loss](https://www.nidcd.nih.gov/health/noise-induced-hearing-loss)

[1]: https://www.cdc.gov/niosh/noise/prevent/understand.html
[2]: https://www.cdc.gov/niosh/bulletin/2016/noise.html
[3]: https://www.cdc.gov/niosh/hhe/reports/pdfs/2011-0087-3241.pdf
[4]: https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening
[5]: https://www.osha.gov/otm/section-3-health-hazards/chapter-5
