import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, ToastAndroid } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { fetchPost, deletePost, updatePost } from '../processes/posts'
import { fetchComment, addComment, deleteComment } from '../processes/comments'

const Post = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm()
  const route = useRoute();
  const idPost = route.params.itemId;
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [user, setUser] = useState('')
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [initialPostText, setInitialPostText] = useState('');
  const [editedPostText, setEditedPostText] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);

  const { username } = useSelector(state => state.user)

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const data = await fetchPost(idPost);
        setPost(data);
        setInitialPostText(data.post_text)
        setUser(data.user.username);
      }
      fetchData();
    }, [idPost])
  )

  const deletePosts = useCallback(async () => {
    if (username !== user) {
      ToastAndroid.show('Você só pode deletar seus próprios posts', ToastAndroid.SHORT);
      return;
    }
    await deletePost(idPost);
    navigation.navigate('Home');
    ToastAndroid.show('Post deletado com sucesso', ToastAndroid.SHORT);
  }, [username, user])

  const fetchComments = useCallback(async () => {
    const comments = await fetchComment(idPost);
    setComments(comments);
  }, [comments])

  const addComments = useCallback(async (data) => {
    addComment(data, idPost);
    setCommentAdded(true)
    fetchComments(idPost);
    reset({ comment_body: '' });
  }, [comments]);

  const deletComments = useCallback(async (id) => {
    await deleteComment(id);
    fetchComments(idPost);
  }, [comments])

  useEffect(() => {
    fetchComments();
  }, [commentAdded])

  useEffect(() => {
    if (commentAdded) {
      setCommentAdded(false);
    }
  }, [commentAdded]);

  const updatePostt = () => {
    if (username !== user) {
      ToastAndroid.show('Você só pode alterar seus próprios posts', ToastAndroid.SHORT);
      return;
    } else {
      setEditedPostText(editedPostText);
      setEditModalVisible(true);
    }
  };

  const confirmEdit = async () => {
    await updatePost(idPost, editedPostText);
    setInitialPostText(editedPostText)
    setEditModalVisible(false);
  };

  const renderComments = useCallback(({ item }) => {
    return (
      <View style={styles.commentBox}>
        <Text style={styles.commentText}>{item.comment_body}</Text>
        <View style={styles.commentUsername}>
          <Text>Username: {item.User.username}</Text>
        </View>
        <View>
          {username === item.User.username &&
            <TouchableOpacity
              onPress={() => deletComments(item.id, item.user_id)}>
              <Text style={{ marginBottom: 15 }}>Apagar comentario</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }, [])


  return (
    <View style={styles.postContainer}>
      <View style={styles.mainPost}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{post.title}</Text>
        </View>
        <View style={styles.postBodyContainer}>
          <Text style={styles.postBodyText}>{initialPostText}</Text>
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>{user}</Text>
          <View style={styles.deleteButton}>
            <TouchableOpacity onPress={updatePostt}>
              <Text style={{ color: 'white' }}>Atualizar Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletePosts}>
              <Text style={{ color: 'red' }}>Deletar Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isEditModalVisible}
          animationType='fade'
          transparent={true}
        >
          <View style={{height: '60%', marginTop:'auto', backgroundColor:'white'}}>
            <View style={styles.editModal}>
              <View style={[styles.title, styles.titleFlexBox]}>
                <Text style={styles.signIn}>Edite sua postagem!</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <View style={styles.inputLight}>
                  <TextInput
                    value={editedPostText}
                    onChangeText={(text) => setEditedPostText(text)}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                <TouchableOpacity onPress={confirmEdit}
                  style={{ margin: 15, backgroundColor: "#17202a", borderRadius: 8, padding: 10 }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditModalVisible(false)
                }
                  style={{ margin: 15, backgroundColor: "#17202a", borderRadius: 8, padding: 10 }}>
                  <Text style={{ color: 'red', fontSize: 20 }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View >
      <View style={styles.commentsContainer}>
        <Controller
          control={control}
          name="comment_body"
          rules={{ required: 'Comentario obrigatorio' }}
          render={({ field }) => (
            <TextInput
              placeholder='Faça seu comentario!'
              style={styles.textInput}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={handleSubmit(addComments)}
          >
            <Text>Fazer comentario</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={comments}
          renderItem={renderComments}
          keyExtractor={item => item.id}
        />
      </View>
    </View >
  )
}

export default Post

const styles = StyleSheet.create({
  inputLight: {
    height: 56,
    borderWidth: 2,
    borderRadius: 8,
    borderStyle: "solid",
    width: 400,
    justifyContent: "center",
    width: '90%',
    padding: 10,
  },
  title: {
    marginTop: 32,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  titleFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  signIn: {
    lineHeight: 44,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "stretch",
    fontSize: 25,
  },
  postContainer: {
    flex: 1,
    width: '100',
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  mainPost: {
    flex: 1,
    backgroundColor: "#17202a",
    width: '100%',
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 5,
  },
  titleContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    alignItems: 'flex-start',
    justifyContent: "center",
    padding: 10,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  titleText: {
    fontSize: 25,
  },
  postBodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postBodyText: {
    textAlign: "center",
    fontSize: 40,
    color: 'white',
  },
  userContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    padding: 10,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    width: '100%',
  },
  userText: {
    fontSize: 25,
  },
  commentsContainer: {
    flex: 2,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#17202a',
  },
  textInput: {
    backgroundColor: 'white',
    width: 400,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    height: 40,
    padding: 10,
  },
  buttonBox: {
    margin: 10,
    width: 400,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 8,
  },
  commentBox: {
    height: 100,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: 'white',
    width: 400,
    margin: 5,
    padding: 10,
    borderWidth: 1,
  },
  commentText: {
    fontSize: 18,
    marginTop: 10,
  },
  commentUsername: {
    alignItems: 'flex-end',
    width: 'auto',
  },
  deleteButton: {
    justifyContent: 'space-around',
    backgroundColor: '#17202a',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
  }
})