import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices, useCameraFormat, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';

// Settings that might impact things:
const SCENARIOS = [
  {
    name: 'adjust-for-natural',
    capture: {
      flash: 'off',
      enableShutterSound: true
    },
    format: [
      { fps: 30 },
      { photoResolution: { width: 4032, height: 3024 } }
    ],
    camera: {
      outputOrientation: 'device',
      fps: 30,
      video: true,
      audio: true,
      photoQualityBalance: 'balanced'
    }
  },
  // {
  //   name: 'base',
  //   capture: {
  //     flash: 'off'
  //   },
  //   camera: {
  //     photoQualityBalance: 'speed'
  //   }
  // },
  // {
  //   name: 'simple-format',
  //   capture: {
  //     flash: 'off'
  //   },
  //   format: [
  //     { photoResolution: { width: 1280, height: 720 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     photoQualityBalance: 'speed'
  //   }
  // },
  // {
  //   name: 'simple-format-orientation',
  //   capture: {
  //     flash: 'off'
  //   },
  //   format: [
  //     { photoResolution: { width: 1280, height: 720 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     photoQualityBalance: 'speed'
  //   }
  // },
  // {
  //   name: '4k-simple-format',
  //   capture: {
  //     flash: 'off'
  //   },
  //   format: [
  //     { photoResolution: { width: 3048, height: 2160 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     photoQualityBalance: 'speed'
  //   }
  // },
  // {
  //   name: '4k-balanced',
  //   capture: {
  //     flash: 'off'
  //   },
  //   format: [
  //     { photoResolution: { width: 3048, height: 2160 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     photoQualityBalance: 'balanced'
  //   }
  // },
  // {
  //   name: '4k-flash-auto',
  //   capture: {
  //     flash: 'auto'
  //   },
  //   format: [
  //     { photoResolution: { width: 3048, height: 2160 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     photoQualityBalance: 'balanced'
  //   }
  // },
  // {
  //   name: '4k-flash-on',
  //   capture: {
  //     flash: 'on'
  //   },
  //   format: [
  //     { photoResolution: { width: 3048, height: 2160 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     photoQualityBalance: 'balanced'
  //   }
  // },
  // {
  //   name: '4k-quality',
  //   capture: {
  //     flash: 'auto'
  //   },
  //   format: [
  //     { photoResolution: { width: 3048, height: 2160 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     photoQualityBalance: 'quality'
  //   }
  // },
  // {
  //   name: '4k-torch',
  //   capture: {
  //     flash: 'auto'
  //   },
  //   format: [
  //     { photoResolution: { width: 3048, height: 2160 } },
  //     { photoAspectRatio: 16 / 9 },
  //     { fps: 30 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     photoQualityBalance: 'balanced',
  //     torch: 'on'
  //   }
  // },
  // {
  //   name: 'full',
  //   capture: {
  //     flash: 'auto',
  //     enableShutterSound: true
  //   },
  //   format: [
  //     { fps: 30 },
  //     { photoResolution: { width: 1280, height: 720 } },
  //     { photoResolution: { width: 1920, height: 1080 } },
  //     { photoResolution: { width: 3048, height: 2160 } },
  //     { photoAspectRatio: 16 / 9 }
  //   ],
  //   camera: {
  //     outputOrientation: 'device',
  //     fps: [15, 30],
  //     video: true,
  //     audio: true,
  //     torch: 'on', // this is just to test if this gets faster somehow, and it did a bit, but still very slow
  //     photoQualityBalance: 'quality'
  //   }
  // }
]

export default function App() {
  const { hasPermission: hasCamPerm, requestPermission: requestCamPerm } = useCameraPermission()
  const { hasPermission: hasMicPerm, requestPermission: requestMicPerm } = useMicrophonePermission()
  const cameraRef = useRef(null)
  // const device = useCameraDevice('back', {
  //   physicalDevices: ['ultra-wide-angle-camera']
  // })
  const devices = useCameraDevices()
  const device = devices.find((device) => device.position === 'back' && device.physicalDevices.includes('ultra-wide-angle-camera'))
  // const [capturing, setCapturing] = useState(false)
  // const [captureSample, setCaptureSample] = useState(0)
  // const [scenarioIndex, setScenarioIndex] = useState(0)

  // const currentScenario = SCENARIOS[scenarioIndex]

  // const format = useCameraFormat(device, currentScenario.format || [])
  const format = useCameraFormat(device, [
    { photoResolution: { width: 4032, height: 3024 } },
    { fps: 30 }
  ])

  // const nextScenario = () => {
  //   setScenarioIndex((current) => {
  //     if (current + 1 >= SCENARIOS.length) {
  //       return 0
  //     }
  //     return current + 1
  //   })
  // }

  useEffect(() => {
    if (!hasCamPerm) {
      requestCamPerm()
    }
    if (!hasMicPerm) {
      requestMicPerm()
    }
  }, [])

  const capturePhoto = async () => {
    // setCapturing(true)
    console.log('starting capture')

    try {
      const samples = []
      for (let x=0; x<5; x++) {
        // setCaptureSample(x + 1)
        const start = Date.now()
        await cameraRef.current?.takePhoto({
          // flash: currentScenario.capture.flash,
          // enableShutterSound: currentScenario.capture.enableShutterSound
          flash: 'off',
          enableShutterSound: true
        })
        const duration = Date.now() - start
        samples.push(duration)
      }
      console.log(`Capture completed (5 samples)
      
      \tDuration Samples: ${samples.join('ms, ')}ms
      \tDevice name: ${device?.name}
      \tFormat: ${JSON.stringify(format, null, 2).split('\n').join('\n\t')}
      `)
      // nextScenario()
    } catch (error) {
      console.error(error)
    }

    // setCapturing(false)
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        enableLocation={false}

        // format={currentScenario.format && format}
        format={format}
        // outputOrientation={currentScenario.camera.outputOrientation}
        outputOrientation='device'
        // fps={currentScenario.camera.fps}
        // fps={30}
        // torch={currentScenario.camera.torch}
        // video={currentScenario.camera.video}
        // video={true}
        // audio={currentScenario.camera.audio}
        // audio={true}
        // photoQualityBalance={currentScenario.camera.photoQualityBalance}
        photoQualityBalance='speed'
        // exposure={currentScenario.camera.exposure}
        // focusable={false}
      />

      <View style={{
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            borderWidth: 5,
            // backgroundColor: capturing ? '#999999' : '#ff9999',
            backgroundColor: '#ff9999',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress = {() => {
            // if (capturing) {
            //   return
            // }
            capturePhoto()
          }}
        >
          {/* <Text style={{
            textShadowRadius: 1,
            textShadowOffset: {
              width: 1,
              height: 1
            },
            textShadowColor: '#000',
            color: '#fff'
          }}>{capturing ? captureSample.toString() : ''}</Text> */}
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#aaa',
            padding: 1,
            marginTop: 10
          }}
          onPress={() => {nextScenario()}}
        >
          <Text>
            Current Scenario: {currentScenario.name} [{scenarioIndex}]
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
