---
title: "How to Measure Decibels With an Android Phone"
description: "Measure environmental sound with an Android phone while controlling position, distance, duration, settings, and common sources of error."
slug: "how-to-measure-decibels-with-android-phone"
primaryIntent: "User wants practical instructions for measuring environmental sound with an Android phone."
contentCluster: "Smartphone sound measurement"
researchSources:
  - "CDC/NIOSH, NIOSH Sound Level Meter App"
  - "CDC/NIOSH, NIOSH Sound Level Meter Application Help Guide"
  - "OSHA Technical Manual, Section III, Chapter 5"
  - "Android Developers, AutomaticGainControl API reference"
  - "Android Developers, MediaRecorder.AudioSource API reference"
  - "Celestina, Kardous, and Trost, Evaluation of directional response"
lastReviewed: "2026-07-12"
---

An Android phone can provide a useful estimate of environmental sound when the measurement is prepared and repeated carefully. Keep the microphone unobstructed, use a consistent position and distance, measure for a period that represents the sound, and record the weighting, metric, duration, and calibration state. Good procedure improves repeatability, but it does not turn an unvalidated phone into a certified sound level meter. [NIOSH][1] [OSHA][3]

[Are Decibel Meter Apps Accurate?](/articles/are-decibel-meter-apps-accurate/)
## 1. Decide what you are trying to measure

Define the question before opening the app. A useful measurement has a specific source, position, and time period.

Examples include:

- the average sound near a desk during one hour
- the difference between two [vacuum cleaner settings](/sounds/vacuum-cleaner/) at the same distance
- the loudest Fast response during a train journey
- the change in room noise before and after closing a window

Avoid a vague goal such as measuring how loud a building is. Narrow the task enough that another person could repeat it.

The comparison also affects the setup. A measurement intended to establish compliance requires a suitable professional instrument and a standardized method.

## 2. Choose an app that identifies the measurement

Use an app that states what its main number represents. Look for the frequency weighting, response time or averaging method, and available session metrics.

A value shown only as "dB" is incomplete. For environmental sound, the app may display an A-weighted level in dBA. A session may also include an equivalent average such as LAeq, a maximum value, or a peak estimate.

A-weighting is widely used in environmental and occupational guidance. C-weighting retains more low-frequency contribution and is also used for some peak measurements. Two values should not be compared as if they were identical when their weightings or metrics differ.

[dB vs dBA: What Is the Difference?](/articles/db-vs-dba/)
Check the app's calibration status before measuring. An uncalibrated reading should be treated as an estimate. A saved offset is useful only for the phone, input, app, settings, and setup for which it was established. [NIOSH guide][2]

## 3. Find the phone's microphone openings

Android phones do not all place their microphones in the same locations. A phone may have openings near the bottom edge, top edge, rear cameras, or other parts of the case. It may use different microphones for calls, video, noise reduction, or an app's selected input route.

Check the manufacturer's device diagram or inspect the phone carefully. Do not insert anything into a microphone opening.

The active microphone may not be obvious from appearance alone. A simple handling check can help identify whether covering one opening changes the reading, but do not treat that as formal validation. The app and operating system may also switch routes under some conditions.

## 4. Remove obstructions

Take the phone out of a pocket or bag. Keep fingers away from every likely microphone opening. Do not rest the microphone edge against clothing, a cushion, or another surface.

A case can partly block a port or change the acoustic space around it. For the most repeatable setup, remove the case before calibration and measurement. If the case must remain fitted, keep it fitted for every measurement and establish any calibration with that exact case.

Avoid measuring with the phone lying flat on a table unless the surface position is part of the intended method. A tabletop can block a microphone and create reflections. A small stand or tripod is more repeatable than placing the phone directly on a hard surface.

## 5. Set a fixed position and distance

Place the phone where the listener or measurement point is meant to be. Record the distance from the source and the height above the floor when those details matter.

Distance changes the real sound pressure level. In a simple free field, doubling the distance from a point-like source reduces sound pressure level by about 6 dB. Rooms, walls, large sources, multiple sources, and reverberation can make the change smaller or less predictable. [OSHA][3]

For an appliance comparison, a repeatable note might say:

> Phone on a stand, active microphone facing the appliance, 1 metre from the front, 1.2 metres above the floor, case removed.

Do not move closer simply to obtain a larger number. For loud sources, increasing distance may also reduce personal exposure and lower the chance of microphone overload.

For a source that can move close to the listener, such as [a crying baby](/sounds/baby-crying/), document the real ear-to-source position without moving the phone toward the source or disrupting care.

## 6. Keep the orientation consistent

Phone bodies and microphone ports affect directionality. Turning the device can change the response, especially at higher frequencies. Research has shown that orientation and handling are relevant even for a phone system that performed well in other sound level meter tests. [Celestina et al.][6]

Choose one orientation and retain it through the session. For comparisons on different days, take a photo or write a short note describing how the phone was held.

Hold the device away from your torso. Your body can block or reflect sound. Do not stand between the phone and the source.

## 7. Control wind and air movement

Wind across a microphone creates turbulence that can be reported as low-frequency sound. Even light outdoor wind can cause unstable or falsely high readings. Fans, ventilation outlets, and moving the phone through the air can produce the same problem.

Use a suitable windscreen with an external measurement microphone when the setup supports one. A phone's built-in microphone is difficult to protect properly without obstructing it. Record the wind conditions and repeat the measurement in calmer conditions when possible.

A windscreen reduces wind noise, but it does not certify the phone or correct other microphone limitations. Professional outdoor measurements may require specified windscreens, weather limits, microphone positions, and post-measurement checks. [OSHA][3]

## 8. Consider the room before comparing readings

