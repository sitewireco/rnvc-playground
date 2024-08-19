import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';

export default function App() {
  const { hasPermission: hasCamPerm, requestPermission: requestCamPerm } = useCameraPermission()
  const { hasPermission: hasMicPerm, requestPermission: requestMicPerm } = useMicrophonePermission()
  const cameraRef = useRef(null)
  const device = useCameraDevice('back', {
    physicalDevices: ['ultra-wide-angle-camera']
  })
  const [capturing, setCapturing] = useState(false)

  const format = useCameraFormat(device, [
    { photoResolution: { width: 4032, height: 3024 } },
    { fps: 30 }
  ])

  useEffect(() => {
    if (!hasCamPerm) {
      requestCamPerm()
    }
    if (!hasMicPerm) {
      requestMicPerm()
    }
  }, [])

  const capturePhoto = async () => {
    setCapturing(true)
    console.log('starting capture')

    try {
      const start = Date.now()
      await cameraRef.current?.takePhoto({
        // flash: currentScenario.capture.flash,
        // enableShutterSound: currentScenario.capture.enableShutterSound
        flash: 'off',
        enableShutterSound: true
      })
      const duration = Date.now() - start
      console.log(`Capture completed
      
      \tDuration Samples: ${duration}ms
      \tDevice name: ${device?.name}
      \tFormat: ${JSON.stringify(format, null, 2).split('\n').join('\n\t')}
      `)
    } catch (error) {
      console.error(error)
    }

    setCapturing(false)
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={true}
        fps={[10, 30]}
        enableLocation={false}
        format={format}
        outputOrientation='device'
        photoQualityBalance='balanced'
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
            backgroundColor: capturing ? '#999999' : '#ff9999',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress = {() => {
            if (capturing) {
              return
            }
            capturePhoto()
          }}
        />
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
