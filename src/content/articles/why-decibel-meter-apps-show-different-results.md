---
title: "Why Do Decibel Meter Apps Show Different Results?"
description: "Why sound meter apps can display different dB values because of weighting, response time, averaging, calibration, audio processing, and phone hardware."
slug: "why-decibel-meter-apps-show-different-results"
primaryIntent: "User wants to understand why two sound meter apps or devices display different dB values."
contentCluster: "Smartphone sound measurement"
researchSources:
  - "Android Developers, AutomaticGainControl API reference"
  - "Android Developers, MediaRecorder.AudioSource API reference"
  - "Murphy and King, Testing the accuracy of smartphones and sound level meter applications"
  - "Celestina, Kardous, and Trost, Evaluation of directional response"
  - "McLennon et al., Evaluation of smartphone sound level meter applications"
  - "Khan et al., Evaluating the Accuracy of Android Applications"
lastReviewed: "2026-07-12"
---

Two decibel meter apps can show different values because they may receive different microphone signals, apply different filters and averaging methods, use different calibration offsets, or display different metrics. A difference of a few decibels does not automatically prove that one app is wrong. The comparison is meaningful only when the phone, input, weighting, response time, metric, position, and measurement period are matched. [Murphy and King][3]

[Are Decibel Meter Apps Accurate?](/articles/are-decibel-meter-apps-accurate/)
## The apps may not be measuring the same quantity

Similar numbers do not mean the apps are calculating the same result.

One app may show an A-weighted Fast response. Another may show a short rolling RMS average. A third may display an energy average over several seconds. Their labels may all contain "dB," even though the detector and time period differ.

Useful measurement notation identifies at least:

- frequency weighting
- response time or averaging window
- current, average, maximum, or peak metric
- calibration state

Without those details, a side-by-side comparison can be misleading.

## Frequency weighting changes the total

Frequency weighting controls how different parts of the sound spectrum contribute to the reported level.

A-weighting reduces low-frequency contribution and is widely used in environmental and occupational measurements. C-weighting retains more low-frequency energy. Z-weighting applies no A or C shaping within the instrument's intended passband.

A low-frequency sound may therefore produce a higher dBC value than dBA. For broadband sound with less low-frequency energy, the difference may be smaller.

An A-weighted value from one app should not be compared directly with a C-weighted or unweighted value from another.

[dB vs dBA: What Is the Difference?](/articles/db-vs-dba/)
## Response time affects a changing display

Sound levels fluctuate. An app has to decide how quickly its displayed value follows those changes.

A Fast response reacts more quickly to variation. A Slow response produces a steadier display. Some apps use standardized detector behavior, while others use custom rolling windows or visual smoothing.

If a sound rises briefly, the faster app may show a larger momentary value. The slower app may show a lower and more stable result. Both displays can be internally consistent with their selected response.

Screen refresh rate is not necessarily the detector response. An app may calculate levels continuously but redraw the display only several times per second.

## RMS, average, maximum, and peak are different

RMS is used to describe the effective magnitude of a changing pressure signal over a defined interval. A live sound level is often based on RMS or a standardized time-weighted detector.

An energy average such as LAeq summarizes sound energy over a longer period. It is not the arithmetic mean of visible dB values.

A maximum is the highest time-weighted value reached during the observation period. Its result depends on the weighting and response time.

A peak value follows a much shorter pressure excursion. It can be substantially higher than a Fast or Slow maximum. Phone microphones may also compress or clip short peaks, making peak comparison particularly uncertain.

Two apps can therefore report different but valid numbers if one shows a current RMS level and the other shows a session maximum.

[What Is Sound Pressure Level? SPL Explained](/articles/what-is-sound-pressure-level/)
## Calibration offsets may differ

Apps need a way to map digital microphone amplitude to an estimated sound pressure level. They may use:

- a generic conversion constant
- a device-specific profile
- a user-entered offset
- a reference comparison saved during calibration
- no meaningful acoustic calibration at all

If one app applies a positive 4 dB offset and another does not, their readings may remain about 4 dB apart even when they receive the same signal.

A device profile can improve a known phone and app combination, but it does not guarantee that every individual phone matches the stored correction. Hardware variation, damage, dirt, a case, an operating system update, or a changed audio route can alter the result.

[How to Calibrate a Decibel Meter App](/articles/how-to-calibrate-a-decibel-meter-app/)
## Android apps can receive different audio signals

Android provides several microphone audio sources. The signal delivered to an app may depend on the selected source and the phone's implementation.

Android documents automatic gain control as processing that raises or lowers microphone input to keep output approximately constant. That is useful for speech, but it can reduce the relationship between acoustic pressure and digital amplitude. [Android AGC][1]

The Android `UNPROCESSED` source is available only on supported devices. Official documentation states that it behaves like the default source when unprocessed capture is unavailable. A request for unprocessed input does not guarantee a raw signal on every phone. [Android audio source][2]

