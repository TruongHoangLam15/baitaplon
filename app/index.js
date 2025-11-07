import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/Launch Screen/bg.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image source={require('../assets/Home - Audio Listing/Image 36.png')} style={styles.logo} />

        {/* Main Text */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Your music</Text>
          <Text style={styles.mainText}>Your artists</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('signup')}>
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('login')}>
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  logo: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    marginTop: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 28,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#00CFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
