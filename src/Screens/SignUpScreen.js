import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import Colors from '../Constants/Colors';
import GlobalStyles from '../Constants/Styles';
import db from '../Services/Database';

const SignUpScreen = ({ onSignUpSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    goal: 'Stay Fit',
  });

 
  const isStep1Valid = formData.name.trim() !== '' && 
                       formData.email.trim() !== '' && 
                       formData.password.trim().length >= 6; 


  const isStep2Valid = formData.age !== '' && 
                       formData.weight !== '' && 
                       formData.height !== '';

  const handleSignUp = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email, password, age, weight, height, goal, isLoggedIn) VALUES (?,?,?,?,?,?,?,?)',
        [
          formData.name,
          formData.email,
          formData.password,
          formData.age,
          formData.weight,
          formData.height,
          formData.goal,
          1,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Account created successfully!');
            onSignUpSuccess();
          }
        },
      );
    });
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={[GlobalStyles.heading, { marginBottom: 10 }]}>
        {step === 1 ? 'Create Account' : 'Fitness Profile'}
      </Text>
      <Text style={[GlobalStyles.subHeading, { marginBottom: 30 }]}>
        {step === 1
          ? 'Start your journey today'
          : 'Help us calculate your goals'}
      </Text>

      {step === 1 ? (
        <View>
          <InputField
            label="Full Name"
            placeholder="Ahmad"
            onChangeText={v => setFormData({ ...formData, name: v })}
            value={formData.name}
          />
          <InputField
            label="Email"
            placeholder="ahmad@email.com"
            keyboardType="email-address"
            onChangeText={v => setFormData({ ...formData, email: v })}
            value={formData.email}
          />
          <InputField
            label="Password (min 6 chars)"
            placeholder="******"
            secureTextEntry
            onChangeText={v => setFormData({ ...formData, password: v })}
            value={formData.password}
          />

          <TouchableOpacity
            disabled={!isStep1Valid} // Button lock
            style={[
              GlobalStyles.primaryButton, 
              { marginTop: 20, opacity: isStep1Valid ? 1 : 0.5 } // Faded look if disabled
            ]}
            onPress={() => setStep(2)}
          >
            <Text style={GlobalStyles.buttonText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <InputField
              label="Age"
              placeholder="25"
              width="45%"
              keyboardType="numeric"
              onChangeText={v => setFormData({ ...formData, age: v })}
              value={formData.age}
            />
            <InputField
              label="Weight (kg)"
              placeholder="70"
              width="45%"
              keyboardType="numeric"
              onChangeText={v => setFormData({ ...formData, weight: v })}
              value={formData.weight}
            />
          </View>
          <InputField
            label="Height (cm)"
            placeholder="175"
            keyboardType="numeric"
            onChangeText={v => setFormData({ ...formData, height: v })}
            value={formData.height}
          />

          <Text style={[GlobalStyles.subHeading, { marginTop: 15, color: Colors.textPrimary }]}>
            Your Goal
          </Text>
          <View style={styles.goalRow}>
            {['Lose Weight', 'Gain Muscle', 'Stay Fit'].map(g => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.goalBtn,
                  formData.goal === g && { borderColor: Colors.primary },
                ]}
                onPress={() => setFormData({ ...formData, goal: g })}
              >
                <Text style={{ color: formData.goal === g ? Colors.primary : Colors.textSecondary }}>
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            disabled={!isStep2Valid} // Button lock for final step
            style={[
              GlobalStyles.primaryButton, 
              { marginTop: 30, opacity: isStep2Valid ? 1 : 0.5 }
            ]}
            onPress={handleSignUp}
          >
            <Text style={GlobalStyles.buttonText}>Complete & Finish</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setStep(1)}
            style={{ alignSelf: 'center', marginTop: 15 }}
          >
            <Text style={{ color: Colors.textSecondary }}>Back to basic info</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

// InputField Component remains the same
const InputField = ({ label, width = '100%', ...props }) => (
  <View style={{ marginBottom: 20, width }}>
    <Text style={{ color: Colors.textSecondary, marginBottom: 8, fontSize: 14 }}>
      {label}
    </Text>
    <TextInput
      style={{
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 15,
        color: '#fff',
        borderWidth: 1,
        borderColor: Colors.border,
      }}
      placeholderTextColor={Colors.textMuted}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  goalBtn: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    width: '31%',
    alignItems: 'center',
  },
});

export default SignUpScreen;