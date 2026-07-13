# dBcheck Content Plan

**Proposed file:** `dbcheck-content-plan.md`
**Language:** English
**Scope:** Approximately 40 priority articles for the dBcheck website
**Editorial objective:** Build topical authority around decibels, sound measurement, noise exposure, smartphone measurement, common sound levels, home and environmental noise, sleep and night noise, concerts, workplace noise, and technical sound analysis.

## 1. Strategic direction

dBcheck should become a focused reference and practical measurement site, not a broad medical hearing-health publication. The strongest positioning is the intersection of:

- accurate explanations of sound metrics and measurement methods
- transparent guidance on what smartphones can and cannot measure
- careful, source-backed noise-exposure education
- context-rich common-sound reference pages
- practical use of dBcheck and related calculators

Medical information should appear only where it is necessary to communicate hearing-risk limits, urgent warning symptoms after loud noise, or the limits of what an app can determine. The site should not expand into ear disease, hearing aids, tinnitus treatment, sleep-disorder diagnosis, audiology, or general clinical hearing advice.

### Research report key

| Code | Deep Research report | Primary use |
|---|---|---|
| DR1 | Decibels and Sound-Level Measurement | Definitions, formulas, weightings, LAeq, maximum, peak, perception, ITU-R 468 |
| DR2 | Safe Noise Exposure and Hearing-Risk Guidance | NIOSH, OSHA, WHO, EU guidance, dose, duration, impulse noise, YMYL wording |
| DR3 | Accuracy and Limitations of Smartphone Decibel Meter Apps, Especially on Android | Accuracy, Android variability, AGC, calibration, external microphones, legal and official-use limits |
| DR4 | Typical Decibel Ranges for Common Sounds | Sound ranges, distance, metrics, uncertainty, sound-page strategy |

## 2. YMYL policy and source standards

Health and safety pages must be marked internally as YMYL during planning, drafting, review, and updates. The label should not necessarily be shown to readers, but it should control the editorial workflow.

| Level | Typical articles | Required approach |
|---|---|---|
| YMYL high | Hearing-risk thresholds, exposure time, dose, concerts, workplace noise, impulse noise, fireworks, high-level tools, white noise for infants | Use current official guidance and primary sources. Name the framework. Avoid diagnosis, binary safe or dangerous claims, guaranteed safe times, or individual injury predictions. Require technical and safety review before publication. |
| YMYL moderate | Night noise, snoring, baby crying, commuter exposure, airplane cabin, dog barking | Keep health claims narrow. State measurement uncertainty. Do not diagnose sleep apnea or hearing damage. Add specialist sources when discussing children or sleep outcomes. |
| YMYL-supporting technical | LAeq, LCpeak, phone accuracy, professional meter requirements | Technical accuracy affects safety decisions. Definitions, instrument limits, and uncertainty must be exact even when the page is not medical. |
| Non-YMYL technical | Basic decibel theory, logarithms, FFT concepts, sound power versus sound pressure | Prefer standards bodies, government metrology sources, official documentation, and peer-reviewed research. Clearly label approximations. |

### Mandatory wording rules for YMYL content

- Use **recommended exposure time**, **time to 100% reference dose**, or **guideline allowance**, not **safe time**.
- Do not say that 85 dBA is a universal damage threshold.
- Do not say that a dose below 100% proves safety or that a dose above 100% proves injury.
- Do not combine NIOSH, OSHA, WHO, and EU values without naming the framework and time basis.
- Do not apply continuous-noise time tables as a complete assessment of fireworks, blasts, gunshots, or other impulses.
- Do not use an unverified smartphone reading to establish workplace compliance, legal enforcement, clinical diagnosis, or safety-critical decisions.
- When symptoms are mentioned, keep the advice narrow: sudden hearing loss after loud noise needs urgent medical assessment; persistent ringing, marked muffling, pain, discharge, or dizziness warrants professional evaluation.

### Review cadence

- Review YMYL and regulatory pages at least annually and whenever WHO, NIOSH, OSHA, EU, Android, or relevant standards guidance changes.
- Recheck Android and smartphone-accuracy articles every 6 to 12 months because hardware, operating systems, APIs, and app behavior change.
- Recheck common-sound source links annually. Update ranges only when stronger evidence changes the defensible editorial range.
- Add a visible “last reviewed” date to YMYL, standards, and smartphone-accuracy pages.

## 3. Content clusters and pillar articles

### 1. Decibel fundamentals

Builds the site's technical vocabulary and prevents errors throughout every other article. The pillar is article 1. Articles 2 to 8 answer narrower interpretation and calculation questions.

### 2. Smartphone sound measurement

Directly supports dBcheck's product positioning. The pillar is article 9. The cluster must be unusually transparent about Android variation, calibration limits, overload, and official-use boundaries.

### 3. Noise exposure and hearing risk

The main YMYL cluster. The pillar is article 16. Articles 17 to 20 explain time, dose, standards, and impulse noise. Articles 21 and 22 apply the framework to concerts and work.

### 4. Home, environmental, and sleep noise

Covers appliances, transport, bedroom measurement, snoring, and white noise without turning the site into a general health publication.

### 5. Technical sound analysis

Supports advanced dBcheck features such as spectra, spectrograms, RTA, and weighting choices. The pillar is article 27.

### 6. Common sound reference library

The /sounds/ directory provides context-rich source pages. The pillar is article 30. Individual pages are published only when they can offer more than a number.

### Pillar hierarchy

| Pillar | Primary children |
|---|---|
| `/decibels/what-is-a-decibel/` | dBA/dBC/dBZ, SPL, LAeq/max/peak, dB changes, addition and averaging, distance, sound power |
| `/phone-decibel-meter/accuracy/` | Android accuracy, calibration, external microphone, app disagreement, measurement procedure, professional meter decision |
| `/noise-exposure/how-loud-is-too-loud/` | NIOSH time chart, dose, standards comparison, continuous vs impulse, concert protection, workplace noise |
| `/workplace-noise/` | chainsaw, leaf blower, future lawn mower and construction drill pages |
| `/home-noise/household-appliances/` | refrigerator, dishwasher, washing machine, vacuum, hair dryer, blender |
| `/sleep-noise/night-noise-bedroom/` | snoring and white noise comparison, individual snoring and white-noise pages |
| `/technical/sound-analysis/` | FFT/spectrogram/octave bands, ITU-R 468 comparison |
| `/sounds/` | all individual common-sound reference pages |

