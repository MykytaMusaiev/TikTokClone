import {
  View,
  FlatList,
  Dimensions,
  ViewToken,
  StyleSheet,
} from 'react-native';
import posts from '@assets//data/posts.json';
import PostListItem from '@/components/PostListItem';
import { useRef, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import FeedTab from '@/components/GenericComponents/FeedTab';

const TABS = {
  EXPLORE: 'Explore',
  FOLLOWING: 'Following',
  FOR_YOU: 'For You',
};

export default function HomeScreen() {
  const { height } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(TABS.FOR_YOU);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
  );

  return (
    <View>
      <View style={styles.topBar}>
        <MaterialIcons name="live-tv" size={24} color="white" />
        <View style={styles.navigationBar}>
          <FeedTab
            title={TABS.EXPLORE}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <FeedTab
            title={TABS.FOLLOWING}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <FeedTab
            title={TABS.FOR_YOU}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </View>
        <Ionicons name="search" size={24} color="white" />
      </View>
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
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 70,
    zIndex: 1,
    paddingHorizontal: 15,
  },
  navigationBar: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
});
