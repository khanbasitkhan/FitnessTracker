// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
// // import Colors from '../Constants/Colors';
// // import GlobalStyles from '../Constants/Styles';
// // import db from '../Services/Database';
// // import WorkoutCard from '../Components/WorkoutCard';

// // const TrackProgress = () => {
// //   const [stats, setStats] = useState({ totalCalories: 0, totalWorkouts: 0 });
// //   const [recentLogs, setRecentLogs] = useState([]);

// //   useEffect(() => {
// //     fetchProgressData();
// //   }, []);

// //   const fetchProgressData = () => {
// //     db.transaction(tx => {
// //       // Fetch totals
// //       tx.executeSql(
// //         'SELECT SUM(calories) as totalCals, COUNT(id) as totalCount FROM workouts',
// //         [],
// //         (tx, results) => {
// //           const res = results.rows.item(0);
// //           setStats({
// //             totalCalories: res.totalCals || 0,
// //             totalWorkouts: res.totalCount || 0,
// //           });
// //         },
// //       );

// //       tx.executeSql(
// //         'SELECT * FROM workouts ORDER BY id DESC LIMIT 5',
// //         [],
// //         (tx, results) => {
// //           let temp = [];
// //           for (let i = 0; i < results.rows.length; i++) {
// //             temp.push(results.rows.item(i));
// //           }
// //           setRecentLogs(temp);
// //         },
// //       );
// //     });
// //   };

// //   return (
// //     <ScrollView
// //       style={GlobalStyles.container}
// //       showsVerticalScrollIndicator={false}
// //     >
// //       <Text style={GlobalStyles.heading}>Track Progress</Text>
// //       <Text style={[GlobalStyles.subHeading, { marginBottom: 25 }]}>
// //         Your fitness journey at a glance
// //       </Text>

// //       <View style={styles.statsRow}>
// //         <View style={styles.statCard}>
// //           <Text style={styles.statValue}>{stats.totalCalories.toFixed(0)}</Text>
// //           <Text style={styles.statLabel}>Total Kcal</Text>
// //         </View>
// //         <View style={[styles.statCard, { borderColor: Colors.secondary }]}>
// //           <Text style={[styles.statValue, { color: Colors.secondary }]}>
// //             {stats.totalWorkouts}
// //           </Text>
// //           <Text style={styles.statLabel}>Sessions</Text>
// //         </View>
// //       </View>

// //       <View style={styles.graphPlaceholder}>
// //         <View style={styles.progressHeader}>
// //           <Text style={{ color: '#fff', fontWeight: 'bold' }}>
// //             Weekly Activity
// //           </Text>
// //           <Text style={{ color: Colors.primary }}>+12% vs last week</Text>
// //         </View>

// //         <View style={styles.barContainer}>
// //           {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
// //             <View
// //               key={i}
// //               style={[
// //                 styles.bar,
// //                 {
// //                   height: h,
// //                   backgroundColor: i === 3 ? Colors.primary : Colors.surface,
// //                 },
// //               ]}
// //             />
// //           ))}
// //         </View>
// //       </View>

// //       <Text
// //         style={[
// //           GlobalStyles.subHeading,
// //           { marginTop: 30, marginBottom: 15, color: '#fff' },
// //         ]}
// //       >
// //         Recent History
// //       </Text>

// //       {recentLogs.map(item => (
// //         <WorkoutCard
// //           key={item.id}
// //           title={item.type}
// //           subtitle={item.date}
// //           value={item.calories.toFixed(0)}
// //           unit="kcal"
// //           iconBackground={
// //             item.type === 'Running'
// //               ? Colors.primary + '20'
// //               : Colors.secondary + '20'
// //           }
// //         />
// //       ))}
// //       <View style={{ height: 100 }} />
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   statsRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 25,
// //   },
// //   statCard: {
// //     backgroundColor: Colors.surface,
// //     width: '48%',
// //     padding: 20,
// //     borderRadius: 24,
// //     borderWidth: 1,
// //     borderColor: Colors.primary,
// //     alignItems: 'center',
// //   },
// //   statValue: { color: Colors.primary, fontSize: 24, fontWeight: '900' },
// //   statLabel: {
// //     color: Colors.textSecondary,
// //     fontSize: 12,
// //     marginTop: 5,
// //     textTransform: 'uppercase',
// //   },
// //   graphPlaceholder: {
// //     backgroundColor: Colors.surface,
// //     borderRadius: 24,
// //     padding: 20,
// //     height: 200,
// //   },
// //   progressHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 20,
// //   },
// //   barContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-end',
// //     height: 100,
// //   },
// //   bar: { width: 30, borderRadius: 8 },
// // });