## 4. Proposed URL architecture

Use short, stable, lowercase, hyphenated URLs. Keep dates out of evergreen slugs. Use one canonical trailing-slash convention across the site.

```text
/decibels/
  what-is-a-decibel/
  dba-dbc-dbz/
  sound-pressure-level/
  laeq-lafmax-lcpeak/
  3-db-10-db-increase/
  add-average-decibels/
  distance-sound-level/
  sound-power-vs-sound-pressure/

/phone-decibel-meter/
  accuracy/
  android-accuracy/
  calibration/
  external-microphone/
  apps-different-results/
  how-to-measure-sound/
  phone-vs-professional-meter/

/noise-exposure/
  how-loud-is-too-loud/
  niosh-time-chart/
  noise-dose/
  niosh-vs-osha-vs-who/
  continuous-vs-impulse-noise/

/guides/
  concert-hearing-protection/

/workplace-noise/

/home-noise/
  household-appliances/

/environmental-noise/
  transport-noise/

/sleep-noise/
  night-noise-bedroom/
  snoring-white-noise/

/technical/
  sound-analysis/
  fft-spectrogram-octave-bands/
  itu-r-468-vs-a-weighting-bs1770/

/sounds/
  concert/
  fireworks/
  chainsaw/
  leaf-blower/
  subway/
  airplane-cabin/
  baby-crying/
  dog-bark/
  snoring/
  white-noise-machine/

/tools/
  noise-exposure-time/
  noise-dose/
  decibel-distance/
  add-decibels/
  common-sounds/
```

The `/tools/` URLs are recommended CTA destinations. They should be used only for tools that exist or are intentionally added. Until then, the CTA can point to the dBcheck Android app or the relevant explanatory article.

## 5. Forty-article plan

### Decibel fundamentals

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 1 | **What Is a Decibel? How the dB Scale Works**<br>`/decibels/what-is-a-decibel/` | Pillar. Informational definition and first-touch education. | DR1 | Own the broad definition query. Keep SPL formulas, weightings, and exposure limits as short introductions that point to dedicated pages. | 2, 3, 5, 6, 16, 30 | Use dBcheck to observe how real-world levels change, with an estimate disclaimer. | Non-YMYL. Cite BIPM, IEC terminology, NIST, and NIDCD. Avoid calling dB a direct unit of loudness. | First release |
| 2 | **dB vs dBA vs dBC vs dBZ: Sound Weightings Explained**<br>`/decibels/dba-dbc-dbz/` | Comparison and definition. Users choosing or interpreting a weighting. | DR1 + DR3 | Merge all general A, C, and Z weighting explanations here. Do not create separate thin pages for each weighting at launch. | 1, 4, 9, 14, 20, 29 | Open dBcheck and compare the available weighting modes, with device limitations visible. | Non-YMYL technical. State that A-weighting is not an exact model of hearing and C-weighting is not simply “more accurate.” | First release |
| 3 | **What Is Sound Pressure Level (SPL)?**<br>`/decibels/sound-pressure-level/` | Technical definition with general-audience explanation. | DR1 | Keep the reference pressure, RMS, and SPL formula here. Article 1 should stay conceptual. | 1, 4, 6, 8, 9 | Measure an estimated sound pressure level with dBcheck, then review calibration status. | Non-YMYL. Explain that 0 dB SPL is not silence and that SPL is measured at a specific microphone position. | Second release |
| 4 | **LAeq, LAFmax, and LCpeak: Average, Maximum, and Peak Sound**<br>`/decibels/laeq-lafmax-lcpeak/` | Comparison and interpretation. Users reading meters, reports, or regulations. | DR1 + DR2 + DR3 | Merge “average vs max” and “peak vs maximum” into this page. Do not create separate LAeq and LCpeak pages initially. | 2, 3, 10, 16, 20, 30 | Start a dBcheck session and compare current, equivalent, maximum, and peak-style outputs that the device can validly provide. | YMYL-supporting technical content. Clearly separate energy average, time-weighted maximum, and instantaneous peak. Warn that phones may miss or clip peaks. | First release |
| 5 | **What Does a 3 dB or 10 dB Increase Mean?**<br>`/decibels/3-db-10-db-increase/` | Concept clarification. Energy ratio versus perceived loudness. | DR1 + DR2 | Own the “twice as loud” misconception. Other pages should link here rather than repeat full psychoacoustic caveats. | 1, 6, 7, 16, 17 | Use the decibel comparison calculator to compare two levels. | Non-YMYL with perception caveats. Say 3 dB is approximately double energy, not double loudness, and 10 dB is only often perceived as roughly twice as loud. | Second release |
| 6 | **How to Add and Average Decibel Levels**<br>`/decibels/add-average-decibels/` | Problem-solving and calculator support. | DR1 + DR2 | Combine source addition and logarithmic energy averaging. Do not split into two nearly identical formula pages. | 1, 4, 5, 18 | Open the dB addition and energy-average calculator. | Non-YMYL technical. Distinguish incoherent source addition from coherent phase-dependent tones. Do not use arithmetic means for exposure. | Second release |
| 7 | **How Distance Affects Sound Level: The 6 dB Rule**<br>`/decibels/distance-sound-level/` | Practical explanation and calculator intent. | DR1 + DR3 + DR4 | Own inverse-distance explanations. Sound pages should summarize distance effects briefly and link here. | 3, 8, 14, 23, 24, 30 | Use the sound-distance calculator, then repeat the measurement at a documented distance. | Non-YMYL technical. State that 6 dB per doubling is an approximation for a point source in a free field, not a universal indoor rule. | First release |
| 8 | **Sound Power vs Sound Pressure: Why Appliance Labels and Phone Readings Differ**<br>`/decibels/sound-power-vs-sound-pressure/` | Comparison. Product-label and measurement interpretation. | DR1 + DR4 | Own LWA versus listener-position SPL. Appliance and machinery pages should link here instead of re-explaining the distinction in full. | 3, 7, 14, 23, 33, 34 | Use dBcheck to compare listener-position readings, not to verify a declared sound-power label. | Non-YMYL technical. Never imply that an LWA label and a phone dBA reading are directly interchangeable. | Second release |

