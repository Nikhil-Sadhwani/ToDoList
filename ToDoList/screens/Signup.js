import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableHighlight, Button, TextInput, Alert, SafeAreaView, Platform, StatusBar } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';


function Signup({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Call API for Storing data into database
    const handleSignup = async () => {
        if (username !== "") {
            if (email !== "") {

                if (password !== "") {

                    // Here use the ngrok for create the URL for connecting backend to frontend 
                    await axios.post("https://20b8-2401-4900-1703-d93f-4c23-414b-b0f1-a133.ngrok-free.app/signup", {
                        username: username,
                        email: email,
                        password: password
                    }).then(function (response) {
                        if (response.data.message === "User is already exists") {
                            Alert.alert("Alert", "User is already exists", [
                                { text: "OK" }
                            ]);
                        }
                        else {

                            // Navigate to Login Page if signup is successful 
                            navigation.replace('Login');
                            setUsername("");
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
        } else {
            Alert.alert("Empty Field", "Username Field is empty ", [
                { text: "OK" }
            ]);
        }
    };

    const handleSignin = () => {
        // Navigate to Login Page 
        navigation.replace('Login');
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
                <View style={styles.SignupContainer}>

                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>Signup</Text>

                    <View style={styles.textareaContainer}>

                        <Text style={{}}>Username </Text>
                        <View style={styles.inputContainer}>
                            <TextInput value={username} onChangeText={(e) => setUsername(e)} placeholder='Enter Your Username' keyboardType='email-address' />
                        </View>

                        <Text style={{}}>Email </Text>
                        <View style={styles.inputContainer}>
                            <TextInput value={email} onChangeText={(e) => setEmail(e)} placeholder='Enter Your Email' keyboardType='email-address' />
                        </View>

                        <Text>Password </Text>
                        <View style={styles.inputContainer}>
                            <TextInput secureTextEntry={true} value={password} onChangeText={(e) => setPassword(e)} placeholder='Enter Your Password' textContentType='password' />
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginHorizontal: 3, }}>Already have an account?</Text>
                            <TouchableHighlight onPress={handleSignin}>
                                <Text style={{ color: "blue" }}>SignIn</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    {/* Signup Button  */}
                    <TouchableHighlight>
                        <Button title="Signup" color={"black"} onPress={handleSignup} />
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
    SignupContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d3d3d3",
        width: '100%',
        padding: 20,
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
export default Signup;