Another app may choose a voice communication source that uses echo cancellation or gain processing. Two apps on the same phone can therefore receive differently processed inputs before either app performs its own calculations.

## Automatic gain control can change during the test

AGC does not always act like one fixed offset. It can adjust gain as the sound changes.

At a quiet level, the system may increase gain. At a loud level, it may reduce gain. The difference between the real sound levels can then appear smaller on screen.

This also explains why two apps may agree at one test level and separate at another. One app may use a less processed route, while the other receives a signal with active gain control or compression.

A one-point calibration cannot correct gain that changes dynamically.

## Apps use different sampling and update methods

Apps may differ in:

- audio sample rate
- resampling method
- RMS window length
- filter implementation
- update interval
- smoothing applied to the displayed number
- treatment of silence and outliers
- maximum hold behavior
- clipping detection
- conversion from digital full scale to estimated SPL

Research has found that app calculation procedures can create differences as large as, or larger than, the differences between phones. [Murphy and King][3]

A display with one decimal place does not establish that the underlying method is accurate.

## Different phones add another layer of variation

Comparing apps across two phones changes both the software and the hardware.

Phone models can differ in microphone sensitivity, frequency response, port shape, active microphone, self-noise, overload point, analog gain, and manufacturer processing. Murphy and King found substantial inter-device variation in a 100-phone study. [Murphy and King][3]

Android-specific studies have found that app performance changes with signal type, frequency, level, and device. Some tested Android apps also underreported at 90 dBA. One app may perform better for broadband noise while another performs better for tones. [McLennon et al.][5] [Khan et al.][6]

A result from one model should not be applied to an entire brand.

## Position and obstruction can change one app test

A comparison can fail even when the apps are configured correctly.

If the phone is rotated between tests, the microphone opening is covered, or the device is placed on a different surface, the real signal reaching the microphone changes. Phone directionality and handling can affect the response. [Celestina et al.][4]

Running two apps one after another also means that the sound itself may have changed. Traffic, music, voices, appliances, and room activity are rarely identical from one minute to the next.

Some phones may not allow two apps to capture the microphone simultaneously. A sequential test should therefore use a stable source and repeat each condition several times.

## A small difference may be normal

A 1 or 2 dB difference can arise from detector timing, rounding, calibration, placement, or ordinary sound variation. It may be smaller than the uncertainty of either phone system.

Even a larger difference does not reveal the cause by itself. The next step is to align the settings and procedure rather than deciding from the screen which app is correct.

The question becomes more serious near a regulatory, legal, or safety threshold. An unvalidated app should not decide such a boundary, even if two apps happen to agree.

## How to compare two apps fairly

Use this procedure for a practical comparison:

1. Use the same phone when possible.
2. Choose a stable broadband sound rather than speech or intermittent noise.
3. Keep the phone fixed on a stand.
4. Keep the case, orientation, distance, and room unchanged.
5. Select the same frequency weighting.
6. Select the same response time or averaging duration.
7. Compare the same metric, such as LAeq over 60 seconds.
8. Reset both session statistics before each run.
9. Record each app's calibration offset and audio input information if available.
10. Repeat the test at several sound levels when possible.

If an accurate reference is needed, compare both apps with a properly calibrated sound level meter rather than using one app as the truth.

## Compare settings before comparing numbers

Use dBcheck with a fixed phone position and documented weighting, duration, and calibration state. When comparing it with another app, match the measurement definition first. The goal is not to force identical screens, but to determine whether both systems agree closely enough for a limited awareness or comparison task.

## Sources

1. Android Developers, *AutomaticGainControl API reference*. [https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl](https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl)
2. Android Developers, *MediaRecorder.AudioSource API reference*. [https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource](https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource)
3. Murphy and King, *Testing the accuracy of smartphones and sound level meter applications for measuring environmental noise*. [https://doi.org/10.1016/j.apacoust.2015.12.012](https://doi.org/10.1016/j.apacoust.2015.12.012)
4. Celestina, Kardous, and Trost, *Smartphone-based sound level measurement apps: Evaluation of directional response*. [https://doi.org/10.1016/j.apacoust.2020.107673](https://doi.org/10.1016/j.apacoust.2020.107673)
5. McLennon et al., *Evaluation of smartphone sound level meter applications as a reliable tool for noise monitoring*. [https://pubmed.ncbi.nlm.nih.gov/31356145/](https://pubmed.ncbi.nlm.nih.gov/31356145/)
6. Khan et al., *Evaluating the Accuracy of Android Applications in Monitoring Environmental Noise Levels*. [https://doi.org/10.7759/cureus.81471](https://doi.org/10.7759/cureus.81471)

[1]: https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl
[2]: https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource
[3]: https://doi.org/10.1016/j.apacoust.2015.12.012
[4]: https://doi.org/10.1016/j.apacoust.2020.107673
[5]: https://pubmed.ncbi.nlm.nih.gov/31356145/
[6]: https://doi.org/10.7759/cureus.81471