// // export default TrackProgress;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
// import Colors from '../Constants/Colors';
// import GlobalStyles from '../Constants/Styles';
// import db from '../Services/Database';
// import WorkoutCard from '../Components/WorkoutCard';

// const TrackProgress = () => {
//   const [stats, setStats] = useState({ totalCalories: 0, totalWorkouts: 0 });
//   const [recentLogs, setRecentLogs] = useState([]);

//   // Data fetch karne ka function
//   const fetchProgressData = () => {
//     db.transaction(tx => {
//       // Total Calories aur Count fetch karna
//       tx.executeSql(
//         'SELECT SUM(calories) as totalCals, COUNT(id) as totalCount FROM workouts',
//         [],
//         (_, results) => {
//           const res = results.rows.item(0);
//           setStats({
//             totalCalories: res.totalCals || 0,
//             totalWorkouts: res.totalCount || 0,
//           });
//         },
//         err => console.log('Stats Fetch Error: ', err),
//       );

//       // Last 5 Workouts fetch karna
//       tx.executeSql(
//         'SELECT * FROM workouts ORDER BY id DESC LIMIT 5',
//         [],
//         (_, results) => {
//           let temp = [];
//           for (let i = 0; i < results.rows.length; i++) {
//             temp.push(results.rows.item(i));
//           }
//           setRecentLogs(temp);
//         },
//         err => console.log('Logs Fetch Error: ', err),
//       );
//     });
//   };

//   // Initial load par data fetch karein
//   useEffect(() => {
//     fetchProgressData();

//     // Aik trick: Har 2 second baad auto-refresh (Agar navigation focus kaam na kare)
//     const interval = setInterval(fetchProgressData, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <ScrollView
//       style={GlobalStyles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       <Text style={GlobalStyles.heading}>Track Progress</Text>
//       <Text style={[GlobalStyles.subHeading, { marginBottom: 25 }]}>
//         Your fitness journey at a glance
//       </Text>

//       <View style={styles.statsRow}>
//         <View style={styles.statCard}>
//           <Text style={styles.statValue}>
//             {Number(stats.totalCalories).toFixed(0)}
//           </Text>
//           <Text style={styles.statLabel}>Total Kcal</Text>
//         </View>
//         <View style={[styles.statCard, { borderColor: Colors.secondary }]}>
//           <Text style={[styles.statValue, { color: Colors.secondary }]}>
//             {stats.totalWorkouts}
//           </Text>
//           <Text style={styles.statLabel}>Sessions</Text>
//         </View>
//       </View>

//       <View style={styles.graphPlaceholder}>
//         <View style={styles.progressHeader}>
//           <Text style={{ color: '#fff', fontWeight: 'bold' }}>
//             Weekly Activity
//           </Text>
//           <Text style={{ color: Colors.primary }}>Live Updates</Text>
//         </View>
//         <View style={styles.barContainer}>
//           {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
//             <View
//               key={i}
//               style={[
//                 styles.bar,
//                 {
//                   height: h,
//                   backgroundColor: i === 6 ? Colors.primary : Colors.surface,
//                 },
//               ]}
//             />
//           ))}
//         </View>
//       </View>

//       <Text
//         style={[
//           GlobalStyles.subHeading,
//           { marginTop: 30, marginBottom: 15, color: '#fff' },
//         ]}
//       >
//         Recent History
//       </Text>

//       {recentLogs.length === 0 ? (
//         <Text
//           style={{
//             color: Colors.textSecondary,
//             textAlign: 'center',
//             marginTop: 20,
//           }}
//         >
//           No workouts logged yet.
//         </Text>
//       ) : (
//         recentLogs.map(item => (
//           <WorkoutCard
//             key={item.id.toString()}
//             title={item.type}
//             subtitle={item.date}
//             value={Number(item.calories).toFixed(0)}
//             unit="kcal"
//             iconBackground={
//               item.type === 'Running'
//                 ? Colors.primary + '20'
//                 : Colors.secondary + '20'
//             }
//           />
//         ))
//       )}
//       <View style={{ height: 100 }} />
//     </ScrollView>
//   );
// };