### Smartphone sound measurement

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 9 | **How Accurate Are Decibel Meter Apps?**<br>`/phone-decibel-meter/accuracy/` | Pillar. Broad evaluation and product-relevance query. | DR3 + DR1 | Own the general accuracy question. Android variability, calibration, external microphones, and professional meters each get focused child pages. | 10, 11, 12, 13, 14, 15 | Try dBcheck as an awareness and comparison tool, with calibration and device limitations shown. | High-trust technical content. Do not publish one universal accuracy claim. Explain that accuracy belongs to a specific phone, app, input path, calibration, level, and sound. | First release |
| 10 | **Android Decibel Meter Accuracy: Why Results Vary by Phone**<br>`/phone-decibel-meter/android-accuracy/` | Platform-specific informational and troubleshooting intent. | DR3 | Keep general smartphone findings on article 9. This page should focus on Android fragmentation, audio sources, AGC, manufacturer processing, and model variation. | 9, 13, 14, 15 | Check dBcheck’s calibration and input information on the exact Android device being used. | High-trust technical content. Cite Android documentation and Android-specific studies. Avoid model-wide guarantees unless a model has been tested. | First release |
| 11 | **How to Calibrate a Decibel Meter App**<br>`/phone-decibel-meter/calibration/` | How-to guide. Users trying to improve repeatability. | DR3 + DR1 | Own calibration procedure and calibration-state terminology. Article 12 should focus on microphone hardware, not repeat the full process. | 9, 10, 12, 14, 15 | Create or review a dBcheck calibration profile and record the reference method and date. | High-trust technical content. Distinguish a user offset, reference comparison, and acoustic calibrator. State what one-point calibration cannot fix. | Second release |
| 12 | **Do External Microphones Improve Smartphone dB Measurements?**<br>`/phone-decibel-meter/external-microphone/` | Commercial investigation and technical comparison. | DR3 | Focus on benefits, interfaces, profiles, and limits. Do not imply that an external microphone automatically creates a Class 1 or Class 2 system. | 9, 11, 14, 15 | Connect a compatible microphone in dBcheck and use a microphone-specific calibration profile. | High-trust technical content. Instrument class applies to the complete tested system. Avoid certification language without evidence. | Second release |
| 13 | **Why Two Decibel Meter Apps Show Different Results**<br>`/phone-decibel-meter/apps-different-results/` | Troubleshooting and comparison. | DR3 + DR1 | Own differences caused by audio source, processing, weighting, response, averaging, calibration, and metric. Do not duplicate Android hardware detail from article 10. | 2, 4, 9, 10, 14 | Match weighting, averaging period, calibration, orientation, and device before comparing dBcheck with another app. | Non-YMYL technical. Explain that visually precise numbers do not prove metrological accuracy. | Second release |
| 14 | **How to Measure Sound Correctly with a Smartphone**<br>`/phone-decibel-meter/how-to-measure-sound/` | Practical how-to guide and strong product onboarding page. | DR3 + DR4 + DR1 | Merge case, hand position, orientation, wind, distance, room reflections, duration, and repeatability into one procedure page. | 7, 9, 11, 13, 15, 30 | Start a guided dBcheck measurement and record distance, position, duration, weighting, and calibration status. | High-trust technical content. State that good procedure improves repeatability but does not turn an unvalidated phone into a certified meter. | First release |
| 15 | **Smartphone App or Professional Sound Level Meter? When Each Is Appropriate**<br>`/phone-decibel-meter/phone-vs-professional-meter/` | Decision guide. Screening versus official, legal, occupational, or engineering work. | DR3 + DR2 + DR1 | Include Class 1 versus Class 2 and legal-evidence limits here. Avoid separate thin launch pages for “legal evidence” and “Class 1 vs Class 2.” | 9, 11, 12, 14, 22 | Use dBcheck for screening and comparisons; request a qualified measurement when the result must establish compliance or withstand challenge. | YMYL-adjacent and legal-adjacent. Add jurisdiction caveat, no legal advice, and official measurement requirements. Cite IEC-related and regulator guidance. | Second release |

### Noise exposure and hearing risk

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 16 | **How Loud Is Too Loud? Sound Level, Time, and Hearing Risk**<br>`/noise-exposure/how-loud-is-too-loud/` | Pillar. Broad safety education and top-of-funnel YMYL query. | DR2 + DR1 + DR3 | Own the broad risk explanation. Detailed time tables, dose, standards comparison, impulse noise, concerts, and workplace guidance belong to child pages. | 17, 18, 19, 20, 21, 22, 30 | Measure an estimated LAeq with dBcheck and compare it with a named guideline, not a generic “safe” label. | YMYL high. Use WHO, NIOSH, NIDCD, OSHA, and EU sources. Avoid binary thresholds, diagnosis, or guaranteed safe times. Include urgent sudden-hearing-loss wording only as a brief safety box. | First release |
| 17 | **NIOSH Noise Exposure Time Chart: 85 to 115 dBA**<br>`/noise-exposure/niosh-time-chart/` | Reference table and calculator intent. | DR2 + DR1 + DR3 | Own the NIOSH 3 dB duration table. Other pages should quote only a few examples and link here. | 5, 16, 18, 19, 20 | Open the NIOSH exposure-time calculator using an LAeq estimate and visible uncertainty. | YMYL high. Use “time to 100% NIOSH daily dose,” not “safe time.” Mark 103 to 115 dBA values as formula-derived and warn about phone overload and impulse noise. | First release |
| 18 | **What Is Noise Dose? Daily Exposure Explained**<br>`/noise-exposure/noise-dose/` | Definition, formula, and calculator support. | DR2 + DR1 | Own cumulative dose and multiple-exposure calculations. Article 17 owns the single-level time table. | 4, 6, 16, 17, 19, 22 | Use the noise-dose calculator to combine several exposure periods under a named standard. | YMYL high. State that 100% dose means a guideline allowance has been used, not that damage definitely occurred. Identify daily versus weekly frameworks. | Second release |
| 19 | **NIOSH vs OSHA vs WHO Noise Guidelines**<br>`/noise-exposure/niosh-vs-osha-vs-who/` | Standards comparison. Users confused by conflicting tables. | DR2 | Merge the three-system comparison here. Do not create separate general pages for each system unless future search data justifies deeper jurisdiction-specific content. | 16, 17, 18, 21, 22 | Choose the relevant standard in the dBcheck exposure tool and keep daily and weekly allowances separate. | YMYL high. Explain recommendation versus enforceable regulation, 3 dB versus 5 dB exchange rates, and occupational versus recreational scope. | First release |
| 20 | **Continuous Noise vs Impulse Noise: Why Peaks Need Separate Measurement**<br>`/noise-exposure/continuous-vs-impulse-noise/` | Safety explanation and measurement interpretation. | DR2 + DR1 + DR3 + DR4 | Own the continuous versus impulsive distinction. Fireworks and other sound pages should apply it to their source without repeating the full framework. | 4, 16, 17, 32 | Use dBcheck for average screening, but do not rely on a phone to capture extreme impulse peaks. | YMYL high. Do not imply that a peak below 140 dB is harmless. Emphasize that phones can clip or compress very short events. | Second release |

