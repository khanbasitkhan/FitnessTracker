import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import Colors from '../Constants/Colors';
import GlobalStyles from '../Constants/Styles';
import db from '../Services/Database';

const LoginScreen = ({ onLoginSuccess, onGoToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            
            tx.executeSql(
              'UPDATE users SET isLoggedIn = 1 WHERE email = ?',
              [email],
              () => {
                Alert.alert('Welcome Back!', 'Login successful.');
                onLoginSuccess(); 
              },
            );
          } else {
            Alert.alert('Error', 'Invalid email or password');
          }
        },
      );
    });
  };

  return (
    <View style={GlobalStyles.container}>
      
      <View style={{ marginTop: 50, marginBottom: 40 }}>
        <Text style={GlobalStyles.heading}>Welcome Back</Text>
        <Text style={GlobalStyles.subHeading}>
          Login to continue your fitness journey
        </Text>
      </View>

      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="ahmad@email.com"
          placeholderTextColor={Colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      
      <TouchableOpacity
        style={[GlobalStyles.primaryButton, { marginTop: 20 }]}
        onPress={handleLogin}
      >
        <Text style={GlobalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      
      <View style={styles.footer}>
        <Text style={{ color: Colors.textSecondary }}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={onGoToSignUp}>
          <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: Colors.textSecondary,
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default LoginScreen;
