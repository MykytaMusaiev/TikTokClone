import {
  View,
  FlatList,
  Dimensions,
  ViewToken,
} from 'react-native';
import posts from '@assets//data/posts.json';
import PostListItem from '@/components/PostListItem';
import { useRef, useState } from 'react';

export default function HomeScreen() {
  const { height } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
  );

  console.log(currentIndex);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <PostListItem
            postItem={item}
            isActive={index === currentIndex}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        // snapToInterval={height - 50}
        decelerationRate={'fast'}
        disableIntervalMomentum
        onViewableItemsChanged={
          onViewableItemsChanged.current
        }
      />
    </View>
  );
}
