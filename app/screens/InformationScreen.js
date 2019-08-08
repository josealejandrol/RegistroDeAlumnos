import React,{Component} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default class InformationScreen extends Component {
    static navigationOptions = {
        header: null,    
    }
    
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>¡Bienvenido al registro de aspirantes al ITVH!</Text>
                <Image
                    source={require('../assets/itvh_logo.png')}
                    style={{width: '50%', height: 200}}
                />
                <TouchableOpacity 
                    style={styles.buton}
                    onPress={() => this.props.navigation.navigate('Swiper')}
                >
                    <Text style={styles.butonText}>Ir al registro</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'justify',
        color: 'green',
        marginHorizontal: 15,
        marginBottom: 30
    },
    buton: {
        backgroundColor: 'green',
        marginTop: 20,
        width: '60%',
        height: 50,
        borderRadius: 40,
        justifyContent: 'center'
    },
    butonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    }
})