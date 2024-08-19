# rnvc-playground
Simple React-Native app with minimal config for testing RNVC scenarios

## Scenario
The scenario being tested in this round is: A minimal RNVC/Expo setup, where Android photo capture is very slow, with noticeably delays from shutter click to shutter sound, and then further delay before picture fires, which introduces blur frequently.
There is also minor patch that is adding some debug logging into the image capture kt files to narrow where the slowness is occurring.

## Initial setup for this repo
Steps:

- install expo example app with: `npx create-expo-app rnvc-playground --template blank`
- navigate to project: `cd rnvc-playground`
- install rnvc (4.5.1): `npx expo install react-native-vision-camera`
- modify code:
  All modified code is in App.js, along with a minimal patch that adds more logging to the native code.
  Effectively, it is a group of SCENARIOS that are a set of configuration options for format, camera and takePhoto.
  Clicking shutter will take 5 photos on the current scenario back-to-back to get a spread of timings, as well as to rule out any sort of startup penalty.
  You can click on the label for current scenario to cycle without taking photo.
  Taking photo will automatically cycle to the next scenario.


## Running
- prebuild: `npx expo prebuild`
- run on device: `npx expo run:android --device`

Capture logs with `adb logcat > output.txt` for android logs from device.
