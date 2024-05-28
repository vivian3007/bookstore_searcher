import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Details({ route, currentlyDarkmode }) {
    //get params
    const { item } = route.params;

    //styling
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: currentlyDarkmode ? '#333' : '#FFF',
            padding: 20,
            justifyContent: 'center',
            width: '100%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            borderRadius: 8,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: currentlyDarkmode ? '#FFF' : '#333',
        },
        description: {
            fontSize: 18,
            textAlign: 'center',
            color: currentlyDarkmode ? '#FFF' : '#333',
        },
    });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
}

