---
title: "What Is a Decibel? A Simple Guide to Sound Levels"
description: "A clear explanation of what decibels measure, why the dB scale is logarithmic, how dB differs from dBA, and how to interpret common level changes."
slug: "what-is-a-decibel"
locale: "en"
translationKey: "what-is-a-decibel"
clusterKey: "fundamentals"
primaryIntent: "User wants a clear general explanation of what a decibel is."
contentCluster: "Decibel fundamentals"
researchSources:
  - "BIPM, The International System of Units (SI Brochure), 9th edition"
  - "NIST, Exactly How Loud Is That Jackhammer?"
  - "NIST Guide to the SI, Chapter 8"
  - "IEC 61672-1:2013 official publication page"
  - "CDC/NIOSH, NIOSH Sound Level Meter Application Help Guide"
  - "CDC/NIOSH, Understand Noise Exposure"
  - "NIDCD, How Loud Is Too Loud?"
  - "OSHA Technical Manual, Section III, Chapter 5"
  - "CDC/NIOSH, Evaluation of Impact and Continuous Noise Exposure"
  - "CDC/NIOSH, NIOSH Sound Level Meter App"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-12"
---

A decibel, written as dB, is a logarithmic way to express a ratio between a measured quantity and a reference quantity. In a sound level meter, the number usually represents sound pressure level in air relative to a reference pressure of 20 micropascals. A decibel is therefore not a direct unit of loudness, and a bare number such as 70 dB is incomplete unless the measured quantity and method are clear. [BIPM][1] [NIST][2]

That definition explains several facts that often cause confusion. Zero decibels does not mean silence. Negative decibel values are possible. A change of a few decibels can represent a large physical change. Two measurements with the same numerical value may also describe different things if they use different references, frequency weightings, or time calculations.

[Why Is the Decibel Scale Logarithmic?](/articles/why-is-the-decibel-scale-logarithmic/)
## What a decibel actually compares

The decibel describes a ratio. It compares a measured value with a defined reference rather than describing an absolute amount on its own.

For power-like quantities, such as acoustic intensity or sound energy under comparable conditions, the level is based on ten times the base-10 logarithm of the ratio. For amplitude-like quantities, such as sound pressure, the calculation uses twenty times the logarithm because acoustic power is proportional to the square of pressure under the relevant conditions. [BIPM][1]

The distinction sounds technical, but the practical idea is simple. A sound meter does not display the pressure in pascals because the useful range would be awkward to read. It converts the pressure ratio into decibels, producing values that are easier to compare.

This also means that dB is used outside acoustics. Electronics, radio systems, digital audio, and signal processing all use decibels, but they may use different reference quantities. A value written only as dB needs context.

## Why the scale is logarithmic

Airborne sound spans an enormous physical range. The pressure associated with a very faint sound is tiny compared with the pressure associated with a very high sound level. A linear scale would require unwieldy values with many zeros. The logarithmic scale compresses that range into manageable numbers. NIST identifies this large dynamic range as a central reason for using decibels in acoustics. [NIST][2]

The scale also turns multiplication into addition. If a system produces one change of 10 dB and another change of 3 dB, the combined change in the relevant power ratio is 13 dB. This is useful in acoustics and engineering because many real systems consist of several gains, losses, sources, or transmission stages.

The logarithmic form is also broadly compatible with the compressive character of human hearing, but it must not be confused with a complete model of perceived loudness. A sound level meter measures a physical signal. Human perception also depends on frequency, duration, spectrum, listening conditions, and the listener.

## Sound pressure level in brief

Sound in air consists of small pressure fluctuations around the surrounding atmospheric pressure. A microphone converts those fluctuations into an electrical signal. Sound pressure level, usually abbreviated SPL, expresses the effective sound pressure relative to the standard airborne reference pressure of 20 micropascals. [NIST SI Guide][3]

The effective pressure is normally based on a root-mean-square calculation. The pressure waveform alternates above and below the surrounding atmospheric pressure, so a simple arithmetic average would tend toward zero. Squaring, averaging, and taking the square root produces an effective magnitude that relates to acoustic energy.

SPL describes the physical pressure at the microphone position. It does not by itself say how loud the sound seems, whether the exposure is acceptable, what frequencies are present, or whether the instrument is calibrated for official use.

[What Is Sound Pressure Level? SPL Explained](/articles/what-is-sound-pressure-level/)
## Why dB and dBA are not the same notation

The letters attached to a sound level describe how the signal was processed before the result was reported.

The notation dBA, also written dB(A), indicates A-weighting. A-weighting is a standardized frequency filter that reduces the contribution of low frequencies and some very high frequencies. It is widely used in environmental and occupational noise assessment. [OSHA][4] [NIOSH][5]

A-weighting does not reproduce exactly what a person hears. It is a fixed standardized filter, not a complete loudness model. Human hearing changes with sound level, frequency content, duration, and individual hearing. A-weighted measurements remain useful because they provide a consistent and widely recognized way to summarize many noise exposures.

C-weighting retains more low-frequency content and is often used for high-level or peak measurements. Z-weighting is the standardized near-flat response across the meter's specified range. The same sound can therefore produce different dBA, dBC, and dBZ readings because each weighting allows different frequencies to contribute differently to the final number.

[dB vs dBA: What Is the Difference?](/articles/db-vs-dba/)
## How to interpret a change in decibels

Because the scale is logarithmic, an increase of about 3 dB represents nearly twice the acoustic energy under comparable conditions, while a 10 dB increase represents ten times the energy. Neither change has one fixed perceptual meaning: 3 dB does not normally sound twice as loud, and the familiar description of 10 dB as roughly twice as loud is only an approximation. [NIOSH][6] [NIDCD][7]

