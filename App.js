import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserScreen from './screens/UserScreen';
import DrawerContent from './DrawerContent';
import Login from './LoginRegister/Login';
import { ScrollView } from 'react-native-gesture-handler';
import Register from './LoginRegister/Register';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


// Stack Navigator for Home, Profile, User, UpdateProfile, and Login
const StackNav = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "orange" },
      headerTintColor: "white",
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="User" component={UserScreen} />
    {/* <Stack.Screen name="Update" component={UpdateProfileScreens} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="LoginUser" component={LoginNav} /> */}
    
  </Stack.Navigator>
);

// Drawer Navigation component
const DrawerNav = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={StackNav} />
    {/* <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="User" component={UserScreen} /> */}
  </Drawer.Navigator>
);

export default function App() {
  return (
    <ScrollView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />

<Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen name='Home' component={DrawerNav}/>
        {/* <Stack.Screen 
          name="Main" 
          component={DrawerNav} 
          options={{ headerShown: false }} 
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </ScrollView>
  );
}
