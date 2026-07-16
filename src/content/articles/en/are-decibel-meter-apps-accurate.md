---
title: "Are Decibel Meter Apps Accurate?"
description: "How accurate smartphone decibel meter apps can be, why Android results vary, what calibration can improve, and when a professional meter is required."
slug: "are-decibel-meter-apps-accurate"
locale: "en"
translationKey: "are-decibel-meter-apps-accurate"
clusterKey: "smartphone"
primaryIntent: "User wants to know whether smartphone decibel meter apps provide trustworthy measurements."
contentCluster: "Smartphone sound measurement"
researchSources:
  - "CDC/NIOSH, NIOSH Sound Level Meter App"
  - "OSHA Technical Manual, Section III, Chapter 5"
  - "Android Developers, AutomaticGainControl API reference"
  - "Android Developers, MediaRecorder.AudioSource API reference"
  - "Kardous and Shaw, Evaluation of smartphone sound measurement applications"
  - "Murphy and King, Testing the accuracy of smartphones and sound level meter applications for measuring environmental noise"
  - "Kardous and Shaw, Evaluation of smartphone sound measurement applications using external microphones: A follow-up study"
  - "Celestina, Hrovat, and Kardous, Smartphone-based sound level measurement apps: Evaluation of compliance with international sound level meter standards"
  - "Serpanos et al., The Accuracy of Smartphone Sound Level Meter Applications in Measuring Sound Levels in Clinical Rooms"
  - "Huyan et al., Assessing the Usefulness of Mobile Apps for Noise Management in Occupational Health and Safety"
  - "McLennon et al., Evaluation of smartphone sound level meter applications as a reliable tool for noise monitoring"
  - "Lee and Hampton, Smartphone applications for measuring noise in the intensive care unit: A feasibility study"
publishedAt: "2026-07-12"
lastReviewed: "2026-07-12"
---

Decibel meter apps can provide useful sound level estimates, but there is no single accuracy figure that applies to every phone and app. A carefully selected and calibrated phone system may agree closely with a professional reference meter over a limited range. An arbitrary uncalibrated phone and app may differ by several decibels, and some combinations have produced much larger errors. [NIOSH][1] [Murphy and King][6]

The result depends on the complete measurement system: the phone model, microphone, audio input path, operating system processing, app calculations, calibration, sound spectrum, sound level, orientation, distance, and environment.

[What Is a Decibel? A Simple Guide to Sound Levels](/articles/what-is-a-decibel/)
[How to Measure Decibels With an Android Phone](/articles/how-to-measure-decibels-with-android-phone/)
## There is no universal accuracy rating for phone apps

A statement such as "decibel apps are accurate to within 2 dB" is too broad. Research that found close agreement usually tested specific devices, app versions, microphones, settings, sound signals, and level ranges under controlled conditions.

Kardous and Shaw found that a small number of selected smartphone apps produced mean differences within about 2 dB of a reference system during controlled tests. Their later work found selected app and calibrated external microphone combinations within about 1 dB in the tested range. Those findings show what a carefully chosen system can achieve. They do not show that every phone or every app has the same performance. [Kardous and Shaw 2014][5] [Kardous and Shaw 2016][7]

Murphy and King tested 100 phones and found substantial variation between devices. Their results included a standard deviation of 6.81 dB across the tested systems. An average error across many phones can therefore hide a wide spread of individual results. [Murphy and King][6]

The useful question is not simply whether an app is accurate. It is whether the exact phone, app, settings, and measurement procedure are suitable for the intended task.

## What research says about the best phone setups

A calibrated smartphone system can perform well within a defined range. Several studies have reported agreement around 1 to 2 dB for selected systems under controlled conditions. Performance is usually strongest for steady broadband sound at moderate levels, with a known calibration and a stable audio path. [Kardous and Shaw 2016][7] [Huyan et al.][10]

