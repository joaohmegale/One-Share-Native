import React from 'react';
import { View, StyleSheet, Button, Image, ImageBackground } from 'react-native';

export default function Welcome({ navigation }) {

  return (
    <ImageBackground
      source={require('../../assets/img/backgroundHome.jpg')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.mainContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/img/amigoLogo.jpg')}
            style={styles.image} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Login'
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          </View>
          <View style={styles.button}>
            <Button title='Register' 
              onPress={() => {
                navigation.navigate('Registration');
              }}
            />
          </View>
        </View>
      </View >
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  button: {
    margin: 10,
  }

})
