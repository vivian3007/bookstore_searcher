import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Bookstores from "./Bookstores";
import Details from "./Details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import Favorites from "./Favorites";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    //define variables
  const [data, setData] = useState(null);
  const [favoritesArray, setFavoritesArray] = useState([]);
  const [favoritesOnChange, setFavoritesOnChange] = useState(false);

  //make sure the fetchdata only happens once
  useEffect(() => {
    fetchData();
  }, []);

    //fetch the data from json file
    async function fetchData() {
        try{
            const result = await fetch('https://stud.hosted.hr.nl/1022620/bookstores.json');
            const bookstoreData = await result.json();
            setData(bookstoreData);
        } catch(e){
            console.log('error', e);
        }
    }

    const getAsyncStorageItems = async () => {
        try{
            const storageKeys = await AsyncStorage.getAllKeys();
            const storageItems = await AsyncStorage.multiGet(storageKeys);
            const updatedFavorites = storageItems.map(([index, item]) => JSON.parse(item));

            if(storageKeys.length === 0){
                setFavoritesArray([]);
            } else{
                setFavoritesArray(updatedFavorites);
            }

        }catch{
            console.log('kan items niet ophalen uit AsyncStorage')
        }
    }

  return (
      <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="tabBookstores">
                {(props) => (
                    <Stack.Navigator>
                        <Stack.Screen name="Bookstorelist">
                            {(props) => (
                                <View style={styles.container}>
                                    <Text>List of bookstores</Text>
                                    <Bookstores
                                        {...props}
                                        data={data}
                                        getAsyncStorageItems={getAsyncStorageItems}
                                        setFavoritesOnChange={setFavoritesOnChange}
                                    />
                                    <StatusBar style="auto" />
                                </View>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Details">
                            {(props) => (
                                <View style={styles.container}>
                                    <Details {...props} data={data} />
                                    <StatusBar style="auto" />
                                </View>
                            )}
                        </Stack.Screen>
                    </Stack.Navigator>
                )}
            </Tab.Screen>
              <Tab.Screen name="tabFavorites">
                  {(props) => (
                      <Favorites
                          {...props}
                          setFavoritesOnChange={favoritesOnChange}
                          favoritesArray={favoritesArray}
                          getAsyncStorageItems={getAsyncStorageItems}
                      />
                      )}
              </Tab.Screen>
          </Tab.Navigator>


      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});