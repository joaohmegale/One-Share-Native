import { View, Text, StyleSheet, Button, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createPost } from '../processes/posts'

const CreatePost = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = useCallback(async (data) => {
    await createPost(data, dispatch);
    navigation.navigate('Posts');
    reset({ title: '', post_text: '' });
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.welcomeText}>
        <Text style={styles.text}>
          Escreva o que voce esta pensando...
        </Text>
      </View>
      <View>
        <Controller
          control={control}
          name="title"
          rules={{ required: 'titulo obrigatorio' }}
          render={({ field }) => (
            <TextInput
              placeholder='Digite o titulo do post'
              style={styles.textInput}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="post_text"
          rules={{ required: 'Texto de postagem obrigatorio.' }}
          render={({ field }) => (
            <TextInput
              placeholder='Digite seu post'
              style={styles.textInput}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={styles.buttonBox}>
        <Button
          title='Realizar postagem!'
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}

export default CreatePost;

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
})