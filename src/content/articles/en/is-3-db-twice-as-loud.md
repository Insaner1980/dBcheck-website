---
title: "Is 3 dB Twice as Loud? Energy vs Loudness"
description: "Why a 3 dB increase doubles sound energy but not perceived loudness, what a 10 dB change means, and how the NIOSH 3 dB exchange rate works."
slug: "is-3-db-twice-as-loud"
locale: "en"
translationKey: "is-3-db-twice-as-loud"
clusterKey: "fundamentals"
primaryIntent: "User wants to know whether a 3 dB increase means twice the loudness."
contentCluster: "Decibel fundamentals"
researchSources:
  - "CDC/NIOSH, Evaluation of Impact and Continuous Noise Exposure"
  - "NIDCD, How Loud Is Too Loud?"
  - "ISO 532-1 official abstract"
  - "ISO 532-2:2017 official abstract"
  - "Moore, Glasberg, and Varathanathan, A Loudness Model for Time-Varying Sounds"
  - "Basner et al., Auditory and non-auditory effects of noise on health"
  - "CDC/NIOSH, Understand Noise Exposure"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-11"
---

No. An increase of about 3 dB means almost twice the sound energy or intensity under comparable conditions. It does not mean that the sound is perceived as twice as loud. [NIOSH][1]

[What Is a Decibel? A Simple Guide to Sound Levels](/articles/what-is-a-decibel/)
## What doubles at 3 dB

For intensity, power, or sound energy, the ratio associated with a level change is:

$
\frac{E_2}{E_1} = 10^{\Delta L/10}
$

At 3 dB:

$
10^{3/10} \approx 1.995
$

The exact increase for doubled energy is about 3.01 dB. Saying that 3 dB doubles the energy is therefore a standard rounded explanation.

Sound pressure amplitude follows a different relationship:

$
\frac{p_2}{p_1} = 10^{\Delta L/20}
$

At 3 dB, pressure amplitude rises by about 1.41 times, or roughly 41 percent. It does not double.

These two statements are compatible. Acoustic energy is related to the square of pressure under comparable conditions.

## Why doubled energy is not doubled loudness

Loudness is a human perception, not a direct reading of intensity or pressure. The auditory system does not respond to all frequencies, durations, or sound types in the same way.

A 3 dB increase is physically meaningful and can be measurable, but many listeners would describe the perceived change as modest rather than twice as loud. The exact experience depends on several factors:

- frequency and spectral shape
- starting sound level
- duration and temporal pattern
- tone, narrow-band noise, broadband noise, music, or another sound type
- free-field, room, headphone, or binaural presentation
- listener age and hearing status
- adaptation, masking, and context

ISO loudness standards use detailed models because loudness cannot be calculated reliably from one unqualified dB difference. [ISO 532-1][2] [ISO 532-2][3]

## What a 10 dB increase means physically

A 10 dB increase means ten times the intensity, power, or energy:

$
10^{10/10} = 10
$

The sound pressure amplitude rises by about 3.16 times:

$
10^{10/20} \approx 3.162
$

NIDCD explains that a 10 dB increase is ten times as intense and seems about twice as loud. The word about is necessary. [NIDCD][4]

Peer-reviewed loudness research reaches the same cautious position. The 10 dB rule is a useful broad description under many ordinary conditions, but the relationship varies with level, spectrum, and time variation. [Moore et al.][5] [Basner et al.][6]

## A simple example

Consider two steady sounds measured under the same method:

- Sound A: 70 dB
- Sound B: 73 dB

Sound B contains about twice the acoustic energy or intensity of Sound A. It does not normally sound twice as loud.

Now compare 70 dB with 80 dB. The 80 dB sound contains ten times the intensity or energy. Many listeners may perceive it as roughly twice as loud, but not every sound and listener will follow that estimate exactly.

The same caution applies to lower or higher starting levels. A fixed dB difference does not produce one universal perceptual ratio.

## Why two equal sound sources often add 3 dB

Two independent sound sources that each produce the same level usually combine to produce about a 3 dB increase in mean-square level.

For example, two independent machines that each produce 80 dB at the microphone may produce about 83 dB together. Their energy contributions add, but their decibel values do not add as ordinary numbers.

