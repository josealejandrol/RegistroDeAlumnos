import React,{Component} from 'react';
import {View, Text, FlatList,ActivityIndicator, StyleSheet, TouchableOpacity, Alert} from 'react-native';

export default class AspirantesRegScreen extends Component {
    static navigationOptions = {
        title: 'Aspirantes Registrados',
        headerStyle: {
            backgroundColor: 'green',
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
              }
          },
        //header: null,
    }
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount(){
        return fetch('http://18.217.144.26:3000/api/Aspirantes',{
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function(){

                });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    deleteItem(idRemove) {
        fetch(`http://18.217.144.26:3000/api/Aspirantes/${idRemove}`,
        {
            method: 'DELETE'
        }).then(() => {
            Alert.alert("Aspirante eliminado con éxito");
            this.props.navigation.goBack();
        }).catch(err => {
            Alert.alert("Error al borrar",err)
        })
        
    }

    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex:1, padding: 20}}>
                    <ActivityIndicator />
                    {/* <Text>{this.state.dataSource}</Text> */}
                </View>
            )
        }
        return (
            
                <FlatList 
                    data={this.state.dataSource}
                    renderItem={({item}) => 
                    <View style={styles.container}>
                    <TouchableOpacity style={styles.touchable} onPress={() => Alert.alert(
                        'Opciones',
                        `Seleccione una opción para el id: ${item.id}`,
                        
                        [
                            {text: 'Eliminar', onPress: () => {this.deleteItem(item.id)}},
                            {
                            text: 'Modificar',
                            onPress: () => {this.props.navigation.navigate("Update",{idUpdate: item.id})},
                            style: 'cancel',
                            },
                            {text: 'Cancelar', 
                            onPress: () => console.log('Cancel Pressed')},
                        ],
                        {cancelable: false},
                    )}>
                        <View style={styles.card}>
                        <Text style={styles.text}>Id: {item.id}.</Text>
                            <Text style={styles.text}>Nombre: {item.Nombre}.</Text>
                            <Text style={styles.text}>Apellido: {item.Apellido}.</Text>
                            <Text style={styles.text}>CURP: {item.Curp}</Text>
                            <Text style={styles.text}>Teléfono: {item.Telefono}</Text>
                            {/* <Text>------------------------------------------------------------------------</Text> */}  
                        </View>
                    </TouchableOpacity>
                    </View>
                    }
                    keyExtractor = { (item, index) => index.toString() }

                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },  
    card: {
        // height: '20%',
        
    },
    text: {
        textAlign: 'center'
    },
    touchable: {
        width: '90%',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#BDBDBD',
        borderRadius: 15,
        borderColor: 'green',
        borderWidth: 2
    }
})