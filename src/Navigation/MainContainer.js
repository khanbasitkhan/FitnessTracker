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
  Animated,
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

  const onTabPress = (index) => {
    pagerRef.current.setPage(index);
    setActiveTab(index);
  };

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

      
      <View style={styles.tabContainer}>
        <View style={styles.floatingTabBar}>
          
          
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => onTabPress(0)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, activeTab === 0 && styles.activeIconBg]}>
              <Dumbbell 
                size={24} 
                color={activeTab === 0 ? Colors.background : Colors.textSecondary} 
                strokeWidth={activeTab === 0 ? 2.5 : 2}
              />
            </View>
            <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>
              Workout
            </Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => onTabPress(1)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, activeTab === 1 && styles.activeIconBg]}>
              <LineChart 
                size={24} 
                color={activeTab === 1 ? Colors.background : Colors.textSecondary} 
                strokeWidth={activeTab === 1 ? 2.5 : 2}
              />
            </View>
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>
              Progress
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 30, 
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  floatingTabBar: {
    flexDirection: 'row',
    width: width * 0.85,
    height: 75,
    backgroundColor: Colors.surface, 
    borderRadius: 35,
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tabItem: { 
    alignItems: 'center', 
    justifyContent: 'center',
    flex: 1 
  },
  iconContainer: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 4,
  },
  activeIconBg: {
    backgroundColor: Colors.primary, 
    transform: [{ scale: 1.1 }],
  },
  tabText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: Colors.primary,
    fontSize: 11,
  },
});

export default MainContainer;