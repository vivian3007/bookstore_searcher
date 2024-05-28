import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import BookstoreItem from "./BookstoreItem";

export default function Bookstores({ navigation, data, getAsyncStorageItems, setFavoritesOnChange, favoritesOnChange, currentlyDarkmode }) {
    //styling
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: currentlyDarkmode ? '#333' : '#FFF',
            width: '100%',
        },
        flatListContainer: {
            paddingHorizontal: 16,
            paddingVertical: 24,
        },
    });

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.flatListContainer}
                style={styles.container}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <BookstoreItem
                        item={item}
                        navigation={navigation}
                        getAsyncStorageItems={getAsyncStorageItems}
                        setFavoritesOnChange={setFavoritesOnChange}
                        favoritesOnChange={favoritesOnChange}
                        currentlyDarkmode={currentlyDarkmode}
                    />
                }
                showsVerticalScrollIndicator={true}
            />
        </View>
    );
}