Indoor measurements include direct sound and reflections from walls, floors, ceilings, furniture, and windows. A small move can change a tonal reading because of standing waves. Corners and positions close to walls may increase some frequencies.

Keep the source, phone, doors, windows, furnishings, and operating conditions unchanged when comparing results. For machinery or appliances, record the cycle or setting. A dishwasher filling, washing, draining, and drying does not produce one constant level.

Outdoor and indoor readings should not be compared without acknowledging that the sound field is different.

## 9. Match the settings to the question

Keep the same weighting and response time throughout a comparison.

A live display may use a short RMS window or a standardized Fast or Slow response. Fast follows changing sound more quickly. Slow produces a steadier display. The exact implementation can differ between apps.

An equivalent average such as LAeq combines sound energy across a defined period. It is useful for a varying environment because it represents the constant level with the same energy over that period.

A maximum is the highest value produced by the selected weighting and response during the session. A peak follows a much shorter pressure event. Maximum and peak are not interchangeable, and phone peaks are particularly vulnerable to clipping and processing.

[What Is Sound Pressure Level? SPL Explained](/articles/what-is-sound-pressure-level/)
## 10. Let the measurement represent the sound

Do not record only the moment that supports the result you expected. The observation period should cover the source's meaningful variation.

For a steady fan, a stable period of 30 to 60 seconds may be enough for a practical comparison. For an appliance cycle, commute, restaurant, workplace, or bedroom, a longer session may be needed. There is no universal duration because the source and question differ.

Before recording a formal comparison, allow the display to settle. Avoid speaking, touching the phone, moving nearby objects, or tapping the stand during the measured interval.

Repeat the measurement when practical. Several consistent sessions are more informative than one isolated value. Large variation between repeats may show that the environment, source, phone position, or audio processing is not stable.

## 11. Read current, average, maximum, and peak separately

A current reading tells you what the detector reports at that moment. It is useful for observing change, but one live number may not represent a variable environment.

An average or equivalent level summarizes a period. Check whether the app uses an energy average such as LAeq rather than an arithmetic mean of visible dB numbers.

A maximum reports the largest time-weighted value during the session. It depends on the selected response and observation period.

A peak value attempts to capture the strongest short pressure excursion. Smartphone microphones and audio processing may compress or miss sharp peaks. Treat phone peak results with extra caution, particularly for fireworks, impacts, alarms, or other impulsive sources.

## 12. Watch for signs of overload or processing

A very loud source may exceed the linear range of the microphone or input electronics. The reading may stop rising, fluctuate strangely, or remain lower than expected. Digital clipping can sometimes be detected, but analog saturation or automatic gain control may occur without obvious clipped samples.

Android describes automatic gain control as processing that raises or lowers input to keep the captured output approximately constant. Android also states that processing can depend on the selected audio source and device. [Android AGC][4] [Android audio source][5]

Do not assume that an app's scale proves the phone can measure its full displayed range. Move to a safer distance if the sound is uncomfortably loud. Do not approach a source to test the upper limit of the phone.

## 13. Document the measurement

Record enough context to understand the number later. A useful note includes:

- date and local time
- phone model and operating system
- app version
- built-in or external microphone
- calibration status and date
- frequency weighting
- response time or averaging duration
- source and operating condition
- distance, height, and orientation
- room or outdoor conditions
- wind and case status
- session MIN, AVG or LAeq, MAX, and peak where relevant
- any possible overload warning

Screenshots without this context can look precise while remaining difficult to interpret.

## 14. Interpret the result within the phone's limits

Use a phone measurement for awareness, screening, and controlled comparisons. Do not use a small difference near a threshold as proof that one condition is compliant, safe, or officially acceptable.

Calibration can improve agreement but cannot remove every error from frequency response, automatic gain control, self-noise, compression, clipping, orientation, or app calculations.

A professional measurement is appropriate when the result affects occupational compliance, environmental enforcement, engineering decisions, certification, litigation, or another safety-critical decision.

[Phone Sound Meter vs Professional Sound Level Meter](/articles/phone-sound-meter-vs-professional-meter/)
## Record a repeatable session with dBcheck

Use dBcheck to monitor a session and review MIN, AVG, MAX, Peak, and equivalent level information where available. Keep the phone position, distance, orientation, weighting, and measurement duration consistent. Save enough context to make later comparisons meaningful, and treat the result as an estimated smartphone measurement.

## Sources

1. CDC/NIOSH, *NIOSH Sound Level Meter App*. [https://www.cdc.gov/niosh/noise/about/app.html](https://www.cdc.gov/niosh/noise/about/app.html)
2. CDC/NIOSH, *NIOSH Sound Level Meter Application: Features and Instructions*. [https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf](https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf)
3. OSHA Technical Manual, Section III, Chapter 5. [https://www.osha.gov/otm/section-3-health-hazards/chapter-5](https://www.osha.gov/otm/section-3-health-hazards/chapter-5)
4. Android Developers, *AutomaticGainControl API reference*. [https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl](https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl)
5. Android Developers, *MediaRecorder.AudioSource API reference*. [https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource](https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource)
6. Celestina, Kardous, and Trost, *Smartphone-based sound level measurement apps: Evaluation of directional response*. [https://doi.org/10.1016/j.apacoust.2020.107673](https://doi.org/10.1016/j.apacoust.2020.107673)

[1]: https://www.cdc.gov/niosh/noise/about/app.html
[2]: https://www.cdc.gov/niosh/media/pdfs/NIOSH-Sound-Level-Meter-Application-app-English.pdf
[3]: https://www.osha.gov/otm/section-3-health-hazards/chapter-5
[4]: https://developer.android.com/reference/kotlin/android/media/audiofx/AutomaticGainControl
[5]: https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource
[6]: https://doi.org/10.1016/j.apacoust.2020.107673
