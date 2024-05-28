import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favorites({navigation, route, setFavoritesOnChange, favoritesArray, getAsyncStorageItems, currentlyDarkmode}) {
    //fetch ayncStorage items once at the start
    useEffect(() => {
        getAsyncStorageItems();
    }, []);

    //remove item from favorites
    const removeFavorites = async (item) => {
        try {
            //remove from asyncStorage and get the new items
            await AsyncStorage.removeItem(item.title);
            setFavoritesOnChange(true)
            getAsyncStorageItems();
        } catch {
            console.log('Kan item niet verwijderen uit favorites');
        }
    }

    //styling
    const styles = StyleSheet.create({
        container: {
            backgroundColor: currentlyDarkmode ? '#333' : '#FFF',
            borderRadius: 8,
            padding: 16,
            marginTop: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3,
            width: '100%',
        },
        itemTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: currentlyDarkmode ? '#FFF' : '#333',
            textAlign: 'center'
        },
        button: {
            marginTop: 8,
            backgroundColor: currentlyDarkmode ? '#FFF' : '#333',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 6,
            alignItems: 'center',
        },
        buttonText: {
            color: currentlyDarkmode ? '#333' : '#FFF',
            fontSize: 16,
            fontWeight: 'bold',
        },
        itemDescription: {
            fontSize: 18,
            textAlign: 'center',
            color: currentlyDarkmode ? '#FFF' : '#333',
        },
    });

    return (
        <View>
            <FlatList
                data={favoritesArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View style={styles.container}>
                        <Pressable onPress={() => navigation.navigate('Details', {item})}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                        </Pressable>
                        <Pressable onPress={() => removeFavorites(item)} style={styles.button}>
                            <Text style={styles.buttonText}>Remove</Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
}


