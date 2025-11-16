// import { useEvent } from 'expo';
import { Post } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

type VideoItemProps = {
  postItem: Post;
  isActive: boolean;
};

export default function PostListItem({
  postItem: {
    nrOfComments,
    nrOfLikes,
    nrOfShares,
    description,
    user,
    video_url,
  },
  isActive,
}: VideoItemProps) {
  const { height } = Dimensions.get('window');
  const player = useVideoPlayer(
    { uri: video_url },
    (player) => {
      player.loop = true;
    },
  );

  // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  // TODO почитати про висоту екрану для іос\андроід Dimension

  useFocusEffect(
    useCallback(() => {
      if (!player) {
        return;
      }

      try {
        if (isActive) {
          player.play();
        }
      } catch (error) {
        console.log(error);
      }
      return () => {
        try {
          if (player && isActive) {
            player.pause();
          }
        } catch (error) {
          console.log(error);
        }
      };
    }, [isActive, player]),
  );

  return (
    <View
      style={[
        styles.contentContainer,
        { height: height },
        // { height: height - 50 },
      ]}
    >
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.interactionBar}>
        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log('Like')}
        >
          <Ionicons name="heart" size={33} color="#fff" />
          <Text style={styles.interactionText}>
            {nrOfLikes[0]?.count || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log('Chat')}
        >
          <Ionicons
            name="chatbubble"
            size={30}
            color="#fff"
          />
          <Text style={styles.interactionText}>
            {nrOfComments[0]?.count || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log('Share')}
        >
          <Ionicons
            name="arrow-redo"
            size={33}
            color="#fff"
          />
          <Text style={styles.interactionText}>
            {nrOfShares[0]?.count || 0}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => console.log('Profile')}
        >
          <Text style={styles.avatarText}>
            {user?.username.charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.description}>
          {description}
        </Text>
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
  videoInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 100,
    gap: 5,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: '#fff',
  },
});
