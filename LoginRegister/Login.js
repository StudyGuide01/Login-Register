import React, { useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Error from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle Email input
  const handleEmail = (e) => {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVar));
  };

  // Function to handle Password input
  const handlePassword = (e) => {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(passwordVar));
  };

  // Handle Submit function
  const handleSubmit = async () => {
    if (emailVerify && passwordVerify) {
      const userData = { email, password };
      try {
        const res = await axios.post('http://localhost:5001/login-user', userData);
        console.log(res.data);
        Alert.alert("Login Successful", res.data.message);
        navigation.navigate('Home');
      } catch (error) {
        console.error("Login Error", error);
        Alert.alert("Login Error", "Unable to login. Please try again.");
      }
    } else {
      Alert.alert("Invalid Input", "Please enter valid email and password.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/loginPageImage.jpg')} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.text_header}>Login</Text>
      </View>

      {/* Email Input */}
      <View style={styles.action}>
        <FontAwesome name="envelope-o" color="#420475" style={styles.smallIcon} />
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          keyboardType="email-address"
          onChange={handleEmail}
        />
        {email.length > 0 && (
          emailVerify ? (
            <Feather name='check-circle' color='green' size={20} />
          ) : (
            <Error name="error" color='red' size={20} />
          )
        )}
      </View>
      {email.length > 0 && !emailVerify && (
        <Text style={styles.errorText}>
          Enter a valid email address.
        </Text>
      )}

      {/* Password Input */}
      <View style={styles.action}>
        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={!showPassword}
          onChange={handlePassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            style={{ marginRight: -10 }}
            color={passwordVerify ? 'green' : 'red'}
            size={23}
          />
        </TouchableOpacity>
      </View>
      {password.length > 0 && !passwordVerify && (
        <Text style={[styles.errorText, { color: 'red' }]}>
          Password must be 8-20 characters, with uppercase, lowercase, number, and special character.
        </Text>
      )}

      {/* Forgot Password */}
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
      </View>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Divider Text */}
        <Text style={styles.dividerText}>------ or continue as ------</Text>

        {/* Bottom Buttons */}
        <View style={styles.socialButtons}>
          <View style={styles.socialButtonWrapper}>
            <TouchableOpacity style={styles.inBut}>
              <FontAwesome name='user-o' color={'white'} size={20} />
            </TouchableOpacity>
            <Text style={styles.bottomText}>Guest</Text>
          </View>

          <View style={styles.socialButtonWrapper}>
            <TouchableOpacity style={styles.inBut} onPress={() => navigation.navigate('Register')}>
              <FontAwesome name='user-plus' color={'white'} size={30} />
            </TouchableOpacity>
            <Text style={styles.bottomText}>Sign Up</Text>
          </View>

          <View style={styles.socialButtonWrapper}>
            <TouchableOpacity style={styles.inBut} onPress={() => alert('Coming Soon')}>
              <FontAwesome name='google' color={'white'} size={30} />
            </TouchableOpacity>
            <Text style={styles.bottomText}>Google</Text>
          </View>

          <View style={styles.socialButtonWrapper}>
            <TouchableOpacity style={styles.inBut} onPress={() => alert('Coming Soon')}>
              <FontAwesome name='facebook-f' color={'white'} size={30} />
            </TouchableOpacity>
            <Text style={styles.bottomText}>Facebook</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
