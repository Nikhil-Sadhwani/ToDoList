import React, { useEffect, useState } from 'react';
import { Dimensions, Button, StyleSheet, Text, View, ScrollView, StatusBar, SafeAreaView, Platform, TouchableHighlight, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

function Home({ navigation }) {
    const [textValue, setTextValue] = useState("");
    const [desc, setDesc] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    // Get Data of logged in user from database
    const getData = async () => {
        const email = await AsyncStorage.getItem("email");
        // Here use the ngrok for create the URL for connecting backend to frontend
        axios.get(`https://20b8-2401-4900-1703-d93f-4c23-414b-b0f1-a133.ngrok-free.app/notes/${email}`).then((response) => {
            setData(response.data.data);
        }).catch((err) => console.log(err));
    }

    // Insert the data into database
    const handleInsert = async () => {
        const email = await AsyncStorage.getItem("email");
        if (textValue !== "") {
            if (desc !== "") {
                // Here use the ngrok for create the URL for connecting backend to frontend
                await axios.post("https://20b8-2401-4900-1703-d93f-4c23-414b-b0f1-a133.ngrok-free.app/notes", {
                    email: email,
                    title: textValue,
                    description: desc
                }).then((response) => {
                    Alert.alert("Task", response.data.message, [
                        { text: "OK" }
                    ]);

                    // Set the data into array which helps us to show the data one by one
                    if (data == null) {
                        setData([response.data.data]);
                    } else {
                        setData([...data, response.data.data]);
                    }

                    setTextValue("");
                    setDesc("");
                }).catch((err) => console.log(err));
            }
            else {
                Alert.alert("Empty Field", "Description Field is empty ", [
                    { text: "OK" }
                ])
            }
        }
        else {
            Alert.alert("Empty Field", "Title Field is empty ", [
                { text: "OK" }
            ])
        }
    };

    //Call API for Update the state in the array and database
    const handleComplete = async (id) => {
        const newData = data.map((input) => {
            if (input._id === id) {
                return { ...input, complete: true };
            }
            return input;
        });

        // Here use the ngrok for create the URL for connecting backend to frontend
        await axios.put("https://20b8-2401-4900-1703-d93f-4c23-414b-b0f1-a133.ngrok-free.app/notes", {
            id: id,
        }).then((response) => {
            Alert.alert("Task", response.data.message, [
                { text: "OK" }
            ]);
            setData(newData);
        }).catch((err) => console.log(err));

    };

    // Call API for deleting task from database
    const handleDelete = async (id) => {
        const newData = data.filter((input) => input._id !== id);
        // Here use the ngrok for create the URL for connecting backend to frontend
        await axios.delete(`https://20b8-2401-4900-1703-d93f-4c23-414b-b0f1-a133.ngrok-free.app/notes/del/${id}`).then((response) => {
            Alert.alert("Note", response.data.message, [
                { text: "OK" }
            ]);
            setData(newData);
        }).catch((err) => console.log(err));
    };

    const handleLogout = async () => {
        // Remove the Token from storage and Navigate to Login Page
        await AsyncStorage.removeItem("AccessToken");
        navigation.replace("Login");
    }

    return (
        <>
            <SafeAreaView style={styles.header}>

                {/* Gradient */}
                <LinearGradient colors={['#5A636A', '#AFB3B7', '#69818D']}
                    style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, position: 'absolute' }}
                >
                </LinearGradient>

                {/* LogOut Button  */}
                <View style={{ width: 100, position: 'absolute', right: 0 }}>
                    <TouchableHighlight>
                        <Button title="Logout" color={"black"} onPress={handleLogout} />
                    </TouchableHighlight>
                </View>

                {/* Notes Showing Structure  */}
                <View style={{ marginBottom: 150, marginTop: 10 }}>
                    <ScrollView>
                        {data == null || data.length == 0 ? <View style={{ width: 200, height: 200 }}>
                            <Text>No Notes</Text>
                        </View> : <View>
                            {/* Map function for Uncompleted task  */}
                            {data.map((input, key) => {

                                // If condition starts 
                                if (!input.complete) {
                                    return (
                                        <View key={key} style={styles.noteTextArea}>

                                            <Text style={{ color: "white" }}>{input.title}</Text>
                                            <Text style={{ color: "grey" }}>{input.description}</Text>
                                            <View style={styles.noteButtons}>

                                                {!input.complete ?

                                                    <TouchableHighlight onPress={() => handleComplete(input._id)}>
                                                        <Icon name="done" color="white" size={20} style={{ marginHorizontal: 10 }} />
                                                    </TouchableHighlight>
                                                    :
                                                    <Text style={{ color: "white", marginHorizontal: 10 }}>Complete</Text>
                                                }

                                                <TouchableHighlight onPress={() => handleDelete(input._id)}>
                                                    <Icon name="delete" color="white" size={20} />
                                                </TouchableHighlight>

                                            </View>

                                        </View>
                                    );
                                } // End if condition
                            })}
                            {/* End Map function  */}

                            {/* Map function for Completed task  */}
                            {data.map((input, key) => {
                                // If condition starts
                                if (input.complete) {
                                    return (
                                        <View key={key} style={styles.noteTextArea}>

                                            <Text style={{ color: "white" }}>{input.title}</Text>
                                            <Text style={{ color: "grey" }}>{input.description}</Text>
                                            <View style={styles.noteButtons}>

                                                {!input.complete ?

                                                    <TouchableHighlight onPress={() => handleComplete(input._id)}>
                                                        <Icon name="done" color="white" size={20} style={{ marginHorizontal: 10 }} />
                                                    </TouchableHighlight>
                                                    :
                                                    <Text style={{ color: "white", marginHorizontal: 10 }}>Complete</Text>
                                                }

                                                <TouchableHighlight onPress={() => handleDelete(input._id)}>
                                                    <Icon name="delete" color="white" size={20} />
                                                </TouchableHighlight>

                                            </View>

                                        </View>
                                    );
                                } // End if condition
                            })}
                            {/* End Map function  */}
                        </View>
                        }
                    </ScrollView>
                </View>

                {/* Container where we can insert the data  */}
                <View style={styles.insert}>

                    <View style={styles.textareaContainer}>
                        <Text style={{ color: "white" }}>Title: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput value={textValue} onChangeText={(e) => setTextValue(e)} placeholder='Add Title' style={{ width: "1000px" }} />
                        </View>
                        <Text style={{ color: "white" }}>Description: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput value={desc} onChangeText={(e) => setDesc(e)} placeholder='Add Description' style={{ width: "1000px" }} />
                        </View>
                    </View>

                    {/* Button for inserting data  */}
                    <TouchableHighlight onPress={handleInsert}>
                        <View style={styles.iconContainer}>
                            <Icon name="add" color={"white"} size={30} />
                        </View>
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
        padding: Platform.OS == "android" ? StatusBar.currentHeight : 0
    },

    noteTextArea: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#2D4A53",
        width: "auto",
        height: "auto",
        elevation: 5,
        padding: 10
    },
    noteButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 5
    },

    insert: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get("screen").width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        // backgroundColor: "black",
    },
    textareaContainer: {
        height: 175,
        width: '75%',
        marginRight: 13
    },

    inputContainer: {
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
        elevation: 5,
        backgroundColor: "white",
        marginVertical: 5,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: "center"
    },

    iconContainer: {
        height: 50,
        width: 50,
        backgroundColor: "black",
        elevation: 5,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default Home;