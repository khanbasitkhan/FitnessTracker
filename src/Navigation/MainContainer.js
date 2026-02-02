import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import LogWorkout from '../Screens/LogWorkout';
import TrackProgress from '../Screens/TrackProgress';
import Colors from '../Constants/Colors';

const { width } = Dimensions.get('window');

const MainContainer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = React.useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={e => setActiveTab(e.nativeEvent.position)}
        ref={pagerRef}
      >
        <View key="1">
          <LogWorkout />
        </View>
        <View key="2">
          <TrackProgress />
        </View>
      </PagerView>

      
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            pagerRef.current.setPage(0);
            setActiveTab(0);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 0 && { color: Colors.primary },
            ]}
          >
            WORKOUT
          </Text>
          {activeTab === 0 && <View style={styles.activeDot} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            pagerRef.current.setPage(1);
            setActiveTab(1);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 1 && { color: Colors.primary },
            ]}
          >
            PROGRESS
          </Text>
          {activeTab === 1 && <View style={styles.activeDot} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  tabItem: { alignItems: 'center' },
  tabText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
});

export default MainContainer;
