import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native'
import { useCallback } from 'react';
import React from 'react'
import { fetchPosts } from '../processes/posts';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => {
    return state.posts
  });

  useFocusEffect(
    useCallback(() => {
      fetchPosts().then(data => dispatch({ type: 'SET_POSTS', posts: data }));
    }, [])
  );

  const renderItem = useCallback(({ item }) => {
    return (
      <Pressable
        android_ripple={{ color: 'blue' }}
        onPress={() => {
          navigation.navigate('Post', {
            itemId: item.id,
          })
        }}
      >
        <View style={styles.postContainer}>
          <View style={styles.mainPost}>
            <View style={styles.postBodyContainer}>
              <Text style={styles.postBodyText}>{item.post_text}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }, [])

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    width: '100',
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 10,
  },
  mainPost: {
    flex: 1,
    backgroundColor: "#17202a",
    width: '100%',
    height: 120,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 8
  },
  // titleContainer: {
  //   backgroundColor: 'white',
  //   width: '100%',
  //   height: 50,
  //   alignItems: 'flex-start',
  //   justifyContent: "center",
  //   padding: 10,
  //   borderBottomRightRadius: 8,
  //   borderBottomLeftRadius: 8
  // },
  // titleText: {
  //   fontSize: 15,
  // },
  postBodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postBodyText: {
    textAlign: "center",
    fontSize: 20,
    color: 'white',
  },
  // userContainer: {
  //   backgroundColor: 'white',
  //   alignSelf: 'flex-end',
  //   padding: 10,
  //   borderTopRightRadius: 8,
  //   borderTopLeftRadius: 8,
  //   width: '100%',
  // },
  // userText:{
  //   fontSize:15,
  // }
})