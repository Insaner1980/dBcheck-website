---
title: "dB vs dBA: What Is the Difference?"
description: "The practical difference between dB and dBA, what A-weighting does, why dBA is widely used, and when another metric may be needed."
slug: "db-vs-dba"
primaryIntent: "User wants to know the practical difference between dB and dBA."
contentCluster: "Decibel fundamentals"
researchSources:
  - "BIPM, The International System of Units (SI Brochure), 9th edition"
  - "OSHA Technical Manual, Section III, Chapter 5"
  - "CDC/NIOSH, NIOSH Sound Level Meter Application Help Guide"
  - "IEC 61672-1:2013 official publication page"
  - "HSE, Noise at events"
lastReviewed: "2026-07-11"
---

dB is the logarithmic unit used to express a level ratio. dBA means that the sound pressure signal has been filtered with the standardized A-weighting curve before the level is reported. A dBA value is therefore more specific than a bare dB value. [BIPM][1] [OSHA][2]

[What Is a Decibel? A Simple Guide to Sound Levels](/articles/what-is-a-decibel/)
## Why dB needs context

Decibels are used for many different quantities. Sound pressure level, sound power, electrical power, voltage ratios, digital signal levels, and other measurements can all be expressed in decibels, but they do not use the same reference.

Even within acoustics, a number such as 70 dB leaves several questions unanswered:

- Is it sound pressure level or sound power level?
- Was A, C, or Z frequency weighting used?
- Is the number a live value, an energy average, a maximum, or a peak?
- What measurement duration and microphone position were used?

The notation and context determine what the number means.

## What A-weighting does

A-weighting is a standardized frequency filter. It reduces the contribution of low frequencies and also reduces some very high frequencies before the overall level is calculated. [OSHA][2] [IEC 61672][5]

The resulting level is commonly written as dBA or dB(A). More formal quantity notation may use symbols such as LAeq or LAFmax, with the result still expressed in dB.

A-weighting is often described as approximating human hearing sensitivity, but that description needs restraint. It is one fixed curve. Human hearing changes with level, spectrum, duration, listening conditions, and the individual listener. A-weighting does not model masking, tonality, impulsiveness, binaural hearing, or perceived loudness in full.

A more accurate public description is that A-weighting is a standardized filter widely used to summarize environmental and occupational sound in established noise assessment practice.

## Why dBA is widely used

Occupational and environmental noise guidance commonly uses A-weighted metrics. This gives regulators, employers, researchers, and the public a consistent basis for many exposure and community-noise comparisons. [NIOSH][3]

A-weighted energy averages are often used for longer measurements. A-weighted Fast or Slow maximum values may be used for shorter events. The weighting alone does not identify the averaging method, so dBA should not be treated as a complete measurement description.

For example, LAeq,15min identifies an A-weighted energy-equivalent level over 15 minutes. LAFmax identifies the highest A-weighted Fast-time-weighted level during the observation period. Both are A-weighted, but they answer different questions.

## How dBC differs

C-weighting is flatter than A-weighting across much of the audible range and retains substantially more low-frequency content. It is commonly used for high-level sounds, peak measurements, and some assessments involving low-frequency sound or hearing protection. [OSHA][2] [HSE][4]

LCpeak is a common example. It reports the highest C-weighted peak pressure during the measurement interval.

C-weighting is not simply a more accurate version of A-weighting. It is a different standardized filter for a different measurement purpose.

## How dBZ differs

Z-weighting means zero frequency weighting. It is intended to provide a nominally flat standardized response across the relevant frequency range of the instrument.

The word flat needs a qualification. A real microphone and measurement system still have bandwidth limits, microphone response errors, electronics, filters, and tolerances. Z-weighting means that the A or C shaping is not applied within the standardized passband. It does not guarantee a perfectly raw or perfectly flat measurement from every device.

## Why the same sound can produce different readings

A sound with strong low-frequency content may produce a noticeably higher dBC reading than dBA because A-weighting reduces low-frequency contribution more strongly.

A broadband sound with less low-frequency energy may produce smaller differences between the weightings. The exact difference depends on the spectrum, not simply on the overall level.

This is why comparing an A-weighted reading from one app with a C-weighted reading from another can be misleading. The apps may also differ in calibration, averaging, time response, microphone input, automatic gain control, and processing.

[Why Two Decibel Meter Apps Show Different Results](/articles/why-decibel-meter-apps-show-different-results/)
## When dBA is useful

dBA is useful when the applicable guideline, regulation, study, or comparison uses A-weighting. Common examples include occupational exposure, environmental noise assessment, and many community-noise measurements.

It is also useful for consistent comparisons within the same method. Repeated A-weighted measurements at the same position, duration, device, and calibration state can reveal changes even when the absolute accuracy of a phone is limited.

## When dBA does not tell the whole story

A single A-weighted number may hide information that matters for the task.

Low-frequency sound can be prominent even when A-weighting reduces its contribution. Short impulsive events may require a peak metric such as LCpeak rather than only an A-weighted average. Tonal sound, fluctuating sound, or a complex spectrum may need octave-band, one-third-octave-band, or other frequency analysis.

A-weighting also does not turn a physical level into a direct measure of perceived loudness. Two sounds with the same dBA value can differ in spectrum, duration, character, and subjective effect.

## Choose the metric that matches the question

The useful choice is not between a good number and a bad number. It is between measurements designed for different purposes.

Use A-weighting when an established environmental or occupational method calls for it. Use C-weighting when the task involves high levels, peaks, or low-frequency contribution under a method that specifies C-weighting. Use Z-weighting when a near-flat standardized response is required and the complete instrument is suitable for the task.

The weighting should always be reported with the time metric and measurement context.

## Compare weighting modes carefully

Use dBcheck to compare available weighting modes on the same phone, at the same position, during the same sound. Differences can reveal how much low-frequency content affects the overall value. Treat the result as an estimate because phone hardware, processing, calibration, and overload limits remain part of the measurement system.

## Sources

1. BIPM, *The International System of Units (SI Brochure), 9th edition*. [https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf)
2. OSHA Technical Manual, Section III, Chapter 5. [https://www.osha.gov/otm/section-3-health-hazards/chapter-5](https://www.osha.gov/otm/section-3-health-hazards/chapter-5)
3. CDC/NIOSH, *NIOSH Sound Level Meter Application Help Guide*. [https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf](https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf)
4. HSE, *Noise at events*. [https://www.hse.gov.uk/event-safety/noise.htm](https://www.hse.gov.uk/event-safety/noise.htm)
5. IEC 61672-1:2013, official publication page. [https://webstore.iec.ch/en/publication/5708](https://webstore.iec.ch/en/publication/5708)

[1]: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf
[2]: https://www.osha.gov/otm/section-3-health-hazards/chapter-5
[3]: https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf
[4]: https://www.hse.gov.uk/event-safety/noise.htm

[5]: https://webstore.iec.ch/en/publication/5708