### Concerts and recreational sound

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 21 | **Concert Hearing Protection: How to Reduce Noise Exposure at Live Events**<br>`/guides/concert-hearing-protection/` | Practical YMYL guide. Prevention and event planning. | DR2 + DR4 + DR3 | Keep exposure reduction, breaks, distance, and hearing protection here. Article 31 owns the “how loud is a concert” query and detailed range. | 16, 19, 20, 31 | Check the venue level with dBcheck as an estimate, take quiet breaks, and use suitable hearing protection. | YMYL high. Additional research is required on hearing-protector selection and fit before drafting. Avoid claims that earplugs make any level safe. | First release |

### Workplace noise

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 22 | **Workplace Noise and Hearing Protection: A Practical Guide**<br>`/workplace-noise/` | Sub-pillar. Occupational screening, controls, and escalation. | DR2 + DR3 + DR4 + DR1 | Own the broad workplace guide. Tool-specific sound pages and the power-equipment hub should focus on source context and link here. | 15, 16, 17, 18, 19, 20, 33, 34 | Use dBcheck only for preliminary screening; arrange a compliant survey when workplace decisions or legal duties depend on the result. | YMYL high and jurisdiction-sensitive. Use official occupational sources, prioritize controls over app measurements, and state that legal duties vary. | First release |

### Home and environmental noise

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 23 | **How Loud Are Household Appliances? Refrigerator, Dishwasher, Vacuum, Hair Dryer, Blender, and Washing Machine**<br>`/home-noise/household-appliances/` | Hub and comparison intent. | DR4 + DR1 + DR3 | Group refrigerator, dishwasher, washing machine, vacuum, hair dryer, and blender initially. Create child pages only when there is enough unique search demand and source-specific depth. | 7, 8, 14, 30 | Measure each appliance from the same position with dBcheck and save the distance and operating mode. | Mostly non-YMYL. Distinguish product sound power from listener SPL, cycle phases, and ordinary home use from occupational exposure. | First release |
| 24 | **Traffic, Train, Subway, and Aircraft Noise Compared**<br>`/environmental-noise/transport-noise/` | Hub and comparison. Environmental and travel context. | DR4 + DR1 + DR3 + DR2 | Use this as the transport comparison hub. Individual subway and airplane-cabin pages own exact source queries. Keep environmental-health claims limited until separately researched. | 7, 14, 16, 30, 35, 36 | Measure at a fixed listener position with dBcheck and compare LAeq separately from short maxima. | YMYL-supporting. Additional research is required for long-term environmental noise, Lden, and Lnight health claims. Do not mix passenger, platform, trackside, cabin, and community metrics. | Second release |

### Sleep and night noise

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 25 | **Night Noise and Sleep: How to Measure Your Bedroom Sound Environment**<br>`/sleep-noise/night-noise-bedroom/` | Sleep-environment guide and measurement procedure. | DR3 + DR4 + DR1; supplemental research required | Own bedroom measurement method, overnight LAeq, events, positioning, and interpretation. Article 26 focuses on snoring and white-noise sources. | 4, 7, 14, 16, 26, 39, 40 | Run an overnight dBcheck session with the phone placed consistently and interpret it as an environmental estimate. | YMYL moderate. Dedicated WHO or equivalent night-noise research is required before drafting. Avoid diagnosing sleep disorders or promising health outcomes from one reading. | Second release |
| 26 | **Snoring and White Noise Machines: Sound Levels, Distance, and Overnight Exposure**<br>`/sleep-noise/snoring-white-noise/` | Comparative sleep-sound guide. | DR4 + DR2 + DR3; supplemental sleep research required | Keep comparison and bedroom setup here. Articles 39 and 40 own individual “how loud” searches and provide full source-specific ranges. | 14, 16, 25, 39, 40 | Measure at pillow or ear position with dBcheck and use the lowest effective white-noise setting. | YMYL moderate. Loudness does not diagnose sleep apnea. Infant white-noise content needs pediatric source review and especially careful wording. | Later content |

### Technical sound analysis

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 27 | **Technical Sound Analysis: A Guide to Frequency, Spectrum, and Time**<br>`/technical/sound-analysis/` | Pillar. Orientation page for advanced users. | DR1 + DR3; supplemental technical research required | Keep this as a conceptual map. Detailed FFT, spectrogram, and octave-band methods go to article 28; broadcast metrics go to article 29. | 2, 4, 28, 29 | Open dBcheck’s spectral tools and compare time-domain level with frequency-domain information. | Non-YMYL technical. Additional primary-source research is required for implementation-level claims. Clearly separate SPL, spectrum magnitude, loudness, and programme metrics. | Second release |
| 28 | **FFT, Spectrograms, and Octave Bands Explained**<br>`/technical/fft-spectrogram-octave-bands/` | Advanced explainer and tool education. | DR1 + DR3; supplemental standards research required | Combine FFT bars, spectrograms, RTA, octave bands, and one-third-octave concepts in one substantial page. Split only if search data later supports distinct tools. | 3, 4, 27, 29 | Use dBcheck’s spectrum, spectrogram, and RTA views to inspect frequency content, not to replace a calibrated analyzer. | Non-YMYL technical. Research IEC/ISO center frequencies, windowing, FFT resolution, and calibration before drafting. Avoid presenting relative FFT magnitude as traceable band SPL. | Second release |
| 29 | **ITU-R 468, A-Weighting, and BS.1770: Different Metrics for Different Problems**<br>`/technical/itu-r-468-vs-a-weighting-bs1770/` | Niche technical comparison. | DR1 | Own ITU-R 468 and its quasi-peak detector. Article 2 remains the general environmental weighting page. | 2, 4, 27, 28 | Choose the metric that matches the task; use dBcheck’s available analysis modes only within their stated purpose. | Non-YMYL technical. State that ITU-R 468 is not just a frequency curve and that BS.1770 programme loudness solves a different problem. | Later content |

### Common sound reference library

