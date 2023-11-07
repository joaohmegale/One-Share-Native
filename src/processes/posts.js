import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchPosts = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.get('https://a067-45-168-140-49.ngrok-free.app/posts', {
    headers: {
      accessToken: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createPost = async (data, dispatch) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post('https://a067-45-168-140-49.ngrok-free.app/posts',
      data,
      {
        headers: {
          accessToken: `Bearer ${token}`,
        }
      }
    );
    dispatch({ type: 'ADD_POST', post: data });
    return response.data.data.id;
  } catch (error) {
    console.log(error);
  }
}

export const fetchPost = async (id) => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.get(`https://a067-45-168-140-49.ngrok-free.app/posts/byId/${id}`, {
    headers: {
      accessToken: `Bearer ${token}`,
    }
  });
  return response.data;
}

export const deletePost = async (id, dispatch) => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = axios.delete(`https://a067-45-168-140-49.ngrok-free.app/posts/byId/${id}`, {
    headers: {
      accessToken: `Bearer ${token}`,
    }
  });
  return response.data;
}

export const updatePost = async (id, editedPostText) => {
  const data = {
    id: id,
    post_text: editedPostText,
  }
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.put(`https://a067-45-168-140-49.ngrok-free.app/posts/byId/${id}`,
      data,
      {
        headers: {
          accessToken: `Bearer ${token}`,
        }
      })
    return response.data;
  } catch (error) {
    console.log(error)
  }
}