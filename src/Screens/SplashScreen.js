import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Colors from '../Constants/Colors';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../../Assets/FitnessTrackerAppLogo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      
      <View style={styles.textContainer}>
        <Text style={styles.appName}>FITNESS</Text>
        <Text
          style={[styles.appName, { color: Colors.primary, marginTop: -5 }]}
        >
          TRACKER
        </Text>
      </View>

      {/* Modern Loader */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading your progress...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 220,
    height: 220,
    backgroundColor: Colors.surface, 
    borderRadius: 60, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 30,
  },
  logo: {
    width: '85%',
    height: '85%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    color: Colors.textPrimary,
    fontSize: 36,
    fontWeight: '900', 
    letterSpacing: 4, 
    textAlign: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default SplashScreen;
