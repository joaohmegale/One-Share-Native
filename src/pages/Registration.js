import { StyleSheet, View, TextInput, Text, Button, ToastAndroid } from 'react-native'
import React from 'react'
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const Registration = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm()

  const onSubmit = useCallback (async (data) => {
    axios.post('https://a067-45-168-140-49.ngrok-free.app/users/register', data).then(async ({ data }) => {
      if (data) {
        ToastAndroid.show('Usuario ja existente', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show('Usuario criado com sucesso', ToastAndroid.SHORT)
        navigation.navigate('Login');
        reset({ username: '', password: '' });
      }
    })
  },[])


  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Registre-se para começar a navegar.</Text>
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
              placeholder='Digite seu password'
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
          title='Registrar'
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}

export default Registration

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 70,
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
  }
})