| No. | Article and URL | Role and primary search intent | Research | Cannibalization rule | Key internal links | Recommended CTA | Source and warning needs | Priority |
|---:|---|---|---|---|---|---|---|---|
| 30 | **How Loud Are Common Sounds? A Context-Aware Decibel Chart**<br>`/sounds/` | Pillar and directory. Broad comparison and navigation intent. | DR4 + DR1 + DR2 + DR3 | Own the master chart and methodology. Individual sound pages own source-specific queries. Do not repeat full article text inside the chart. | 7, 8, 14, 16, and every /sounds/ page | Compare the chart with an estimated dBcheck reading, then check distance, metric, and device limitations. | High-trust reference. Every value needs distance or listener position, metric, sound character, and uncertainty. Never mix LAeq, LAFmax, LCpeak, LWA, and EPNdB as equivalent. | First release |
| 31 | **How Loud Is a Concert?**<br>`/sounds/concert/` | Sound page. Quick answer plus measurement and exposure context. | DR4 + DR2 + DR3 | Own concert ranges, audience position, LAeq, and peaks. Link safety actions to article 21 rather than duplicating the full protection guide. | 16, 20, 21, 30 | Use dBcheck for an estimated audience-position LAeq and take quiet breaks when levels are high. | YMYL high. Separate typical LAeq from short peaks and speaker-adjacent values. Do not call any duration universally safe. | First release |
| 32 | **How Loud Are Fireworks?**<br>`/sounds/fireworks/` | Sound page. High-intent safety and comparison query. | DR4 + DR2 + DR3 + DR1 | Own audience versus close-device levels and peak metrics. Use article 20 for the general impulse-noise framework. | 4, 16, 20, 30 | Do not approach fireworks to measure them. Use distance and hearing protection; treat phone readings as incomplete for true peaks. | YMYL high. Use LCpeak or unweighted peak for blasts, keep event LAeq separate, and include a strong no-approach warning. | First release |
| 33 | **How Loud Is a Chainsaw?**<br>`/sounds/chainsaw/` | Sound page. Operator exposure and hearing-protection intent. | DR4 + DR2 + DR3 | Own chainsaw levels and operating conditions. Article 22 owns workplace duties and broader control hierarchy. | 16, 17, 22, 30 | Use dBcheck only for rough screening at a safe operator position; use suitable hearing protection and professional assessment for work. | YMYL high. State operator hearing-zone context, task duration, and phone high-level uncertainty. | Second release |
| 34 | **How Loud Is a Leaf Blower?**<br>`/sounds/leaf-blower/` | Sound page. Consumer and occupational query. | DR4 + DR2 + DR3 + DR1 | Own leaf-blower levels and operator versus bystander context. Link label interpretation to article 8 and workplace guidance to article 22. | 8, 16, 17, 22, 30 | Compare operator and bystander positions with dBcheck, without treating product LWA as the same measurement. | YMYL high for extended work exposure. Distinguish petrol and battery models, operator SPL, bystander distance, and product sound power. | Later content |
| 35 | **How Loud Is a Subway?**<br>`/sounds/subway/` | Sound page. Commuter exposure and comparison query. | DR4 + DR2 + DR3 + DR1 | Own car and platform ranges, screech maxima, and average-versus-peak distinction. Article 24 remains the multi-mode transport comparison. | 4, 16, 24, 30 | Measure the same route and position with dBcheck and compare trip LAeq separately from the loudest moment. | YMYL-supporting. Do not describe a reported 110 dB peak as the whole trip average. | Second release |
| 36 | **How Loud Is an Airplane Cabin?**<br>`/sounds/airplane-cabin/` | Sound page. Passenger and crew context. | DR4 + DR2 + DR3 | Own passenger head-position ranges and flight phases. Aircraft takeoff outside the cabin should be a separate future page. | 16, 24, 30 | Use dBcheck at passenger head position to compare flight phases, while treating the result as an estimate. | YMYL-supporting. Separate one passenger flight from repeated occupational crew exposure and avoid generalizing one seat or aircraft. | Later content |
| 37 | **How Loud Is a Baby Crying?**<br>`/sounds/baby-crying/` | Sound page. Caregiver concern and myth correction. | DR4 + DR2 + DR3 | Own age, distance, average-versus-maximum, and the “110 dB baby cry” misconception. Avoid turning it into a parenting or pediatric-health article. | 4, 7, 14, 16, 30 | Measure only from a normal caregiving position and never place the phone near the child’s mouth for a louder reading. | YMYL moderate. Use cautious pediatric sources, emphasize wide uncertainty, and avoid claims about injury from one reading. | Later content |
| 38 | **How Loud Is a Dog Bark?**<br>`/sounds/dog-bark/` | Sound page. Pet, neighbor, and workplace comparison intent. | DR4 + DR2 + DR3 | Own one-dog versus kennel distinctions. Do not use kennel chorus peaks as a fixed value for a household pet. | 4, 7, 14, 16, 22, 30 | Measure at a documented distance with dBcheck and compare repeated exposure separately from one bark. | YMYL-supporting. Clearly label individual bark, kennel LAeq, and peak metrics. Avoid legal nuisance conclusions. | Later content |
| 39 | **How Loud Is Snoring?**<br>`/sounds/snoring/` | Sound page. Quick range, partner disturbance, and measurement intent. | DR4 + DR3 | Own the snoring-level query. Article 26 owns comparison with white noise and overnight setup. | 14, 25, 26, 30, 40 | Measure at a documented pillow distance with dBcheck over a representative period, not from one loud event. | YMYL moderate. Loudness alone cannot diagnose obstructive sleep apnea. Avoid treatment or diagnostic claims. | Later content |
| 40 | **How Loud Should a White Noise Machine Be?**<br>`/sounds/white-noise-machine/` | Sound page. Setup and continuous overnight exposure intent. | DR4 + DR2 + DR3; supplemental pediatric review required | Own device level, distance, maximum-output evidence, and lowest-effective-setting guidance. Article 26 remains the broader sleep comparison. | 14, 16, 25, 26, 30, 39 | Measure at pillow or ear position with dBcheck and lower the device to the minimum effective level. | YMYL high when infants or children are discussed. State that maximum-output studies do not represent normal use. Add pediatric source review and avoid a universal safe number. | Second release |

## 6. Cannibalization and consolidation rules

