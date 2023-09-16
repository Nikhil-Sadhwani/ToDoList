import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableHighlight, Button, TextInput, Alert, SafeAreaView, Platform, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

function Signin({ navigation }) {

    useEffect(() => {
        isLoggedIn();
    }, []);

    // Check user is Login already ot not
    const isLoggedIn = async () => {
        const setToken = await AsyncStorage.getItem("AccessToken");
        if (setToken) {
            navigation.replace("ToDo List");
        }
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // Call the API for check the email and password is valid or not
    const handleLogin = async () => {
        if (email !== "") {

            if (password !== "") {

                // Here use the ngrok for create the URL for connecting backend to frontend 
                await axios.post("https://20b8-2401-4900-1703-d93f-4c23-414b-b0f1-a133.ngrok-free.app/login", {
                    email: email,
                    password: password
                }).then(function async(response) {
                    if (response.data.message === "Wrong email address" || response.data.message === "Wrong password") {
                        Alert.alert("Wrong Inputs", "Check Your email and password", [
                            { text: "OK" }
                        ]);
                    }
                    else {

                        // Safe the Token and Email so we can access it everywhere
                        AsyncStorage.setItem("AccessToken", response.data.token);
                        AsyncStorage.setItem("email", response.data.data['email']);

                        // Navigate to Home page
                        navigation.replace("ToDo List");
                        setEmail("");
                        setPassword("");
                    }
                }).catch((err) => console.log(err));
            } else {
                Alert.alert("Empty Field", "Password Field is empty ", [
                    { text: "OK" }
                ]);
            }
        } else {
            Alert.alert("Empty Field", "Email Field is empty ", [
                { text: "OK" }
            ]);
        }
    };

    const handleSignup = () => {

        // Navigate to Signup page
        navigation.replace("Signup");
    }

    return (
        <>

            <SafeAreaView style={styles.header}>

                {/* Gradient */}
                <LinearGradient colors={['#5A636A', '#AFB3B7', '#69818D']}
                    style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, position: 'absolute' }}
                >
                </LinearGradient>

                {/* Form  */}
                <View style={styles.LoginContainer}>

                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>Login</Text>

                    <View style={styles.textareaContainer}>

                        <Text style={{}}>Email </Text>
                        <View style={styles.inputContainer}>
                            <TextInput value={email} onChangeText={(e) => setEmail(e)} placeholder='Enter Your Email' keyboardType='email-address' />
                        </View>

                        <Text>Password </Text>
                        <View style={styles.inputContainer}>
                            <TextInput secureTextEntry={true} value={password} onChangeText={(e) => setPassword(e)} placeholder='Enter Your Password' textContentType='password' />
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginHorizontal: 3, }}>Don't have an account?</Text>
                            <TouchableHighlight onPress={handleSignup}>
                                <Text style={{ color: "blue" }}>SignUp</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    {/* Login Button */}
                    <TouchableHighlight>
                        <Button title="Login" color={"black"} onPress={handleLogin} />
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#fff',
        padding: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        justifyContent: "center"
    },
    LoginContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d3d3d3",
        padding: 20,
        width: '100%',
        borderRadius: 20
    },
    textareaContainer: {
        width: '100%',
        marginRight: 13,
        marginHorizontal: 30,
        marginBottom: 10
    },

    inputContainer: {
        height: 50,
        paddingHorizontal: 20,
        elevation: 5,
        backgroundColor: "white",
        marginVertical: 5,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: "center"
    },
})
export default Signin;