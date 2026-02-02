// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import PagerView from 'react-native-pager-view';
// import LogWorkout from '../Screens/LogWorkout';
// import TrackProgress from '../Screens/TrackProgress';
// import Colors from '../Constants/Colors';

// const { width } = Dimensions.get('window');

// const MainContainer = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const pagerRef = React.useRef(null);

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.background }}>

//       <PagerView
//         style={{ flex: 1 }}
//         initialPage={0}
//         onPageSelected={e => setActiveTab(e.nativeEvent.position)}
//         ref={pagerRef}
//       >
//         <View key="1">
//           <LogWorkout />
//         </View>
//         <View key="2">
//           <TrackProgress />
//         </View>
//       </PagerView>

//       <View style={styles.tabBar}>
//         <TouchableOpacity
//           style={styles.tabItem}
//           onPress={() => {
//             pagerRef.current.setPage(0);
//             setActiveTab(0);
//           }}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === 0 && { color: Colors.primary },
//             ]}
//           >
//             WORKOUT
//           </Text>
//           {activeTab === 0 && <View style={styles.activeDot} />}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tabItem}
//           onPress={() => {
//             pagerRef.current.setPage(1);
//             setActiveTab(1);
//           }}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === 1 && { color: Colors.primary },
//             ]}
//           >
//             PROGRESS
//           </Text>
//           {activeTab === 1 && <View style={styles.activeDot} />}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: 'row',
//     height: 80,
//     backgroundColor: Colors.surface,
//     borderTopWidth: 1,
//     borderColor: Colors.border,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
//   tabItem: { alignItems: 'center' },
//   tabText: {
//     color: Colors.textSecondary,
//     fontWeight: 'bold',
//     fontSize: 12,
//     letterSpacing: 1,
//   },
//   activeDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: Colors.primary,
//     marginTop: 4,
//   },
// });

// export default MainContainer;
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { Dumbbell, LineChart } from 'lucide-react-native';
import LogWorkout from '../Screens/LogWorkout';
import TrackProgress from '../Screens/TrackProgress';
import Colors from '../Constants/Colors';

const { width } = Dimensions.get('window');

const MainContainer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = React.useRef(null);

  const onTabPress = index => {
    pagerRef.current.setPage(index);
    setActiveTab(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        
        scrollEnabled={false}
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

      
      <View style={styles.fullWidthTabBar}>
      
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabPress(0)}
          activeOpacity={0.6}
        >
          <View
            style={[styles.iconWrapper, activeTab === 0 && styles.activePill]}
          >
            <Dumbbell
              size={24}
              color={activeTab === 0 ? Colors.primary : Colors.textSecondary}
              strokeWidth={activeTab === 0 ? 2.5 : 2}
            />
          </View>
          <Text
            style={[
              styles.tabText,
              activeTab === 0 ? styles.activeText : styles.inactiveText,
            ]}
          >
            Workout
          </Text>
        </TouchableOpacity>

      
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onTabPress(1)}
          activeOpacity={0.6}
        >
          <View
            style={[styles.iconWrapper, activeTab === 1 && styles.activePill]}
          >
            <LineChart
              size={24}
              color={activeTab === 1 ? Colors.primary : Colors.textSecondary}
              strokeWidth={activeTab === 1 ? 2.5 : 2}
            />
          </View>
          <Text
            style={[
              styles.tabText,
              activeTab === 1 ? styles.activeText : styles.inactiveText,
            ]}
          >
            Progress
          </Text>
        </TouchableOpacity>
      </View>
     
      <SafeAreaView style={{ backgroundColor: Colors.surface }} />
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidthTabBar: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    backgroundColor: Colors.primary + '15',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  activeText: {
    color: Colors.primary,
  },
  inactiveText: {
    color: Colors.textSecondary,
  },
});

export default MainContainer;
