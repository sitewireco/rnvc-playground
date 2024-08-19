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


## Running
- prebuild: `npx expo prebuild`
- run on device: `npx expo run:android --device`

Capture logs with `adb logcat > log-output.txt` for android logs from device.

Capture camera watch with `adb shell cmd media.camera watch start -m android.control.captureIntent,android.flash.mode,3a && adb shell cmd media.camera` and then `adb shell cmd media.camera watch dump > watch-output.txt`
