export const workoutList = [
  { id: 1, name: 'Running', met: 9.8 },
  { id: 2, name: 'Cycling', met: 7.5 },
  { id: 3, name: 'Walking', met: 3.5 },
  { id: 4, name: 'Weightlifting', met: 5.0 },
  { id: 5, name: 'Push-ups', met: 8.0 }, 
  { id: 6, name: 'Yoga', met: 3.0 },      
  { id: 7, name: 'HIIT', met: 11.0 },     
  { id: 8, name: 'Plank', met: 4.0 },     
];

export const calculateCalories = (met, weight, duration) => {

  return ((met * weight * 3.5) / 200) * duration;
};