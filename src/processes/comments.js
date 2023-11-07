import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchComment = async (id) => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.get(`https://a067-45-168-140-49.ngrok-free.app/comments/${id}`, {
    headers: {
      accessToken: `Bearer ${token}`,
    }
  });
  return response.data;
}

export const addComment = async (data, id) => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.post(`https://a067-45-168-140-49.ngrok-free.app/comments`,
    {
      comment_body: data.comment_body,
      post_id: id,
    },
    {
      headers: {
        accessToken: `Bearer ${token}`,
      }
    })
    
  return response.data;
}

export const deleteComment = async (id) => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.delete(`https://a067-45-168-140-49.ngrok-free.app/comments/${id}`,
    {
      headers: {
        accessToken: `Bearer ${token}`,
      }
    });
  return response.data;
}