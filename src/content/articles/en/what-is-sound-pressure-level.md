---
title: "What Is Sound Pressure Level? SPL Explained"
description: "An explanation of sound pressure, SPL, the 20 micropascal reference, the SPL formula, distance effects, and the limits of smartphone measurements."
slug: "what-is-sound-pressure-level"
locale: "en"
translationKey: "what-is-sound-pressure-level"
clusterKey: "fundamentals"
primaryIntent: "User wants to understand SPL and how sound pressure is expressed in decibels."
contentCluster: "Decibel fundamentals"
researchSources:
  - "NIST Guide to the SI, Chapter 8"
  - "BIPM, The International System of Units (SI Brochure), 9th edition"
  - "NIST, Exactly How Loud Is That Jackhammer?"
  - "IEC 61672-1:2013 official publication page"
  - "CDC/NIOSH, NIOSH Sound Level Meter App"
  - "CDC/NIOSH, NIOSH Sound Level Meter Application Help Guide"
  - "CDC/NIOSH, Evaluation of Impact and Continuous Noise Exposure"
  - "NIDCD, How Loud Is Too Loud?"
  - "OSHA Technical Manual, Section III, Chapter 5"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-12"
---

Sound pressure level, or SPL, expresses the effective pressure variation produced by sound relative to a reference pressure. For airborne sound, the standard reference is 20 micropascals. The result is reported in decibels because the useful pressure range is too large for a simple linear scale. [NIST SI Guide][1] [NIST][8]

[What Is a Decibel? A Simple Guide to Sound Levels](/articles/what-is-a-decibel/)
## Sound pressure is a physical change in the air

Sound waves create small pressure fluctuations around the surrounding atmospheric pressure. These fluctuations move above and below the local ambient pressure as the wave passes.

A microphone responds to those changes and converts them into an electrical signal. The signal can then be filtered, averaged, and converted into a level.

The acoustic pressure waveform alternates between positive and negative values. A simple arithmetic average of the raw waveform would tend toward zero even when the sound is strong. Sound level calculations therefore use an effective pressure based on the root-mean-square value.

## What SPL means

SPL stands for sound pressure level. It describes the sound pressure at a specific measurement position relative to the standard reference pressure.

For airborne sound:

$
L_p = 20\log_{10}\left(\frac{p_{\mathrm{rms}}}{p_0}\right)\ \mathrm{dB}
$

where:

- $L_p$ is sound pressure level
- $p_{\mathrm{rms}}$ is the root-mean-square sound pressure over the defined interval and bandwidth
- $p_0$ is the reference pressure, 20 micropascals in air

The equivalent squared-pressure form uses ten times the logarithm of the mean-square pressure ratio. Both forms express the same relationship. [BIPM][2]

The factor 20 appears because acoustic power is proportional to the square of sound pressure under the relevant conditions. It does not create a different kind of decibel.

## Why the reference pressure is part of the result

A level is always relative to something. For airborne SPL, the reference is 20 micropascals. At that pressure, the level is 0 dB SPL.

Zero dB SPL is not silence. It means that the effective pressure equals the reference pressure. Some sounds can be below 0 dB SPL if their pressure is lower than the reference. Human hearing thresholds also vary with frequency, test conditions, and the listener, so 0 dB SPL should not be treated as a universal biological boundary.

A bare statement such as 70 dB can be ambiguous. In strict technical writing, the quantity, reference, weighting, and time processing should be clear from context.

## SPL is tied to microphone position

Sound pressure is measured at a point. Moving the microphone changes the point, and the level may change with it.

Changing the distance can change the measured level, but the amount depends on the source and environment. Real rooms, traffic environments, machinery, walls, floors, multiple sources, and reverberation can produce results that do not follow one simple rule.

SPL depends on the microphone position, source direction, distance, room, and operating condition. A fixed 6 dB reduction for every doubling of distance should not be applied as a universal indoor rule.

## Sound pressure, intensity, and loudness are different

These terms describe related but distinct ideas.

### Sound pressure

Sound pressure is the local pressure fluctuation measured by a microphone. SPL expresses its effective value in decibels relative to 20 micropascals.

### Sound intensity

Sound intensity describes acoustic power flowing through a unit area. Under simple free-field conditions, pressure and intensity are closely related. In complex sound fields, that relationship can be affected by direction, reflections, and interference.

A 3 dB increase represents about twice the intensity or energy under comparable conditions. The sound pressure amplitude rises by about 41 percent, not by 100 percent. [NIOSH][3]

### Perceived loudness

Loudness is a human perception. It depends on level, frequency spectrum, duration, temporal pattern, listening environment, and the listener. SPL is an important input, but it cannot predict perceived loudness by itself.

A 10 dB increase is ten times the intensity and is often perceived as roughly twice as loud. That is a broad educational rule, not an exact conversion. [NIDCD][4]

