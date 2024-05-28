// Maps.js
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function Maps({data, currentlyDarkmode}) {
    //init variables
    const [location, setLocation] = useState(null);

    useEffect(() => {
        //request permission to access location
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission error')
                return;
            }

            //get users current location
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    //render bookstore markers
    const renderMarkers = () => {
        return data.map((store, index) => (
            <Marker
                key={index}
                coordinate={{
                    latitude: store.latitude,
                    longitude: store.longitude,
                }}
                title={store.title}
                description={store.address}
            />
        ));
    };

    //styling
    const styles = StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
    });


    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Current Location"
                        description="You are here."
                    />
                    {renderMarkers()}
                </MapView>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};
