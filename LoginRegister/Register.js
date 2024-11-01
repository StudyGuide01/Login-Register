// Frontend - Register.js
import React, { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from 'react-native-vector-icons/Feather';
import Error from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    // Define state variables for each input field
    const [name, setName] = useState('');
    const [nameVerify, setNameVerify] = useState(false);

    const [mobile, setMobile] = useState('');
    const [mobileVerify, setMobileVerify] = useState(false);

    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation();
    // Submit handler to send form data to the backend
    const handleSubmit = async () => {
        const userData = {
            name:name,
            email:email,
            mobile:mobile,
            password:password
          }

        try {
            const response = await axios.post('http://localhost:5001/register', userData);
            console.log(response.data);
            alert(response.data.data);
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error creating user:", error.message);

            alert("Error registering user. Please try again.");
        }
    };

    // Input handlers with validation
    const handleName = (e) => {
        const nameVar = e.nativeEvent.text;
        setName(nameVar);
        setNameVerify(nameVar.length > 1);
    };

    const handleEmail = (e) => {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVar));
    };

    const handleMobile = (e) => {
        const mobileVar = e.nativeEvent.text;
        setMobile(mobileVar);
        setMobileVerify(/^[6-9][0-9]{9}$/.test(mobileVar));
    };

    const handlePassword = (e) => {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(passwordVar));
    };

    return (
        <View style={styles.mainContainer}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require("../assets/loginPageImage.jpg")}
                />
            </View>

            {/* Header Text */}
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>Register</Text>
            </View>

            {/* Name Input */}
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                <TextInput
                    placeholder="Name"
                    style={styles.textInput}
                    onChange={handleName}
                />
                {name.length === 0 ? null : (
                    nameVerify ? (
                        <Feather name='check-circle' color='green' size={20} />
                    ) : (
                        <Error name="error" color='red' size={20} />
                    )
                )}
            </View>
            {name.length < 1 ? null : !nameVerify && (
                <Text style={{ marginLeft: 20, color: 'red' }}>
                    Name should be more than 1 character
                </Text>
            )}

            {/* Mobile Input */}
            <View style={styles.action}>
                <FontAwesome name="phone" color="#420475" style={styles.smallIcon} />
                <TextInput
                    placeholder="Mobile"
                    style={styles.textInput}
                    keyboardType="phone-pad"
                    onChange={handleMobile}
                    maxLength={10}
                />
                {mobile.length === 0 ? null : (
                    mobileVerify ? (
                        <Feather name='check-circle' color='green' size={20} />
                    ) : (
                        <Error name="error" color='red' size={20} />
                    )
                )}
            </View>
            {mobile.length < 1 ? null : !mobileVerify && (
                <Text style={{ marginLeft: 20, color: 'red' }}>
                    Phone number should start with 6-9 followed by 9 digits (0-9).
                </Text>
            )}

            {/* Email Input */}
            <View style={styles.action}>
                <FontAwesome name="envelope-o" color="#420475" style={styles.smallIcon} />
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    keyboardType="email-address"
                    onChange={handleEmail}
                />
                {email.length === 0 ? null : (
                    emailVerify ? (
                        <Feather name='check-circle' color='green' size={20} />
                    ) : (
                        <Error name="error" color='red' size={20} />
                    )
                )}
            </View>
            {email.length < 1 ? null : !emailVerify && (
                <Text style={{ marginLeft: 20, color: 'red' }}>
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
                        color={passwordVerify ? 'green' : 'red'}
                        size={23}
                        style={{ marginRight: -10 }}
                    />
                </TouchableOpacity>
            </View>
            {password.length < 1 ? null : !passwordVerify && (
                <Text style={{ marginLeft: 20, color: 'red' }}>
                    Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.
                </Text>
            )}

            {/* Register Button */}
            <View style={styles.button}>
                <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
                    <Text style={styles.textSign}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