The dedicated guide [Is 3 dB Twice as Loud?](/articles/is-3-db-twice-as-loud/) develops the energy, pressure-amplitude, source-addition and perceived-loudness distinctions. This overview keeps those quantities separate without repeating the full derivation.

## Why exposure duration matters

A sound level alone does not describe total noise exposure. Duration matters because acoustic energy accumulates over time. A lower level heard for many hours can represent substantial exposure, while a brief event at the same average level may contribute much less total energy.

NIOSH uses an 85 dBA recommended exposure level over eight hours together with a 3 dB exchange rate. Under that framework, each 3 dB increase halves the time allowed to reach the same daily reference dose. The framework is a population-level occupational recommendation, not a guarantee that a particular exposure is safe for every person. [NIOSH][6] [CDC/NIOSH][8]

Different organizations use different criteria and time bases. A number should not be interpreted as a universal boundary between harmless and harmful sound. A phone reading also carries uncertainty that can affect any exposure calculation.

## How sound levels are measured in practice

A sound measurement involves more than placing a microphone near a source. The instrument or app captures the pressure waveform, applies any selected frequency weighting, calculates an RMS or energy-based level over a defined time, and reports one or more metrics.

Common outputs include:

- a live or current level using a selected response
- an energy-equivalent average over a stated period
- the highest time-weighted level during a session
- a peak pressure metric for very short events

Those values are not interchangeable. A maximum reading depends on its weighting, time response, and observation period. A peak value follows the strongest pressure excursion and may be much higher than a time-weighted maximum. IEC 61672 treats time-weighted, integrating-average, and other sound level functions as distinct measurement functions. [IEC 61672][9]

Measurement position also matters. Moving the microphone, turning it, covering an acoustic port, placing it near a reflective surface, or measuring in wind can change the result. Distance, room reflections, source direction, and operating condition can be as important as the meter setting.

Professional sound level meters are designed and tested as complete measurement systems. Smartphone results depend on the phone model, microphone, automatic gain control, manufacturer processing, calibration, case, position, environment, and overload limits. A phone can still be useful for awareness, repeated comparisons, and identifying patterns, but an ordinary phone reading should not be presented as a certified Class 1 or Class 2 measurement. [NIOSH app][10]

## Using dB numbers without losing the context

A useful sound level report identifies what was measured and how. At minimum, the reader should be able to determine the frequency weighting, measurement duration, calculation method, microphone position, calibration status, and whether the number is current, average, maximum, or peak.

A statement such as "the room measured 68 dB" leaves several questions unanswered. Was it A-weighted? Was 68 dB the session average, the highest Fast response, or a brief peak? Where was the microphone placed? How long was the measurement? Was the device calibrated?

The number becomes more useful when the context is recorded. For example, an A-weighted energy average over 15 minutes at a fixed listener position describes something much more specific than an isolated live display. The reference pages for [normal conversation](/sounds/normal-conversation/) and [a vacuum cleaner](/sounds/vacuum-cleaner/) show how distance, averaging and source variation change the meaning of an everyday range.
## Try a real measurement carefully

Use dBcheck to observe how an estimated sound level changes with distance, room position, or operating condition. Keep the phone orientation and measurement duration consistent when comparing readings. The result is best treated as an estimate for awareness and relative comparison, not as proof of compliance or as a substitute for a validated professional instrument.

## Sources

1. BIPM, *The International System of Units (SI Brochure), 9th edition*. [https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf)
2. NIST, *Exactly How Loud Is That Jackhammer?* [https://www.nist.gov/news-events/news/2018/08/exactly-how-loud-jackhammer](https://www.nist.gov/news-events/news/2018/08/exactly-how-loud-jackhammer)
3. NIST, *Guide to the SI, Chapter 8*. [https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8)
4. OSHA Technical Manual, Section III, Chapter 5. [https://www.osha.gov/otm/section-3-health-hazards/chapter-5](https://www.osha.gov/otm/section-3-health-hazards/chapter-5)
5. CDC/NIOSH, *NIOSH Sound Level Meter Application Help Guide*. [https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf](https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf)
6. CDC/NIOSH, *Evaluation of Impact and Continuous Noise Exposure*. [https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf](https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf)
7. NIDCD, *How Loud Is Too Loud?* [https://www.nidcd.nih.gov/health/how-loud-too-loud](https://www.nidcd.nih.gov/health/how-loud-too-loud)
8. CDC/NIOSH, *Understand Noise Exposure*. [https://www.cdc.gov/niosh/noise/prevent/understand.html](https://www.cdc.gov/niosh/noise/prevent/understand.html)
9. IEC 61672-1:2013, official publication page. [https://webstore.iec.ch/en/publication/5708](https://webstore.iec.ch/en/publication/5708)
10. CDC/NIOSH, *NIOSH Sound Level Meter App*. [https://www.cdc.gov/niosh/noise/about/app.html](https://www.cdc.gov/niosh/noise/about/app.html)

[1]: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf
[2]: https://www.nist.gov/news-events/news/2018/08/exactly-how-loud-jackhammer
[3]: https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8
[4]: https://www.osha.gov/otm/section-3-health-hazards/chapter-5
[5]: https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf
[6]: https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf
[7]: https://www.nidcd.nih.gov/health/how-loud-too-loud
[8]: https://www.cdc.gov/niosh/noise/prevent/understand.html
[9]: https://webstore.iec.ch/en/publication/5708
[10]: https://www.cdc.gov/niosh/noise/about/app.html
