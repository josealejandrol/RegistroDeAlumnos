import React,{Component} from 'react';
import { View, TextInput, Text, Image, TouchableOpacity,StyleSheet, Alert, ScrollView } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';

function Success(){
    return(
        Alert.alert(`Usuario registrado con éxito.`)
    )
}

export default class FormScreen extends Component {
    static navigationOptions = {
        title: 'Registro de aspirantes',
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

    async onRegisterPressed() {
        try {
            let response = await fetch('http://18.217.144.26:3000/api/Aspirantes',{
                method: 'POST',
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
                this.props.navigation.navigate('Registro')
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
                <Text>Bienvenido: {this.state.Nombre}</Text>
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
                        value={this.state.Num}
                    />
                    <TextInput
                        style={styles.textInputChico}
                        keyboardType={'number-pad'}
                        placeholder={'Ingrese Código Postal'}
                        maxLength={5}
                        onChangeText={(text) => this.setState({CP: text})}
                        value={this.state.CP}
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
                    value={this.state.Telefono}
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
                    onPress={() => this.onRegisterPressed()}
                >
                    <Text style={styles.butonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buton}
                    onPress={() => this.props.navigation.navigate('Registro')}
                >
                    <Text style={styles.butonText}>Registros</Text>
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