External measurement microphones often improve repeatability because they can offer a more predictable sensitivity, flatter frequency response, wider linear range, and a shape that fits a standard acoustic calibrator. One study found that a particular phone, app, and external microphone system met most of the periodic Class 2 test requirements examined by the researchers. That was a result for one complete tested system, not a general certification of smartphone apps or external microphones. [Celestina et al. 2018][8]

Less favorable studies are not necessarily contradictory. They often test uncalibrated phones, multiple Android models, different apps, tones instead of broadband noise, higher sound levels, or real environments. A system can agree closely in one laboratory test and perform poorly with another sound, level, orientation, or input route.

## Why Android results vary so much

Android phones are built by many manufacturers. Each model may use a different microphone capsule, microphone array, analog preamplifier, converter, port geometry, firmware, and audio processing chain.

NIOSH states that this fragmentation prevents it from verifying one Android app across the Android market in the same way it has verified its own app on supported iOS hardware. [NIOSH][1]

Even phones from the same brand can differ in:

- microphone sensitivity and frequency response
- microphone overload point and self-noise
- the number and location of microphones
- which microphone the operating system routes to an app
- built-in gain, equalization, noise reduction, beamforming, and echo cancellation
- sample rate, resampling, and firmware behavior

A stored correction for one phone model may not fit another unit of the same model after hardware variation, damage, dirt, moisture, or a software update. The safest description is therefore model-specific and system-specific, not Android-wide.

[Why Do Decibel Meter Apps Show Different Results?](/articles/why-decibel-meter-apps-show-different-results/)
## The built-in microphone is not a calibrated sound measurement microphone

Phone microphones are designed mainly for calls, speech, video, and voice assistants. Absolute sound pressure measurement is not their primary purpose.

A phone microphone can affect the reading in several ways.

First, its absolute sensitivity may be unknown to the app. Digital sample amplitude is not automatically equal to a known sound pressure level. The app needs a calibration constant or device profile to map the signal to an estimated SPL value.

Second, the frequency response may be shaped for speech. A microphone or firmware path may reduce low frequencies, emphasize parts of the voice range, or apply other processing. A single calibration offset can move the overall level up or down, but it cannot fully correct a frequency-dependent error.

Third, the microphone and electronics have a noise floor. In very quiet environments, the phone's own electrical and acoustic noise can become a large part of the reading. Some tested systems overestimated sound below about 40 to 50 dBA even after calibration. The exact transition depends on the device and method. [Serpanos et al.][9]

Fourth, the complete input path may compress or clip at high levels. The app can still display a precise-looking number while the microphone or analog electronics are no longer responding linearly.

[What Is Sound Pressure Level? SPL Explained](/articles/what-is-sound-pressure-level/)
## Automatic gain control can break the level relationship

Automatic gain control, usually shortened to AGC, changes microphone gain according to the incoming signal. It is useful for keeping speech audible, but it conflicts with absolute sound level measurement.

Android describes AGC as a preprocessor that raises or lowers microphone input so that the captured output remains approximately constant. Android also notes that AGC may be inserted by default depending on the device and selected audio source. [Android AGC][3]

AGC may cause quiet sound to appear too high and loud sound to appear too low. A real 10 dB increase may appear much smaller if the system lowers gain as the sound rises. Gain can also change during a session, which means that one fixed calibration offset no longer fits every moment.

Android offers an `UNPROCESSED` audio source, but only where the device supports it. The official documentation states that it behaves like the default source when unprocessed capture is unavailable. Requesting that source is therefore not proof that a phone delivers a raw signal. [Android audio source][4]

The app's choice of audio source also matters. A voice communication source may use echo cancellation or gain processing, while another route may provide a less processed signal.

## Accuracy changes with sound level

Phone performance is often best within a middle range and less reliable at very quiet or very loud levels.

Below roughly 30 to 40 dBA, microphone self-noise and processing may dominate on some phones. A display may settle at a noise floor even when the real environment becomes quieter.

Many consumer app studies concentrate on a range around 40 to 85 dBA. That does not guarantee accuracy within the range, but it is better represented in the research than extreme levels.