[Is 3 dB Twice as Loud? Sound Energy vs Perceived Loudness](/articles/is-3-db-twice-as-loud/)
## Frequency weighting changes the reported level

An SPL result may be filtered before it is reported. A-weighting reduces the contribution of low frequencies and is widely used for environmental and occupational noise. C-weighting retains more low-frequency energy. Z-weighting is the standardized near-flat response within the instrument's specified range. [OSHA][5]

The physical sound pressure reaching the microphone is the same event, but the reported number can change because each weighting allows frequencies to contribute differently.

A notation such as LAeq identifies both A-weighting and an energy-equivalent average. LAFmax identifies the highest A-weighted Fast-time-weighted level. LCpeak identifies the highest C-weighted peak pressure. These metrics answer different questions. [IEC 61672][9]

[dB vs dBA: What Is the Difference?](/articles/db-vs-dba/)
## A live dB display is not a raw pressure sample

A microphone captures rapid pressure samples, but a visible live level is normally based on an RMS calculation or a standardized time response. It is not the decibel value of one instantaneous sample.

Professional sound level meters commonly use Fast and Slow exponential time responses. NIOSH describes these for users as approximately one eighth of a second and one second. The display update rate is not necessarily the same as the underlying audio sample rate or detector response. [NIOSH guide][6]

This distinction matters when comparing apps. One app may show a short rolling RMS value, another may use a different window, and a third may apply additional smoothing. Their live numbers can differ even when both receive the same microphone signal.

## Why a phone reading is not automatically laboratory-grade SPL

A phone can calculate a number labelled dB or SPL, but the label does not establish traceable measurement accuracy.

The result can be affected by:

- phone model and microphone design
- microphone frequency response
- automatic gain control and manufacturer processing
- calibration or lack of calibration
- microphone position and phone orientation
- case design or a blocked microphone port
- wind and room reflections
- clipping or compression at high levels
- the app's weighting, averaging, and detector method

NIOSH has validated its iOS sound level meter app under defined conditions and with calibrated external microphones. It also states that Android hardware fragmentation prevents equivalent universal verification across Android devices. [NIOSH app][7]

A phone can still be useful for repeated comparisons, awareness, and identifying trends. Better procedure improves repeatability, but it does not turn an unvalidated phone into a certified Class 1 or Class 2 measurement system.

## Interpreting an SPL result

A useful SPL statement should identify more than the number. The reporting context should include:

- frequency weighting
- averaging or time response
- measurement duration
- microphone position
- calibration status
- overload or clipping status when relevant

For example, an A-weighted equivalent level over 15 minutes at a documented listener position describes a defined measurement. A single live number with no weighting, duration, or position is much harder to interpret.

## Measure at a repeatable position

Use dBcheck to compare estimated sound pressure levels only when the measurement setup is reasonably consistent. Keep the phone at the same position and orientation, avoid covering the microphone, record the distance and duration, and note the weighting shown by the app. Treat the result as an estimate unless the complete phone, microphone, calibration, and method have been validated for the intended purpose.

## Sources

1. NIST, *Guide to the SI, Chapter 8*. [https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8)
2. BIPM, *The International System of Units (SI Brochure), 9th edition*. [https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf)
3. CDC/NIOSH, *Evaluation of Impact and Continuous Noise Exposure*. [https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf](https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf)
4. NIDCD, *How Loud Is Too Loud?* [https://www.nidcd.nih.gov/health/how-loud-too-loud](https://www.nidcd.nih.gov/health/how-loud-too-loud)
5. OSHA Technical Manual, Section III, Chapter 5. [https://www.osha.gov/otm/section-3-health-hazards/chapter-5](https://www.osha.gov/otm/section-3-health-hazards/chapter-5)
6. CDC/NIOSH, *NIOSH Sound Level Meter Application Help Guide*. [https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf](https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf)
7. CDC/NIOSH, *NIOSH Sound Level Meter App*. [https://www.cdc.gov/niosh/noise/about/app.html](https://www.cdc.gov/niosh/noise/about/app.html)
8. NIST, *Exactly How Loud Is That Jackhammer?* [https://www.nist.gov/news-events/news/2018/08/exactly-how-loud-jackhammer](https://www.nist.gov/news-events/news/2018/08/exactly-how-loud-jackhammer)
9. IEC 61672-1:2013, official publication page. [https://webstore.iec.ch/en/publication/5708](https://webstore.iec.ch/en/publication/5708)

[1]: https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8
[2]: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf
[3]: https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf
[4]: https://www.nidcd.nih.gov/health/how-loud-too-loud
[5]: https://www.osha.gov/otm/section-3-health-hazards/chapter-5
[6]: https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf
[7]: https://www.cdc.gov/niosh/noise/about/app.html
[8]: https://www.nist.gov/news-events/news/2018/08/exactly-how-loud-jackhammer
[9]: https://webstore.iec.ch/en/publication/5708
