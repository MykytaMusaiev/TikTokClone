// import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, StyleSheet, Dimensions } from 'react-native';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function PostListItem() {
  const { height } = Dimensions.get('window');
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={[styles.contentContainer, { height: height }]}>
      <VideoView style={styles.video} player={player} contentFit="cover" nativeControls={false} />

      {/* <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 50,
  },
  video: {
    flex: 1,
    width: '100%',
  },
  // controlsContainer: {
  //   padding: 10,
  // },
});
