---
title: "How Loud Is a Concert?"
description: "Typical concert decibel levels, how audience position changes the reading, and why LAeq, maximum, peak, and exposure duration must be kept separate."
slug: "concert"
locale: "en"
translationKey: "concert"
clusterKey: "common-sounds"
primaryIntent: "User wants to know how loud concerts are and how quickly exposure can accumulate."
contentCluster: "Common sound reference library"
researchSources:
  - "Time to Listen: Most Regular Patrons of Music Venues Prefer Lower Volumes"
  - "World Health Organization, safe-listening venue guidance implementation"
  - "NIDCD, Noise-Induced Hearing Loss"
  - "CDC/NIOSH, Understand Noise Exposure"
  - "World Health Organization, Deafness and hearing loss: Safe listening"
  - "CDC/NIOSH, NIOSH Sound Level Meter App"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-12"
---

Popular concerts and smaller live-music venues commonly produce about **85 to 105 dBA LAeq at audience or front-of-house positions**. Short maxima or peaks can be higher, sometimes around 110 to 120 dB, especially near loudspeakers. A short peak should not be presented as the average level of the whole event. [Concert study][1] [NIDCD][3]

Sound levels are approximate. The same concert can vary greatly with audience position, loudspeaker layout, venue, music, sound-system tuning, crowd noise, and averaging period. LAeq, LAFmax, and LCpeak describe different parts of the event and are not interchangeable.

[How Loud Are Common Sounds? A Context-Aware Decibel Chart](/sounds/)
## Why concert levels vary across the venue

The sound system is designed to cover a large area, but coverage is never perfectly uniform. A listener close to a main array, subwoofer, delay speaker, or stage monitor may receive a different level and spectrum from someone at the rear of the venue.

Indoor spaces add reflections from the ceiling, walls, floor, balconies, and audience areas. Outdoor venues have less room reverberation but can still produce strong level differences with distance, speaker direction, wind, barriers, and local system zones.

Other factors include:

- concert genre and programme material
- venue size and acoustic treatment
- PA system capacity, tuning, and limiting
- the sound engineer's target level
- distance and angle from each loudspeaker
- crowd cheering, singing, and applause
- indoor versus outdoor conditions
- whether the reading covers one song, 15 minutes, or the full event

A peer-reviewed study reported LAeq values from 85 to 105 dB for popular concerts, with a mean around 95 dB, and 86 to 102 dB for small gigs. NIDCD uses a broader 94 to 110 dBA category that includes concerts and sporting events. The sources are not describing one standardized seat and metric, so the ranges should not be forced into one exact concert value. [Concert study][1] [NIDCD][3]

## Average, maximum, and peak answer different questions

An **LAeq,15min** value represents the constant A-weighted level that would contain the same acoustic energy as the changing sound during 15 minutes. It is useful for venue monitoring and exposure context.

An **LAeq,event** value summarizes the entire attendance period. It may be lower or higher than a 15-minute section depending on support acts, breaks, and programme changes.

An **LAFmax** value is the highest A-weighted Fast-time-weighted level during the measurement. It can capture a loud musical passage or crowd response, but it is not a true instantaneous peak.

An **LCpeak** value follows a much shorter C-weighted pressure event. It may be substantially higher than LAeq. Capturing it correctly requires sufficient microphone headroom and a suitable detector.

A claim such as “the concert was 118 dB” is incomplete without the metric and location. It might refer to a brief peak beside a loudspeaker, not the audience's average exposure.

[dB vs dBA: What Is the Difference?](/articles/db-vs-dba/)
[What Is Sound Pressure Level? SPL Explained](/articles/what-is-sound-pressure-level/)
## One momentary reading cannot describe the whole evening

Concert sound changes with each song, performer, audience response, and break. A live display sampled for a few seconds may catch a quiet introduction or the loudest chorus. Neither is automatically representative of the full event.

For exposure context, record an energy average over a meaningful period. A 15-minute LAeq can be useful for comparing parts of the venue. A session covering the whole attendance period is more informative about the evening's accumulated sound energy.

The measurement should start and stop at documented times. A result that excludes the support act, interval music, or encore should not be described as the full event average.

## How quickly exposure can accumulate

Duration becomes increasingly important as the average level rises. Under the NIOSH occupational model:

- 85 dBA for 8 hours reaches 100% of the recommended daily dose
- 88 dBA reaches it in 4 hours
- 91 dBA reaches it in 2 hours
- 94 dBA reaches it in 1 hour
- 97 dBA reaches it in 30 minutes
- 100 dBA reaches it in 15 minutes

These values are times to 100% of the NIOSH daily reference dose for a constant A-weighted average. They are not guaranteed safe listening times for an individual concert visitor. They also do not fully assess very short peaks. [NIOSH][4]

WHO uses a separate recreational listening framework and has recommended that venues limit average sound to 100 dB LAeq,15min as one part of a broader safe-listening standard. The recommendation also includes monitoring, audience information, quiet zones, and access to hearing protection. A 100 dB venue limit is not a statement that 100 dB is harmless for every person or duration. [WHO venue guidance][2] [WHO safe listening][5]