| Topic overlap | Decision |
|---|---|
| dB, dBA, dBC, dBZ, and frequency weighting | Keep one comparison page for A, C, and Z. Do not launch separate A-weighting, C-weighting, and Z-weighting pages. |
| LAeq, average dB, maximum dB, and peak dB | Use one strong comparison page. Avoid separate thin “What is LAeq?” and “What is LCpeak?” pages until search evidence supports them. |
| Fast, Slow, Impulse, current, maximum, and peak | Explain detector and response concepts primarily inside article 4 and the smartphone measurement guide. Do not launch a separate response-time page initially. |
| Smartphone accuracy versus Android accuracy | General accuracy page covers the whole market and research pattern. Android page focuses only on fragmentation, AGC, audio sources, and model variation. |
| Calibration versus external microphones | Calibration page owns procedure and calibration states. External-microphone page owns hardware benefits, interfaces, and system-class limitations. |
| Class 1 versus Class 2, legal evidence, and official use | Consolidate into the phone-versus-professional-meter decision guide. Split only if search data shows sustained independent demand. |
| NIOSH, OSHA, and WHO | One comparison page. The NIOSH time chart and noise-dose page may stand alone because they satisfy distinct calculator and reference intent. |
| Concert level versus concert safety | `/sounds/concert/` answers how loud concerts are. `/guides/concert-hearing-protection/` answers what a visitor can do about exposure. |
| Household appliance sounds | Group refrigerator, dishwasher, washing machine, vacuum, hair dryer, and blender in one hub initially. Create individual pages only when unique evidence, use context, and search demand justify them. |
| Transport noise | Use one comparison hub. Keep high-intent child pages for subway and airplane cabin. Add aircraft takeoff, motorcycle, car horn, and busy traffic later. |
| Snoring and white noise | The sleep comparison guide owns bedroom setup and interaction. Individual `/sounds/` pages own source-specific ranges and measurement context. |
| Power tools and workplace noise | Workplace pillar owns compliance and control principles. Individual sound pages own source level, operating condition, distance, and task context. |
| Common-sound chart versus individual sound pages | The chart summarizes and routes. Individual pages must not be templated copies and must provide unique measurement, uncertainty, and exposure context. |

## 7. Which sounds deserve their own `/sounds/` page?

### Tier 1: publish within the first 40 articles

| Sound | Why it supports a standalone page |
|---|---|
| Concert | Strong search intent, average-versus-peak confusion, duration, venue position, and a separate safety guide. |
| Fireworks | High safety relevance, impulse metrics, audience versus close-device levels, and serious smartphone peak limitations. |
| Chainsaw | Strong operator-exposure intent, reliable occupational sources, and clear hearing-protection relevance. |
| Leaf blower | Strong occupational and neighborhood intent, operator versus bystander distinction, and sound-power label confusion. |
| Subway | Common commuter query with useful research separating trip average, maximum, and peak. |
| Airplane cabin | Distinct passenger and crew intent, flight-phase variation, and enough evidence for a substantive page. |
| Baby crying | High search demand and widespread misleading single-number claims that need careful correction. |
| Dog barking | Strong consumer and occupational intent, plus a critical difference between one dog and a reverberant kennel. |
| Snoring | Strong sleep-related search intent, clear measurement-distance issues, and an important no-diagnosis boundary. |
| White noise machine | Strong setup intent, continuous overnight exposure, distance sensitivity, and special caution for infant-focused content. |

### Tier 2: strong standalone pages after the first 40

- Busy traffic
- Car horn
- Motorcycle
- Aircraft takeoff
- Lawn mower
- Construction drill
- Nightclub
- Movie theater
- Stadium
- Emergency siren
- Thunder

These topics have distinct search intent, meaningful measurement complexity, and enough safety or context to avoid thin content. Aircraft takeoff, thunder, sirens, and car horns especially require distance and metric discipline.

### Tier 3: possible standalone pages only with proven demand and enough unique content

- Vacuum cleaner
- Hair dryer
- Blender
- Train
- Dishwasher

A standalone page is justified only when it can include source-specific operating states, measurement geometry, product-label interpretation, user procedure, uncertainty, and unique FAQs. A page that merely says “a vacuum cleaner is about 75 dB” should not exist.

### Keep grouped at first

- Whisper
- Normal conversation
- Refrigerator
- Washing machine

These work better as entries in the master sound chart and in the household or quiet-indoor comparison hub. Their search intent is usually comparative, and a single-number page would be thin.

## 8. Required template for every individual sound page

To prevent thin and repetitive pages, every `/sounds/` article should include:

1. A concise answer with a defensible typical range.
2. The likely measurement distance or listener position.
3. The correct primary metric, such as LAeq, LAFmax, or LCpeak.
4. Whether the source is continuous, variable, intermittent, or impulsive.
5. Typical, loud, and exceptional scenarios, clearly separated.
6. The main factors that change the reading.
7. A practical, safe smartphone measurement procedure.
8. A phone-accuracy note tailored to the source, including quiet-floor or overload limitations.
9. Exposure context based on level and duration, with a named framework when relevant.
10. Common misleading claims and why credible sources disagree.
11. Unique FAQs that are not copied from other sound pages.
12. Links to the `/sounds/` hub, the relevant measurement guide, the relevant exposure article, and a related comparison hub.

Every sound page should show this core disclosure near the first range:

> Sound levels are approximate. The same source can differ by tens of decibels depending on distance, direction, environment, operating condition, and measurement method. Averages, maxima, peaks, and product sound-power labels are not interchangeable.

## 9. Internal linking plan

### Site-wide rules

- Every child article links to its pillar in the introduction or first explanatory section.
- Every pillar links to all direct children through a visible contents module, not only inline body links.
- Every `/sounds/` page links to `/sounds/`, `/phone-decibel-meter/how-to-measure-sound/`, and the most relevant exposure or environment guide.
- Every YMYL article links to the smartphone-accuracy limitations when a phone result is used in a calculation or decision.
- Every calculator result links to the article that explains its formula and limitations.
- Use descriptive anchors such as “NIOSH exposure time chart” and “difference between LAeq and LCpeak,” not repeated generic anchors such as “learn more.”

### Highest-value internal link routes

