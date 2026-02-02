// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
//   Alert,
// } from 'react-native';
// import Colors from '../Constants/Colors';
// import GlobalStyles from '../Constants/Styles';
// import { workoutList, calculateCalories } from '../Utils/FitnessCalc';
// import db from '../Services/Database';

// const LogWorkout = ({ userWeight, navigation }) => {
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
//   const [duration, setDuration] = useState('');

//   const saveWorkout = () => {
//     if (!selectedWorkout || !duration) {
//       Alert.alert('Error', 'Please select a workout and enter duration.');
//       return;
//     }

//     const burnedCalories = calculateCalories(
//       selectedWorkout.met,
//       userWeight || 70,
//       parseInt(duration),
//     );
//     const today = new Date().toISOString().split('T')[0];

//     db.transaction(tx => {
//       tx.executeSql(
//         'INSERT INTO workouts (type, duration, calories, date) VALUES (?,?,?,?)',
//         [selectedWorkout.name, duration, burnedCalories, today],
//         () => {
//           Alert.alert('Success', `Logged ${burnedCalories.toFixed(0)} kcal!`);
//           navigation.goBack();
//         },
//       );
//     });
//   };

//   return (
//     <View style={GlobalStyles.container}>
//       <Text style={GlobalStyles.heading}>Log Workout</Text>
//       <Text style={[GlobalStyles.subHeading, { marginBottom: 20 }]}>
//         What did you do today?
//       </Text>

//       <FlatList
//         data={workoutList}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.chip,
//               selectedWorkout?.id === item.id && {
//                 borderColor: Colors.primary,
//                 backgroundColor: Colors.primary + '20',
//               },
//             ]}
//             onPress={() => setSelectedWorkout(item)}
//           >
//             <Text
//               style={{
//                 color:
//                   selectedWorkout?.id === item.id
//                     ? Colors.primary
//                     : Colors.textSecondary,
//               }}
//             >
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={{ marginTop: 30 }}>
//         <Text style={{ color: Colors.textSecondary, marginBottom: 10 }}>
//           Duration (Minutes)
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="e.g. 30"
//           placeholderTextColor={Colors.textMuted}
//           keyboardType="numeric"
//           value={duration}
//           onChangeText={setDuration}
//         />
//       </View>

//       <TouchableOpacity
//         style={[GlobalStyles.primaryButton, { marginTop: 40 }]}
//         onPress={saveWorkout}
//       >
//         <Text style={GlobalStyles.buttonText}>Save Workout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = {
//   chip: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     marginRight: 10,
//     height: 45,
//     backgroundColor: Colors.surface,
//   },
//   input: {
//     backgroundColor: Colors.surface,
//     borderRadius: 15,
//     padding: 18,
//     color: '#fff',
//     fontSize: 18,
//     borderWidth: 1,
//     borderColor: Colors.border,
//   },
// };

// export default LogWorkout;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Colors from '../Constants/Colors';
import GlobalStyles from '../Constants/Styles';
import { workoutList, calculateCalories } from '../Utils/FitnessCalc';
import db from '../Services/Database';

const LogWorkout = ({ userWeight, navigation }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [duration, setDuration] = useState('');
  const [estimatedCalories, setEstimatedCalories] = useState('0');


  useEffect(() => {
    if (selectedWorkout && duration) {
      const cals = calculateCalories(
        selectedWorkout.met,
        userWeight || 70,
        parseInt(duration) || 0,
      );
      setEstimatedCalories(cals.toFixed(0));
    } else {
      setEstimatedCalories('0');
    }
  }, [selectedWorkout, duration]);

  const saveWorkout = () => {
    if (!selectedWorkout || !duration) {
      Alert.alert('Error', 'Please select a workout and enter duration.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO workouts (type, duration, calories, date) VALUES (?,?,?,?)',
        [selectedWorkout.name, duration, estimatedCalories, today],
        () => {
          Alert.alert('Success', `Logged ${estimatedCalories} kcal!`);
          navigation?.goBack();
        },
      );
    });
  };

  return (
    <ScrollView
      style={GlobalStyles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={GlobalStyles.heading}>Log Workout</Text>
      <Text style={[GlobalStyles.subHeading, { marginBottom: 25 }]}>
        What did you do today?
      </Text>

     
      <View style={{ marginBottom: 25 }}>
        <Text style={styles.inputLabel}>Select Activity</Text>
        <FlatList
          data={workoutList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.chip,
                selectedWorkout?.id === item.id && styles.activeChip,
              ]}
              onPress={() => setSelectedWorkout(item)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedWorkout?.id === item.id && { color: Colors.primary },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 2. Duration & Calories Row */}
      <View style={styles.inputsRow}>
        <View style={{ flex: 1, marginRight: 15 }}>
          <Text style={styles.inputLabel}>Duration (Mins)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={Colors.textMuted}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.inputLabel}>Burned Calories</Text>
          <View style={[styles.input, styles.disabledInput]}>
            <Text style={styles.caloriesText}>{estimatedCalories} kcal</Text>
          </View>
        </View>
      </View>

      
      {selectedWorkout && (
        <View style={styles.summaryCard}>
          <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>
            Summary
          </Text>
          <Text
            style={{
              color: Colors.textPrimary,
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 5,
            }}
          >
            {selectedWorkout.name} for {duration || '0'} mins
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          GlobalStyles.primaryButton,
          { marginTop: 40, opacity: selectedWorkout && duration ? 1 : 0.6 },
        ]}
        onPress={saveWorkout}
        disabled={!selectedWorkout || !duration}
      >
        <Text style={GlobalStyles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: Colors.textSecondary,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  chip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 12,
    backgroundColor: Colors.surface,
  },
  activeChip: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15', 
  },
  chipText: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 18,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: Colors.border,
    textAlign: 'center',
  },
  disabledInput: {
    backgroundColor: Colors.background,
    borderStyle: 'dashed',
    borderColor: Colors.textMuted,
    justifyContent: 'center',
  },
  caloriesText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
});

export default LogWorkout;
