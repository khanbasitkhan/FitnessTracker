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
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'; // Dimensions add kiya
import { BarChart } from 'react-native-gifted-charts';
import Colors from '../Constants/Colors';
import GlobalStyles from '../Constants/Styles';
import db from '../Services/Database';
import WorkoutCard from '../Components/WorkoutCard';

// Screen width nikalne ke liye
const screenWidth = Dimensions.get('window').width;

const TrackProgress = () => {
  const [stats, setStats] = useState({ totalCalories: 0, totalWorkouts: 0 });
  const [recentLogs, setRecentLogs] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [maxY, setMaxY] = useState(2000);

  const fetchProgressData = () => {
    db.transaction(tx => {
      // 1. Overall Stats
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

      // 2. Graph Data
      tx.executeSql(
        'SELECT date, SUM(calories) as dailyCalories FROM workouts GROUP BY date ORDER BY date DESC',
        [],
        (_, results) => {
          let chartTemp = [];
          let currentMax = 500;

          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            const val = Number(row.dailyCalories);
            if (val > currentMax) currentMax = val;

            const formattedDate = row.date.split('-').slice(1).join('/');

            chartTemp.push({
              value: val,
              label: formattedDate,
              frontColor: Colors.primary + '40',
              key: `chart-item-${i}-${row.date}`,
              topLabelComponent: () => (
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 8,
                    marginBottom: 4,
                  }}
                >
                  {val}
                </Text>
              ),
            });
          }

          setMaxY(Math.ceil(currentMax / 500) * 500);
          setGraphData(chartTemp.reverse());
        },
      );

      // 3. Recent History
      tx.executeSql(
        'SELECT * FROM workouts ORDER BY id DESC LIMIT 5',
        [],
        (_, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          setRecentLogs(temp);
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

      {/* Stats Section */}
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

      {/* Scrollable Hybrid Graph */}
      <View style={styles.graphContainer}>
        <View style={styles.graphHeader}>
          <Text style={styles.graphTitle}>Performance Trends</Text>
          <View style={styles.unitBadge}>
            <Text style={styles.unitText}>kcal</Text>
          </View>
        </View>

        <View style={styles.chartWrapper}>
          {graphData.length > 0 ? (
            <BarChart
              data={graphData}
              height={220}
              barWidth={25}
              spacing={30}
              initialSpacing={20}
              // FIX: Graph width ko container ke mutabik set kiya
              width={screenWidth - 100}
              isAnimated
              scrollAnimation={true}
              maxValue={maxY}
              noOfSections={4}
              barBorderTopLeftRadius={8}
              barBorderTopRightRadius={8}
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor={'rgba(255,255,255,0.1)'}
              yAxisTextStyle={styles.axisText}
              xAxisLabelTextStyle={styles.axisText}
              showLine
              lineConfig={{
                color: Colors.primary,
                thickness: 3,
                curved: true,
                hideDataPoints: false,
                dataPointsColor: '#fff',
                dataPointsRadius: 4,
              }}
              animationDuration={600}
              hideRules={false}
              rulesColor="rgba(255,255,255,0.05)"
              rulesType="solid"
            />
          ) : (
            <View style={styles.noDataWrapper}>
              <Text style={styles.noDataText}>No activity recorded yet.</Text>
            </View>
          )}
        </View>
      </View>

      <Text
        style={[
          GlobalStyles.subHeading,
          { marginTop: 30, marginBottom: 15, color: '#fff' },
        ]}
      >
        Recent History
      </Text>

      {recentLogs.map(item => (
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
      ))}
      <View style={{ height: 120 }} />
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
    fontSize: 10,
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  graphContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    paddingVertical: 25,
    paddingHorizontal: 15, // Side padding di taake graph touch na ho
    overflow: 'hidden', // Isse lines bahir nahi jayengi
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  graphTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  unitBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  unitText: { color: Colors.primary, fontSize: 10, fontWeight: 'bold' },
  axisText: { color: 'rgba(255,255,255,0.4)', fontSize: 10 },
  noDataWrapper: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: { color: Colors.textSecondary, fontSize: 14 },
});

export default TrackProgress;