This rule assumes independent or incoherent sources and comparable measurement conditions. Coherent tones can add or cancel depending on phase and position. Perfectly in-phase pressure amplitudes can double, producing up to a 6 dB increase at a point. Out-of-phase tones can partly or fully cancel.

## Why NIOSH halves exposure time for each 3 dB increase

NIOSH uses a 3 dB exchange rate in its occupational noise recommendation. The logic follows the energy relationship.

If the sound level increases by 3 dB, the energy received per unit time approximately doubles. Reaching the same reference dose therefore takes half as long.

NIOSH uses 85 dBA over eight hours as its recommended exposure level. Under the 3 dB exchange rate, an 88 dBA exposure reaches the same reference dose in four hours, and a 91 dBA exposure reaches it in two hours. [NIOSH exposure][7]

These times describe a specific occupational reference framework. They are not guaranteed safe times for every person, and they should not be applied as a complete assessment of impulsive sounds such as blasts or fireworks. A phone reading also adds uncertainty because the device may be uncalibrated, frequency-limited, or overloaded.

## Why the sound itself matters

A 10 dB change in a pure tone is not necessarily perceived like a 10 dB change in broadband noise. Low-frequency sound, high-frequency sound, music, speech, machinery, and impulsive events can produce different loudness judgments even when a meter reports the same level change.

Duration also matters. A short sound may have a high peak but contribute relatively little to a longer energy average. A steady sound can produce substantial total exposure without a dramatic peak.

Frequency weighting affects the number as well. A-weighting reduces low-frequency contribution, while C-weighting retains more of it. A comparison is meaningful only when the weighting and metric are consistent.

## What the 3 dB change actually tells you

A 3 dB increase tells you that the relevant intensity or energy is about twice as great under comparable conditions. It does not tell you that the sound seems twice as loud, and it does not by itself determine risk.

A 10 dB increase tells you that intensity is ten times greater. Describing the sound as roughly twice as loud can be useful for public explanation, provided it is presented as an approximation.

Physical level, perceived loudness, and exposure are connected, but they are not interchangeable.

## Compare two levels with dBcheck

Use dBcheck to compare estimated level changes between two controlled conditions, such as two appliance settings or two fixed listening positions. Keep the phone, weighting, distance, orientation, and measurement duration consistent. The comparison may be useful even when the absolute phone reading is uncertain, but it does not replace a validated sound level meter for safety-critical or official decisions.

## Sources

1. CDC/NIOSH, *Evaluation of Impact and Continuous Noise Exposure*. [https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf](https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf)
2. ISO 532-1, official abstract. [https://www.iso.org/standard/63077.html](https://www.iso.org/standard/63077.html)
3. ISO 532-2:2017, official abstract. [https://www.iso.org/standard/63078.html](https://www.iso.org/standard/63078.html)
4. NIDCD, *How Loud Is Too Loud?* [https://www.nidcd.nih.gov/health/how-loud-too-loud](https://www.nidcd.nih.gov/health/how-loud-too-loud)
5. Moore, Glasberg, and Varathanathan, *A Loudness Model for Time-Varying Sounds*. [https://pmc.ncbi.nlm.nih.gov/articles/PMC5318944/](https://pmc.ncbi.nlm.nih.gov/articles/PMC5318944/)
6. Basner et al., *Auditory and non-auditory effects of noise on health*. [https://pmc.ncbi.nlm.nih.gov/articles/PMC3988259/](https://pmc.ncbi.nlm.nih.gov/articles/PMC3988259/)
7. CDC/NIOSH, *Understand Noise Exposure*. [https://www.cdc.gov/niosh/noise/prevent/understand.html](https://www.cdc.gov/niosh/noise/prevent/understand.html)

[1]: https://www.cdc.gov/niosh/hhe/reports/pdfs/2007-0075-3251.pdf
[2]: https://www.iso.org/standard/63077.html
[3]: https://www.iso.org/standard/63078.html
[4]: https://www.nidcd.nih.gov/health/how-loud-too-loud
[5]: https://pmc.ncbi.nlm.nih.gov/articles/PMC5318944/
[6]: https://pmc.ncbi.nlm.nih.gov/articles/PMC3988259/
[7]: https://www.cdc.gov/niosh/noise/prevent/understand.html