The NIOSH daily model and WHO recreational guidance should not be mixed into one unlabeled countdown. Their purposes and time bases differ.

[What Is a Safe Decibel Level?](/articles/what-is-a-safe-decibel-level/)
[Why Does 85 dB Matter?](/articles/why-does-85-db-matter/)
[NIOSH Exposure Time at 85 dBA: How the Model Works](/articles/how-long-can-you-listen-at-85-db/)
## How to measure concert sound with a phone

Measure from the place where the listener is actually standing or sitting. Keep the phone near normal head or chest height without holding it above the crowd or placing it directly beside a loudspeaker. Record the location in relation to the stage and speakers.

Keep the microphones uncovered. A hand, pocket, bag, or thick phone case can change the result. Do not place the device on a vibrating barrier, table, or speaker enclosure. Avoid moving it through the air during the measurement.

Use A-weighting and an energy-average metric when comparing the session with A-weighted exposure guidance. Record the averaging duration. Keep maximum and peak fields separate.

A practical concert record includes:

- venue and event type
- indoor or outdoor setting
- audience position and approximate speaker distance
- start and stop time
- LAeq over the stated period
- LAFmax and any peak estimate, clearly labelled
- phone, app, calibration, orientation, and case status
- any overload or clipping warning

[How to Measure Decibels With an Android Phone](/articles/how-to-measure-decibels-with-android-phone/)
## Why a phone may underreport loud concert sound

Concert levels are near or above the range where many consumer phone microphones become less predictable. The microphone, preamplifier, automatic gain control, operating-system processing, and app input path may compress the signal before the app calculates a level.

A phone can show a stable, precise-looking number while the input is already overloaded. The app's visual scale extending to 120 or 130 dB does not prove that the hardware can measure those levels.

Average values are generally easier for a phone to estimate than very short peaks. A phone should not be used to prove that an LCpeak stayed below a venue or occupational limit. It should also not decide a legal, engineering, or compliance question. [NIOSH app][6]

Use the result for awareness and broad comparison. A calibrated professional system is appropriate when the venue, employer, regulator, or event producer needs defensible data.

[Are Decibel Meter Apps Accurate?](/articles/are-decibel-meter-apps-accurate/)
[Phone Sound Meter vs Professional Sound Level Meter](/articles/phone-sound-meter-vs-professional-meter/)
## Reduce exposure without waiting for a perfect number

Distance from loudspeakers, quieter breaks, and suitable hearing protection can reduce exposure. A separate concert hearing-protection guide should cover selection and fit in detail. No protector or phone reading makes every concert level and duration safe for every listener.

A very high estimate is useful even when the exact number is uncertain. It supports moving farther from the system, taking a quiet break, or shortening the exposure rather than trying to use every minute shown by a calculator.

## Compare level and duration with the correct caveat

Use dBcheck to follow an estimated audience-position LAeq over a representative period. The Safe Exposure Time Calculator can show the time to 100% NIOSH reference dose for a stable A-weighted average. The calculator cannot repair microphone clipping or turn a short live reading into a full-event exposure assessment.

[Safe Exposure Time Calculator](/tools/safe-listening-time-calculator/)
## Sources

1. *Time to Listen: Most Regular Patrons of Music Venues Prefer Lower Volumes*. [https://pmc.ncbi.nlm.nih.gov/articles/PMC6438925/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6438925/)
2. World Health Organization, *WHO hearing guidelines implemented at major arts festival*. [https://www.who.int/news-room/feature-stories/detail/who-hearing-guidelines-implemented-at-major-arts-festival](https://www.who.int/news-room/feature-stories/detail/who-hearing-guidelines-implemented-at-major-arts-festival)
3. NIDCD, *Noise-Induced Hearing Loss*. [https://www.nidcd.nih.gov/health/noise-induced-hearing-loss](https://www.nidcd.nih.gov/health/noise-induced-hearing-loss)
4. CDC/NIOSH, *Understand Noise Exposure*. [https://www.cdc.gov/niosh/noise/prevent/understand.html](https://www.cdc.gov/niosh/noise/prevent/understand.html)
5. World Health Organization, *Deafness and hearing loss: Safe listening*. [https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening](https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening)
6. CDC/NIOSH, *NIOSH Sound Level Meter App*. [https://www.cdc.gov/niosh/noise/about/app.html](https://www.cdc.gov/niosh/noise/about/app.html)

[1]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6438925/
[2]: https://www.who.int/news-room/feature-stories/detail/who-hearing-guidelines-implemented-at-major-arts-festival
[3]: https://www.nidcd.nih.gov/health/noise-induced-hearing-loss
[4]: https://www.cdc.gov/niosh/noise/prevent/understand.html
[5]: https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening
[6]: https://www.cdc.gov/niosh/noise/about/app.html
