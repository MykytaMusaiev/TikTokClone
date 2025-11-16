// import { useEvent } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function PostListItem() {
  const { height } = Dimensions.get('window');
  const player = useVideoPlayer({ uri: videoSource }, (player) => {
    player.loop = true;
    player.play();
    console.log('expo-video player:', player);
  });

  // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={[styles.contentContainer, { height: height - 80 }]}>
      <VideoView style={styles.video} player={player} contentFit="cover" nativeControls={false} />

      <View style={styles.interactionBar}>
        <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Like')}>
          <Ionicons name="heart" size={33} color="#fff" />
          <Text style={styles.interactionText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Chat')}>
          <Ionicons name="chatbubble" size={30} color="#fff" />
          <Text style={styles.interactionText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Share')}>
          <Ionicons name="arrow-redo" size={33} color="#fff" />
          <Text style={styles.interactionText}>20</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatar} onPress={() => console.log('Profile')}>
          <Text style={styles.avatarText}>L</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    width: '100%',
  },
  interactionBar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  interactionButton: {
    alignItems: 'center',
    gap: 5,
  },
  interactionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
