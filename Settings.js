import {View, Text, StyleSheet, Pressable} from 'react-native';

export default function Settings({ darkmode, currentlyDarkmode }) {
    //styling
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: currentlyDarkmode ? '#333' : '#FFF',
            padding: 20,
            justifyContent: 'center',
            alignContent: 'start',
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
            <Text style={styles.title}>Dark mode</Text>
            <Pressable onPress={darkmode} style={styles.button}>
                <Text style={styles.buttonText}>
                    {currentlyDarkmode ? 'Off' : 'On'}
                </Text>
            </Pressable>
        </View>
    );
}