| From | Must link to | Reason |
|---|---|---|
| What Is a Decibel? | dBA/dBC/dBZ, LAeq/max/peak, common sounds | Moves beginners into interpretation and examples. |
| How Accurate Are Decibel Meter Apps? | Android accuracy, calibration, measurement procedure, professional meter guide | Creates the main product-trust pathway. |
| How Loud Is Too Loud? | NIOSH time chart, dose, standards comparison, impulse noise | Separates broad risk intent from detailed frameworks. |
| NIOSH time chart | Noise dose, NIOSH vs OSHA vs WHO, phone accuracy | Prevents misuse of one instantaneous or uncertain input. |
| Workplace Noise | Professional meter guide, NIOSH time chart, chainsaw, leaf blower | Connects official-use limits with source examples. |
| Concert protection | Concert sound page, impulse noise, exposure pillar | Separates prevention from range lookup. |
| Household appliance hub | Sound power vs sound pressure, distance rule, smartphone procedure | Explains why labels and home readings differ. |
| Transport hub | Subway, airplane cabin, LAeq/max/peak | Prevents mixing passenger averages and short maxima. |
| Night noise guide | Snoring, white noise machine, smartphone procedure | Builds a focused sleep-environment cluster without medical expansion. |
| Technical sound analysis | Weightings, LAeq/max/peak, FFT/spectrogram/octave bands, ITU-R 468 | Creates a coherent advanced-learning path. |
| Common sounds hub | All sound pages, distance rule, measurement guide, exposure pillar | Turns a broad chart into the central reference directory. |

## 10. CTA framework

CTAs should help the reader perform the next sensible action. They should not overstate dBcheck’s accuracy or imply that a phone measurement proves safety or compliance.

| CTA destination | Best used on | Required wording constraint |
|---|---|---|
| dBcheck Android app | Smartphone, common-sound, home, travel, concert, and sleep articles | Describe the reading as an estimate for awareness and relative comparison. |
| Noise exposure time calculator | NIOSH time chart, concert, workplace, chainsaw, leaf blower | Name the standard and use “time to 100% reference dose,” not “safe time.” |
| Noise dose calculator | Dose, workplace, mixed-exposure articles | State that the calculator cannot improve an uncertain input. |
| Decibel distance calculator | Distance article, appliances, traffic, barking, baby crying | State the free-field point-source assumption. |
| Add decibels calculator | Addition and averaging article, multi-source examples | Distinguish independent source addition from coherent tones. |
| Common sounds comparison tool | Fundamentals, measurement, and all sound pages | Display distance, metric, and uncertainty with every value. |
| Professional measurement referral | Workplace, legal or official use, high-stakes thresholds | Do not present dBcheck as a compliance instrument. |

## 11. Source and warning requirements by content type

| Content type | Minimum source standard | Required cautions |
|---|---|---|
| Core definitions and formulas | BIPM, IEC terminology or official standard pages, NIST, ITU, ISO abstracts, official government technical guidance | Define reference quantities, processing, and approximation limits. |
| Noise exposure and hearing risk | WHO, NIOSH, OSHA, EU, NIDCD, relevant peer-reviewed reviews | No universal safe threshold, no diagnosis, no guaranteed safe time, framework and time basis visible. |
| Smartphone accuracy | NIOSH, OSHA, Android documentation, peer-reviewed comparisons with calibrated meters | Exact device and method matter, Android fragmentation, quiet and high-level limits, calibration limits, official-use boundary. |
| Common sound ranges | Official or peer-reviewed source-specific evidence, plus the report’s editorial synthesis | Distance, listener position, metric, average versus peak, operating condition, and uncertainty. |
| Workplace content | Current regulator and jurisdiction-specific official sources | Recommendation versus law, instrument requirements, employer duties, and professional assessment. |
| Sleep and child-related sound | Dedicated WHO, pediatric, sleep, or equivalent authoritative research in addition to the current reports | No diagnosis, no universal bedroom target without a defined metric and context, extra care with infants and continuous overnight exposure. |
| Technical spectrum and RTA content | IEC, ISO, ITU, acoustics textbooks or peer-reviewed primary sources | Relative FFT displays are not automatically calibrated band SPL. Explain bandwidth, windowing, and resolution. |

## 12. Suggested publication order

| Order | Article | Priority wave |
|---:|---|---|
| 1 | [What Is a Decibel? How the dB Scale Works](/decibels/what-is-a-decibel/) | First release |
| 2 | [How Accurate Are Decibel Meter Apps?](/phone-decibel-meter/accuracy/) | First release |
| 3 | [How Loud Is Too Loud? Sound Level, Time, and Hearing Risk](/noise-exposure/how-loud-is-too-loud/) | First release |
| 4 | [How to Measure Sound Correctly with a Smartphone](/phone-decibel-meter/how-to-measure-sound/) | First release |
| 5 | [How Loud Are Common Sounds? A Context-Aware Decibel Chart](/sounds/) | First release |
| 6 | [How Loud Are Household Appliances? Refrigerator, Dishwasher, Vacuum, Hair Dryer, Blender, and Washing Machine](/home-noise/household-appliances/) | First release |
| 7 | [Concert Hearing Protection: How to Reduce Noise Exposure at Live Events](/guides/concert-hearing-protection/) | First release |
| 8 | [How Loud Is a Concert?](/sounds/concert/) | First release |
| 9 | [How Loud Are Fireworks?](/sounds/fireworks/) | First release |
| 10 | [Technical Sound Analysis: A Guide to Frequency, Spectrum, and Time](/technical/sound-analysis/) | Second release |
| 11 | [dB vs dBA vs dBC vs dBZ: Sound Weightings Explained](/decibels/dba-dbc-dbz/) | First release |
| 12 | [LAeq, LAFmax, and LCpeak: Average, Maximum, and Peak Sound](/decibels/laeq-lafmax-lcpeak/) | First release |
| 13 | [How Distance Affects Sound Level: The 6 dB Rule](/decibels/distance-sound-level/) | First release |
| 14 | [Android Decibel Meter Accuracy: Why Results Vary by Phone](/phone-decibel-meter/android-accuracy/) | First release |
| 15 | [NIOSH Noise Exposure Time Chart: 85 to 115 dBA](/noise-exposure/niosh-time-chart/) | First release |
| 16 | [NIOSH vs OSHA vs WHO Noise Guidelines](/noise-exposure/niosh-vs-osha-vs-who/) | First release |
| 17 | [Workplace Noise and Hearing Protection: A Practical Guide](/workplace-noise/) | First release |
| 18 | [What Is Sound Pressure Level (SPL)?](/decibels/sound-pressure-level/) | Second release |
| 19 | [What Does a 3 dB or 10 dB Increase Mean?](/decibels/3-db-10-db-increase/) | Second release |
| 20 | [How to Add and Average Decibel Levels](/decibels/add-average-decibels/) | Second release |
| 21 | [Sound Power vs Sound Pressure: Why Appliance Labels and Phone Readings Differ](/decibels/sound-power-vs-sound-pressure/) | Second release |
| 22 | [How to Calibrate a Decibel Meter App](/phone-decibel-meter/calibration/) | Second release |
| 23 | [Do External Microphones Improve Smartphone dB Measurements?](/phone-decibel-meter/external-microphone/) | Second release |
| 24 | [Why Two Decibel Meter Apps Show Different Results](/phone-decibel-meter/apps-different-results/) | Second release |
| 25 | [Smartphone App or Professional Sound Level Meter? When Each Is Appropriate](/phone-decibel-meter/phone-vs-professional-meter/) | Second release |
| 26 | [What Is Noise Dose? Daily Exposure Explained](/noise-exposure/noise-dose/) | Second release |
| 27 | [Continuous Noise vs Impulse Noise: Why Peaks Need Separate Measurement](/noise-exposure/continuous-vs-impulse-noise/) | Second release |
| 28 | [Traffic, Train, Subway, and Aircraft Noise Compared](/environmental-noise/transport-noise/) | Second release |
| 29 | [Night Noise and Sleep: How to Measure Your Bedroom Sound Environment](/sleep-noise/night-noise-bedroom/) | Second release |
| 30 | [FFT, Spectrograms, and Octave Bands Explained](/technical/fft-spectrogram-octave-bands/) | Second release |
| 31 | [How Loud Is a Chainsaw?](/sounds/chainsaw/) | Second release |
| 32 | [How Loud Is a Subway?](/sounds/subway/) | Second release |
| 33 | [How Loud Should a White Noise Machine Be?](/sounds/white-noise-machine/) | Second release |
| 34 | [Snoring and White Noise Machines: Sound Levels, Distance, and Overnight Exposure](/sleep-noise/snoring-white-noise/) | Later content |
| 35 | [ITU-R 468, A-Weighting, and BS.1770: Different Metrics for Different Problems](/technical/itu-r-468-vs-a-weighting-bs1770/) | Later content |
| 36 | [How Loud Is a Leaf Blower?](/sounds/leaf-blower/) | Later content |
| 37 | [How Loud Is an Airplane Cabin?](/sounds/airplane-cabin/) | Later content |
| 38 | [How Loud Is a Baby Crying?](/sounds/baby-crying/) | Later content |
| 39 | [How Loud Is a Dog Bark?](/sounds/dog-bark/) | Later content |
| 40 | [How Loud Is Snoring?](/sounds/snoring/) | Later content |

