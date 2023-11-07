import { StyleSheet, View, TextInput, Text, Button, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

const Login = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm()
  const dispatch = useDispatch();

  const onSubmit = useCallback(async (data) => {
    axios.post('https://a067-45-168-140-49.ngrok-free.app/users/login', data).then(async ({ data }) => {
      if (data.error) {
        ToastAndroid.show('Usuario ou senha invalido', ToastAndroid.SHORT)
      } else {
        const accessToken = data.accessToken;
        const username = data.user.username;
        await AsyncStorage.setItem('accessToken', (accessToken))
        dispatch({
          type: 'STORE_USERNAME',
          payload: username
        });
        navigation.navigate('Home');
        try {
        } catch (error) {
          console.log(error);
        }
        reset({ username: '', password: '' });
      }
    });
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.welcomeText}>
        <Text style={styles.text}>
          Bem vindo novamente!
        </Text>
      </View>
      <View>
        <Controller
          control={control}
          name="username"
          rules={{ required: 'username obrigatorio' }}
          render={({ field }) => (
            <TextInput
              placeholder='Digite seu username'
              style={styles.textInput}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: 'password obrigatorio' }}
          render={({ field }) => (
            <TextInput
              placeholder='Digite sua Senha'
              style={styles.textInput}
              secureTextEntry={true}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.buttonBox}>
        <Button
          title='Login'
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Registration');
          }}>
          <Text style={styles.register}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    marginTop: 70,
    width: 353,
    height: 72,
  },
  text: {
    fontSize: 28,
  },
  textInput: {
    marginTop: 20,
    borderWidth: 1,
    width: 331,
    height: 56,
    borderRadius: 8,
    padding: 10,
  },
  buttonBox: {
    marginTop: 80,
    width: 331,
    height: 56,
  },
  register: {
    fontSize: 20,
  }
})