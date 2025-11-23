import {
  CameraView,
  CameraType,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NewPostScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] =
    useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      if (
        permission &&
        !permission.granted &&
        permission.canAskAgain
      ) {
        await requestPermission();
      }

      if (
        micPermission &&
        !micPermission.granted &&
        micPermission.canAskAgain
      ) {
        await requestMicPermission();
      }
    })();
  }, [permission, micPermission]);

  if (!permission || !micPermission) {
    // Camera and mic permissions are still loading.
    return <View />;
  }

  if (
    (permission && !permission.granted && !permission.canAskAgain) ||
    (micPermission &&
      !micPermission.granted &&
      !micPermission.canAskAgain)
  ) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera and microphone.
        </Text>
        <Button
          title="Grant Permission"
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }

  const toggleCameraFacing = () =>
    setFacing((current) => (current === 'back' ? 'front' : 'back'));

  const selectFromGallery = () => {
    console.log('selected');
  };

  const startRecording = async () => {
    setIsRecording(true);
    const recordedVideo = await cameraRef.current?.recordAsync();
    if (recordedVideo?.uri) {
      console.log(recordedVideo.uri);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  return (
    <View style={styles.container}>
      <CameraView
        mode="video"
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />
      <View style={styles.topBar}>
        <Ionicons
          name="close"
          size={40}
          color="white"
          onPress={() => router.back()}
        />
      </View>
      <View style={styles.bottomControls}>
        <Ionicons
          name="images"
          size={40}
          color="white"
          onPress={selectFromGallery}
        />
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordingButton,
          ]}
          onPress={isRecording ? stopRecording : startRecording}
        />
        <Ionicons
          name="camera-reverse"
          size={40}
          color="white"
          onPress={toggleCameraFacing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  recordButton: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  recordingButton: {
    backgroundColor: '#F44336',
  },
  topBar: {
    position: 'absolute',
    top: 55,
    left: 15,
  },
  bottomControls: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});
