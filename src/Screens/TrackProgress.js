import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Colors from '../Constants/Colors';
import GlobalStyles from '../Constants/Styles';
import db from '../Services/Database';
import WorkoutCard from '../Components/WorkoutCard';

const TrackProgress = () => {
  const [stats, setStats] = useState({ totalCalories: 0, totalWorkouts: 0 });
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = () => {
    db.transaction(tx => {
      // Fetch totals
      tx.executeSql(
        'SELECT SUM(calories) as totalCals, COUNT(id) as totalCount FROM workouts',
        [],
        (tx, results) => {
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
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          setRecentLogs(temp);
        },
      );
    });
  };

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
          <Text style={styles.statValue}>{stats.totalCalories.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Total Kcal</Text>
        </View>
        <View style={[styles.statCard, { borderColor: Colors.secondary }]}>
          <Text style={[styles.statValue, { color: Colors.secondary }]}>
            {stats.totalWorkouts}
          </Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
      </View>

      
      <View style={styles.graphPlaceholder}>
        <View style={styles.progressHeader}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Weekly Activity
          </Text>
          <Text style={{ color: Colors.primary }}>+12% vs last week</Text>
        </View>
        
        <View style={styles.barContainer}>
          {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: h,
                  backgroundColor: i === 3 ? Colors.primary : Colors.surface,
                },
              ]}
            />
          ))}
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
          key={item.id}
          title={item.type}
          subtitle={item.date}
          value={item.calories.toFixed(0)}
          unit="kcal"
          iconBackground={
            item.type === 'Running'
              ? Colors.primary + '20'
              : Colors.secondary + '20'
          }
        />
      ))}
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
  graphPlaceholder: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    height: 200,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  bar: { width: 30, borderRadius: 8 },
});

export default TrackProgress;
