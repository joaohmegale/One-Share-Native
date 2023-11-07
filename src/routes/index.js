import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import CreatePost from '../pages/CreatePost';
import Home from '../pages/Home';
import Post from '../pages/Post';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="home" size={24} color={focused ? '#16247d' : '#111'} />
                <Text style={{ fontSize: 12, color: '#16247d' }}>HOME</Text>
              </View>
            )
          }
        }} />
      <Tab.Screen name="CreatePost" component={CreatePost}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="post-add" size={24} color={focused ? '#16247d' : '#111'} />
                <Text style={{ fontSize: 12, color: '#16247d' }}>CREATE POST</Text>
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {

  return (
    <Stack.Navigator>
      <Stack.Screen name='Welcome' component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Registration' component={Registration} />
      <Stack.Screen name='Home' component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Post' component={Post} />
    </Stack.Navigator>
  );
}