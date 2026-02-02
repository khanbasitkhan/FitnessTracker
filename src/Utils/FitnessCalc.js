export const workoutList = [
  { id: 1, name: 'Running', met: 9.8 },
  { id: 2, name: 'Cycling', met: 7.5 },
  { id: 3, name: 'Walking', met: 3.5 },
  { id: 4, name: 'Weightlifting', met: 5.0 },
  { id: 5, name: 'Push-ups', met: 8.0 }, // Swimming ki jagah Push-ups
  { id: 6, name: 'Yoga', met: 3.0 },      // Standard workout
  { id: 7, name: 'HIIT', met: 11.0 },     // High Intensity (Standard)
  { id: 8, name: 'Plank', met: 4.0 },     // Core Workout
];

export const calculateCalories = (met, weight, duration) => {
  // Standard Formula: (MET * Weight_kg * 3.5) / 200 * Duration_mins
  return ((met * weight * 3.5) / 200) * duration;
};