// // Styles remain the same as you provided
// const styles = StyleSheet.create({
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 25,
//   },
//   statCard: {
//     backgroundColor: Colors.surface,
//     width: '48%',
//     padding: 20,
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     alignItems: 'center',
//   },
//   statValue: { color: Colors.primary, fontSize: 24, fontWeight: '900' },
//   statLabel: {
//     color: Colors.textSecondary,
//     fontSize: 12,
//     marginTop: 5,
//     textTransform: 'uppercase',
//   },
//   graphPlaceholder: {
//     backgroundColor: Colors.surface,
//     borderRadius: 24,
//     padding: 20,
//     height: 200,
//   },
//   progressHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   barContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     height: 100,
//   },
//   bar: { width: 30, borderRadius: 8 },
// });

// export default TrackProgress;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts'; 
import Colors from '../Constants/Colors';
import GlobalStyles from '../Constants/Styles';
import db from '../Services/Database';
import WorkoutCard from '../Components/WorkoutCard';

const TrackProgress = () => {
  const [stats, setStats] = useState({ totalCalories: 0, totalWorkouts: 0 });
  const [recentLogs, setRecentLogs] = useState([]);
  const [graphData, setGraphData] = useState([
    { value: 0, label: 'M' },
    { value: 0, label: 'T' },
    { value: 0, label: 'W' },
    { value: 0, label: 'T' },
    { value: 0, label: 'F' },
    { value: 0, label: 'S' },
    { value: 0, label: 'S' },
  ]);

  const fetchProgressData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT SUM(calories) as totalCals, COUNT(id) as totalCount FROM workouts',
        [],
        (_, results) => {
          const res = results.rows.item(0);
          setStats({
            totalCalories: res.totalCals || 0,
            totalWorkouts: res.totalCount || 0,
          });
        },
      );

      tx.executeSql(
        'SELECT * FROM workouts ORDER BY id DESC LIMIT 5',
        [],
        (_, results) => {
          let temp = [];
          let chartTemp = [];
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            temp.push(row);
            
            chartTemp.push({
              value: row.calories,
              label: row.type.substring(0, 1), 
              frontColor: Colors.primary,
            });
          }
          setRecentLogs(temp);
          if (chartTemp.length > 0) setGraphData(chartTemp.reverse());
        },
      );
    });
  };

  useEffect(() => {
    fetchProgressData();
    const interval = setInterval(fetchProgressData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={GlobalStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={GlobalStyles.heading}>Track Progress</Text>
      <Text style={[GlobalStyles.subHeading, { marginBottom: 25 }]}>
        Your fitness journey at a glance
      </Text>

      
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {Number(stats.totalCalories).toFixed(0)}
          </Text>
          <Text style={styles.statLabel}>Total Kcal</Text>
        </View>
        <View style={[styles.statCard, { borderColor: Colors.secondary }]}>
          <Text style={[styles.statValue, { color: Colors.secondary }]}>
            {stats.totalWorkouts}
          </Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
      </View>

      {/* Real Bar Chart Section */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>Weekly Activity</Text>
        <BarChart
          data={graphData}
          barWidth={22}
          noOfSections={3}
          barBorderRadius={6}
          frontColor={Colors.primary}
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          yAxisTextStyle={{ color: Colors.textSecondary, fontSize: 10 }}
          xAxisLabelTextStyle={{ color: Colors.textSecondary, fontSize: 10 }}
          isAnimated
          animationDuration={500}
        />
      </View>

      <Text
        style={[
          GlobalStyles.subHeading,
          { marginTop: 30, marginBottom: 15, color: '#fff' },
        ]}
      >
        Recent History
      </Text>

      {recentLogs.length === 0 ? (
        <Text style={styles.noDataText}>No workouts logged yet.</Text>
      ) : (
        recentLogs.map(item => (
          <WorkoutCard
            key={item.id.toString()}
            title={item.type}
            subtitle={item.date}
            value={Number(item.calories).toFixed(0)}
            unit="kcal"
            iconBackground={
              item.type === 'Running'
                ? Colors.primary + '20'
                : Colors.secondary + '20'
            }
          />
        ))
      )}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: Colors.surface,
    width: '48%',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  statValue: { color: Colors.primary, fontSize: 24, fontWeight: '900' },
  statLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  graphContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphTitle: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  noDataText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TrackProgress;
