import React,{Component} from 'react';
import { View, TextInput, Text, Image, TouchableOpacity,StyleSheet, Alert, ScrollView } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';

function Success(){
    return(
        Alert.alert(`Registro actualizado con éxito.`)
    )
}

export default class UpdateScreen extends Component {
    static navigationOptions = {
        title: 'Actualizar aspirante',
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
                id: this.props.navigation.state.params.idUpdate,
                Nombre: '',
                Apellido: '',
                Calle: '',
                Num: '',
                Colonia: '',
                Ciudad: '',
                CP: '',
                Curp: '',
                Telefono: '',
                Correo: '',
                EscuelaProcedencia:''
        }
    }

    componentDidMount(){
        this.getItem(this.state.id)
    }

    getItem(idtoUpdate) {
        return fetch(`http://18.217.144.26:3000/api/Aspirantes/${idtoUpdate}`,
        {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                Nombre: responseJson.Nombre,
                Apellido: responseJson.Apellido,
                Calle: responseJson.Calle,
                Num: responseJson.Num,
                CP: responseJson.CP,
                Colonia: responseJson.Colonia,
                Ciudad: responseJson.Ciudad,
                Curp: responseJson.Curp,
                Telefono: responseJson.Telefono,
                Correo: responseJson.Correo,
                EscuelaProcedencia: responseJson.EscuelaProcedencia
                
            })
            console.log("Data: ",responseJson)
            console.log("Telefono::::",response.Telefono)
        }).catch(err => {
            Alert.Alert("Error al borrar",err)
        })
        
    }

    async onUpdatePressed() {
        try {
            const idwillUpdate = this.state.id;
            let response = await fetch(`http://18.217.144.26:3000/api/Aspirantes/${idwillUpdate}`,{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    Nombre: this.state.Nombre,
                    Apellido: this.state.Apellido,
                    Calle: this.state.Calle,
                    Num: this.state.Num,
                    Colonia: this.state.Colonia,
                    Ciudad: this.state.Ciudad,
                    CP: this.state.CP,
                    Curp: this.state.Curp,
                    Telefono: this.state.Telefono,
                    Correo: this.state.Correo,
                    EscuelaProcedencia: this.state.EscuelaProcedencia
                })
            });
            let res = await response.text()
            if(response.status >= 200 && response.status < 300){
                console.log("res success is:" + res)
                Success();
                this.setState({
                    Usuario: '',
                    Nombre: '',
                    Apellido: '',
                    Calle: '',
                    Num: '',
                    Colonia: '',
                    Ciudad: '',
                    CP: '',
                    Curp: '',
                    Telefono: '',
                    Correo: '',
                    EscuelaProcedencia:''
                });
                this.props.navigation.navigate('Form')
            } else {
                let errors = res;
                throw errors;
            } 
        } catch (erros) {
            console.log("catch errors:" + erros)
            let formErrors = JSON.parse(errors);
            let errorsArray = [];
            for(let key in formErrors){
                if(formErrors[key].length > 1){
                    formErrors[key].map(error => errorsArray.push(`${key} ${error}`))
                } else {
                    errorsArray.push(`${key} ${formErrors[key]}`)
                }
            }
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text>Modificando el id: {this.state.id}</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Ingrese Nombre(s)'}
                    maxLength={25}
                    onChangeText={(text) => this.setState({Nombre: text, Usuario: text})}
                    value={this.state.Nombre}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Ingrese Apellido(s)'}
                    maxLength={25}
                    onChangeText={(text) => this.setState({Apellido: text})}
                    value={this.state.Apellido}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Ingrese Calle'}
                    maxLength={25}
                    onChangeText={(text) => this.setState({Calle: text})}
                    value={this.state.Calle}
                />
                <View style={styles.wrap}>
                    <TextInput
                        style={styles.textInputChico}
                        keyboardType={'numeric'}
                        placeholder={'Ingrese Número'}
                        maxLength={4}
                        onChangeText={(text) => this.setState({Num: text})}
                        value={this.state.Num.toString()}
                    />
                    <TextInput
                        style={styles.textInputChico}
                        keyboardType={'number-pad'}
                        placeholder={'Ingrese Código Postal'}
                        maxLength={5}
                        onChangeText={(text) => this.setState({CP: text})}
                        value={this.state.CP.toString()}
                    />
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Ingrese Colonia'}
                    maxLength={25}
                    onChangeText={(text) => this.setState({Colonia: text})}
                    value={this.state.Colonia}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Ingrese Ciudad'}
                    maxLength={25}
                    onChangeText={(text) => this.setState({Ciudad: text})}
                    value={this.state.Ciudad}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Ingrese C.U.R.P.'}
                    maxLength={18}
                    autoCapitalize={'characters'}
                    onChangeText={(text) => this.setState({Curp: text})}
                    value={this.state.Curp}
                />
                <TextInput
                    style={styles.textInput}
                    maxLength={13}
                    keyboardType={'numeric'}
                    placeholder={'Ingrese Teléfono'}
                    onChangeText={(text) => this.setState({Telefono: text})}
                    value={this.state.Telefono.toString()}
                />
                <TextInput
                    style={styles.textInput}
                    maxLength={25}
                    keyboardType={'email-address'}
                    placeholder={'Ingrese Correo Electrónico'}
                    onChangeText={(text) => this.setState({Correo: text})}
                    value={this.state.Correo}
                />
                <TextInput
                    style={styles.textInput}
                    maxLength={25}
                    placeholder={'Ingrese Escuela de Procedencia'}
                    onChangeText={(text) => this.setState({EscuelaProcedencia: text})}
                    value={this.state.EscuelaProcedencia}
                />
                <TouchableOpacity
                    style={styles.buton}
                    onPress={() => this.onUpdatePressed()}
                >
                    <Text style={styles.butonText}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.butonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wrap:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    text: {

    },
    textInput: {
        height: 40,
        width: '80%',
        borderBottomColor: 'green',
        borderBottomWidth: 2
    },
    textInputChico: {
        height: 40,
        width: '35%',
        borderBottomColor: 'green',
        borderBottomWidth: 2,
        marginHorizontal: 18
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