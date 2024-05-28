import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Bookstores from "./Bookstores";
import Details from "./Details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Favorites from "./Favorites";
import Maps from "./Maps";
import Settings from "./Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    const [data, setData] = useState(null);
    const [favoritesArray, setFavoritesArray] = useState([]);
    const [favoritesOnChange, setFavoritesOnChange] = useState(false);
    const [currentlyDarkmode, setCurrentlyDarkmode] = useState(false);

    //fetch data once at the start
    useEffect(() => {
        fetchData();
    }, []);

    //fetch bookstore data
    async function fetchData() {
        try {
            const result = await fetch('https://stud.hosted.hr.nl/1022620/bookstores.json');
            const bookstoreData = await result.json();
            setData(bookstoreData);
        } catch (e) {
            console.log('error', e);
        }
    }

    //set darkmode useState
    const darkmode = () => {
        setCurrentlyDarkmode(!currentlyDarkmode);
    };

    //get items from asyncStorage
    const getAsyncStorageItems = async () => {
        try {
            const storageKeys = await AsyncStorage.getAllKeys();
            const storageItems = await AsyncStorage.multiGet(storageKeys);
            const updatedFavorites = storageItems.map(([index, item]) => JSON.parse(item));

            //put all favorites in an array if there are any
            if (storageKeys.length === 0) {
                setFavoritesArray([]);
            } else {
                setFavoritesArray(updatedFavorites);
            }
        } catch {
            console.log('Kan items niet ophalen uit AsyncStorage');
        }
    };

    //styling
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: currentlyDarkmode ? '#333' : '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
        },
        screen: {
            backgroundColor: currentlyDarkmode ? '#000' : '#FFF',
            color: currentlyDarkmode ? '#FFF' : '#333',
        },
    });

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Bookstores') {
                            iconName = focused ? 'book' : 'book-outline';
                        } else if (route.name === 'Favorites') {
                            iconName = focused ? 'heart' : 'heart-outline';
                        } else if (route.name === 'Maps') {
                            iconName = focused ? 'map' : 'map-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: currentlyDarkmode ? '#FFF' : '#000',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        backgroundColor: currentlyDarkmode ? '#000' : '#FFF',
                    },
                    headerStyle: {
                        backgroundColor: currentlyDarkmode ? '#000' : '#FFF',
                    },
                    headerTitleStyle: {
                        color: currentlyDarkmode ? '#FFF' : '#000',
                    },
                })}
            >
                <Tab.Screen name="Bookstores">
                    {(props) => (
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Listview"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => (
                                    <View style={styles.container}>
                                        <Bookstores
                                            {...props}
                                            data={data}
                                            getAsyncStorageItems={getAsyncStorageItems}
                                            setFavoritesOnChange={setFavoritesOnChange}
                                            favoritesOnChange={favoritesOnChange}
                                            currentlyDarkmode={currentlyDarkmode}
                                        />
                                        <StatusBar style="auto" />
                                    </View>
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Details"
                                options={{
                                    headerStyle: {
                                        backgroundColor: currentlyDarkmode ? '#000' : '#FFF',
                                    },
                                    headerTitleStyle: {
                                        color: currentlyDarkmode ? '#FFF' : '#000',
                                    },
                                }}
                            >
                                {(props) => (
                                    <View style={styles.container}>
                                        <Details {...props} data={data} currentlyDarkmode={currentlyDarkmode} />
                                        <StatusBar style="auto" />
                                    </View>
                                )}
                            </Stack.Screen>
                        </Stack.Navigator>
                    )}
                </Tab.Screen>
                <Tab.Screen name="Favorites">
                    {(props) => (
                        <View style={styles.container}>
                            <Favorites
                                {...props}
                                setFavoritesOnChange={setFavoritesOnChange}
                                favoritesArray={favoritesArray}
                                getAsyncStorageItems={getAsyncStorageItems}
                                currentlyDarkmode={currentlyDarkmode}
                            />
                        </View>
                    )}
                </Tab.Screen>
                <Tab.Screen name="Maps">
                    {(props) => (
                        <Maps
                            {...props}
                            data={data}
                            currentlyDarkmode={currentlyDarkmode}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                    {(props) => (
                        <Settings
                            {...props}
                            darkmode={darkmode}
                            currentlyDarkmode={currentlyDarkmode}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
