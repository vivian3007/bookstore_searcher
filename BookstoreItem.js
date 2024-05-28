import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookstoreItem({ navigation, item, index, getAsyncStorageItems, setFavoritesOnChange, favoritesOnChange, currentlyDarkmode }) {
    //init variables
    const [currentlyFavorite, setCurrentlyFavorite] = useState(false);

    //add to favorites
    const addFavorites = async () => {
        try{
            await AsyncStorage.setItem(item.title, JSON.stringify(item));
            setCurrentlyFavorite(true);
            setFavoritesOnChange(true)
            getAsyncStorageItems();
        } catch{
            console.log('Kan item niet toevoegen aan favorites')
        }
    }

    //remove favorites
    const removeFavorites = async () => {
        try{
            await AsyncStorage.removeItem(item.title);
            setCurrentlyFavorite(false);
            setFavoritesOnChange(true)
            getAsyncStorageItems();
        } catch{
            console.log('Kan item niet verwijderen uit favorites');
        }
    }

    //check which items are favorite every time favorites change
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const favoriteItem = await AsyncStorage.getItem(item.title);
                setCurrentlyFavorite(favoriteItem !== null);
            } catch (error) {
                console.log('Error bij het check van de favorite status');
            }
        };

        checkFavoriteStatus();
    }, [favoritesOnChange]);

    //styling
    const styles = StyleSheet.create({
        container: {
            backgroundColor: currentlyDarkmode ? '#333' : '#FFF',
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
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
    });


    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Details', {item})}>
                <Text key={index} style={styles.itemTitle}>
                    {item.title}
                </Text>
                <Pressable onPress={() => navigation.navigate('Details', {item})} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Details
                    </Text>
                </Pressable>
                <Pressable onPress={currentlyFavorite ? removeFavorites : addFavorites} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {currentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    </Text>
                </Pressable>
            </Pressable>
        </View>
    );
}

