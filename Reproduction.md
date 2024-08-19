Steps:

- install expo example app with: `npx create-expo-app rnvc-ios-perm-repro --template blank`
- navigate to project: `cd rnvc-ios-perm-repro`
- install rnvc (4.5.1): `npx expo install react-native-vision-camera`
- modify code:
  All modified code is in App.js.
  Effectively, it is a group of SCENARIOS that are a set of configuration options for format, camera and takePhoto.
  Clicking shutter will take 5 photos on the current scenario back-to-back to get a spread of timings, as well as to rule out any sort of startup penalty.
  You can click on the label for current scenario to cycle without taking photo.
  Taking photo will automatically cycle to the next scenario.
- prebuild: `npx expo prebuild`
- run on device: `npx expo run:android --device`