Around 85 to 95 dBA, differences between devices and apps become more important. McLennon and colleagues found that the tested Android apps consistently underreported at 90 dBA. Other selected systems have remained usable near or above that level, so 90 dBA is not a universal failure point. [McLennon et al.][11]

Above about 95 dBA, many built-in phone systems are outside the level range commonly demonstrated in research. Compression and clipping become more likely. There is no universal smartphone clipping threshold because the microphone, preamplifier, processing, and selected route all contribute.

A software scale that extends to 120 or 130 dB does not prove that the phone can measure those levels. It shows only what the interface can display.

## Maximum and peak values are harder than averages

A phone may produce a reasonable average level while missing or underestimating the loudest moment. Short events demand sufficient microphone headroom, sample handling, detector behavior, and time response.

Lee and Hampton found that average readings from calibrated phone systems were generally close to a reference meter, while maximum-level errors were larger. [Lee and Hampton][12]

Very short impulses, such as fireworks or blasts, are especially difficult. A phone may clip, compress, smooth, or miss the true peak even when the displayed average looks plausible. A normal phone should not be relied on for safety-critical peak measurement.

The number also needs a metric. An average such as LAeq, a Fast maximum, and a C-weighted peak answer different questions.

[dB vs dBA: What Is the Difference?](/articles/db-vs-dba/)
## Calibration can improve agreement, but it has limits

Calibration often helps when the main error is a stable sensitivity offset. If a phone consistently reads 4 dB below a trustworthy reference under the same conditions, applying a 4 dB correction may improve agreement near that calibration condition.

One-point calibration cannot fix:

- microphone frequency response across all sound types
- automatic gain changes
- nonlinear compression
- clipping at high levels
- the microphone noise floor
- directionality and obstruction
- an incorrect weighting filter or time response
- a peak detector that misses short events

Calibration also needs a reliable reference. Matching one uncalibrated phone to another does not establish accuracy. A web video or speaker tone does not provide a known SPL at the microphone unless the complete acoustic setup has been measured.

[How to Calibrate a Decibel Meter App](/articles/how-to-calibrate-a-decibel-meter-app/)
## When a phone app is useful

A phone measurement is most useful when the cost of error is limited and the purpose is awareness, screening, or comparison.

Reasonable uses include:

- comparing the same source before and after a change
- identifying which rooms, routes, or activities are probably louder
- observing trends on one known device
- educational demonstrations of distance and sound level
- deciding whether a professional noise survey may be justified
- documenting context alongside a complaint, with a clear estimate disclaimer

Repeated comparisons can be informative even when the absolute level is uncertain. The phone, app, weighting, position, distance, duration, and calibration state should remain consistent.

A reading far from a decision boundary is also easier to use responsibly. An estimated 97 dBA reading strongly suggests a loud environment even if the true value differs by several decibels. An estimated 84 dBA versus 86 dBA reading should not decide compliance, hearing protector selection, or a legal threshold.

## When an app should not replace a professional meter

A phone app should not be treated as a general replacement for a calibrated Class 1 or Class 2 sound level meter.

Professional equipment and the applicable measurement procedure are needed when the result will be used for:

- occupational noise compliance or worker dose
- environmental noise enforcement
- product, machinery, building, or acoustic certification
- engineering decisions near a specified threshold
- impulse, peak, tonal, or difficult low-frequency measurements
- research that requires traceable sound pressure data
- a report expected to withstand legal or technical challenge

OSHA describes smartphone apps as rough screening tools and states that they may not be used to document OSHA compliance. The exact requirement varies by jurisdiction, but official methods commonly specify the meter class, calibration checks, microphone position, weather, duration, and reporting method. [OSHA][2]

[Phone Sound Meter vs Professional Sound Level Meter](/articles/phone-sound-meter-vs-professional-meter/)
## How to judge a reading responsibly

A trustworthy presentation identifies what was measured and how. Look for:

- the exact metric, such as estimated dBA, LAeq, maximum, or peak
- frequency weighting
- response time or averaging duration
- calibration status
- microphone or input route
- warnings for possible overload
- measurement position and distance

Displayed resolution is not accuracy. A reading shown as 67.4 dB does not prove that the system is accurate to 0.1 dB.

The strongest conclusion supported by current evidence is that smartphone apps can be good estimators under the right conditions, and selected calibrated systems can be much better than casual measurements. Accuracy cannot be assumed from the app name, phone brand, store rating, or visual polish.

## Use dBcheck as an estimate and comparison tool

Use dBcheck to follow environmental sound levels, compare sessions, and review measurements such as MIN, AVG, MAX, Peak, and equivalent session level where available. Keep the phone, position, settings, and calibration state consistent. Treat the result as an estimated smartphone measurement, not as a certified Class 1 or Class 2 result or proof of regulatory compliance.

## Sources

1. CDC/NIOSH, *NIOSH Sound Level Meter App*. [https://www.cdc.gov/niosh/noise/about/app.html](https://www.cdc.gov/niosh/noise/about/app.html)
2. OSHA Technical Manual, Section III, Chapter 5. [https://www.osha.gov/otm/section-3-health-hazards/chapter-5](https://www.osha.gov/otm/section-3-health-hazards/chapter-5)
3. Android Developers, *AutomaticGainControl API reference*. [https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl](https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl)
4. Android Developers, *MediaRecorder.AudioSource API reference*. [https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource](https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource)
5. Kardous and Shaw, *Evaluation of smartphone sound measurement applications*. [https://europepmc.org/article/MED/25236152](https://europepmc.org/article/MED/25236152)
6. Murphy and King, *Testing the accuracy of smartphones and sound level meter applications for measuring environmental noise*. [https://doi.org/10.1016/j.apacoust.2015.12.012](https://doi.org/10.1016/j.apacoust.2015.12.012)
7. Kardous and Shaw, *Evaluation of smartphone sound measurement applications using external microphones: A follow-up study*. [https://europepmc.org/article/MED/27794313](https://europepmc.org/article/MED/27794313)
8. Celestina, Hrovat, and Kardous, *Smartphone-based sound level measurement apps: Evaluation of compliance with international sound level meter standards*. [https://doi.org/10.1016/j.apacoust.2018.04.011](https://doi.org/10.1016/j.apacoust.2018.04.011)
9. Serpanos et al., *The Accuracy of Smartphone Sound Level Meter Applications in Measuring Sound Levels in Clinical Rooms*. [https://europepmc.org/article/MED/33469901](https://europepmc.org/article/MED/33469901)
10. Huyan et al., *Assessing the Usefulness of Mobile Apps for Noise Management in Occupational Health and Safety*. [https://doi.org/10.2196/46846](https://doi.org/10.2196/46846)
11. McLennon et al., *Evaluation of smartphone sound level meter applications as a reliable tool for noise monitoring*. [https://pubmed.ncbi.nlm.nih.gov/31356145/](https://pubmed.ncbi.nlm.nih.gov/31356145/)
12. Lee and Hampton, *Smartphone applications for measuring noise in the intensive care unit: A feasibility study*. [https://doi.org/10.1016/j.jcrc.2023.154435](https://doi.org/10.1016/j.jcrc.2023.154435)

[1]: https://www.cdc.gov/niosh/noise/about/app.html
[2]: https://www.osha.gov/otm/section-3-health-hazards/chapter-5
[3]: https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl
[4]: https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource
[5]: https://europepmc.org/article/MED/25236152
[6]: https://doi.org/10.1016/j.apacoust.2015.12.012
[7]: https://europepmc.org/article/MED/27794313
[8]: https://doi.org/10.1016/j.apacoust.2018.04.011
[9]: https://europepmc.org/article/MED/33469901
[10]: https://doi.org/10.2196/46846
[11]: https://pubmed.ncbi.nlm.nih.gov/31356145/
[12]: https://doi.org/10.1016/j.jcrc.2023.154435