The order deliberately alternates pillars, practical guides, reference pages, YMYL content, and technical content. This avoids launching a site that looks like forty near-identical “how loud is X” pages.

## 13. First pilot batch: 10 articles

| Pilot order | Article | Content type | Why it belongs in the pilot |
|---:|---|---|---|
| 1 | [What Is a Decibel? How the dB Scale Works](/decibels/what-is-a-decibel/) | Pillar explainer | Foundational pillar that supplies vocabulary and links for the whole site. |
| 2 | [How Accurate Are Decibel Meter Apps?](/phone-decibel-meter/accuracy/) | Evidence review | Core product-trust article and a major search topic for dBcheck. |
| 3 | [How Loud Is Too Loud? Sound Level, Time, and Hearing Risk](/noise-exposure/how-loud-is-too-loud/) | YMYL pillar | Main YMYL pillar and the foundation for all exposure advice. |
| 4 | [How to Measure Sound Correctly with a Smartphone](/phone-decibel-meter/how-to-measure-sound/) | How-to guide | Practical guide that turns research into useful product behavior. |
| 5 | [How Loud Are Common Sounds? A Context-Aware Decibel Chart](/sounds/) | Reference directory | Reference hub that establishes the `/sounds/` architecture and comparison methodology. |
| 6 | [How Loud Are Household Appliances? Refrigerator, Dishwasher, Vacuum, Hair Dryer, Blender, and Washing Machine](/home-noise/household-appliances/) | Comparison hub | Broad home-noise hub with useful everyday search demand and low duplication risk. |
| 7 | [Concert Hearing Protection: How to Reduce Noise Exposure at Live Events](/guides/concert-hearing-protection/) | YMYL practical guide | Practical recreational-safety guide with a clear user need. |
| 8 | [How Loud Is a Concert?](/sounds/concert/) | Individual sound page | First individual sound page, paired intentionally with a separate safety guide. |
| 9 | [How Loud Are Fireworks?](/sounds/fireworks/) | Impulse-noise sound page | Tests the site’s approach to impulsive sound, peak metrics, and strong warnings. |
| 10 | [Technical Sound Analysis: A Guide to Frequency, Spectrum, and Time](/technical/sound-analysis/) | Technical pillar | Ensures the pilot also represents advanced technical analysis rather than only consumer SEO. |

### Pilot quality gates

Before the pilot is published:

- Create one reusable source-note block and one reusable smartphone-estimate disclosure.
- Create one YMYL review checklist covering thresholds, duration, dose, medical wording, and device uncertainty.
- Create the `/sounds/` page template and validate that the concert and fireworks pages do not read like duplicated templates.
- Ensure every CTA points to a real destination and does not promise certified accuracy.
- Add article schema only where it truthfully matches the page. Use FAQ schema sparingly and only for visible, non-duplicative FAQs.
- Add author, reviewer, last-reviewed date, and source list to YMYL and high-trust technical pages.

## 14. Editorial boundaries

The following topics should remain outside the main dBcheck content strategy unless they are strictly necessary to explain a measurement limitation or urgent safety action:

- diagnosis or treatment of hearing loss
- tinnitus treatment or sound therapy claims
- hearing aids and cochlear implants
- ear infections, earwax, or general ear symptoms
- sleep-apnea diagnosis or treatment
- medical interpretation of hearing-test results
- claims that a measured level caused a specific person’s injury

dBcheck can mention hearing symptoms after loud noise only to direct readers toward appropriate professional assessment. It should not become the destination for managing those conditions.

## 15. Final recommendation

Launch with a balanced pilot, then expand the pillars before publishing a large number of sound pages. The strongest differentiator is not having the longest decibel chart. It is explaining why a number changes, what metric it represents, how a phone may misread it, and how level and duration should be interpreted without overstating safety.

The first 40 articles provide enough breadth to establish dBcheck as a focused authority while preserving room for later `/sounds/` expansion based on Search Console data. New pages should be added only when they answer a distinct query and can provide unique evidence, measurement context, or practical guidance.
