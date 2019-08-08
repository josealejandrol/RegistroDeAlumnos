import React,{Component} from 'react';
import {Text, Image, View} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? 'rgba(5, 125, 1, 1)' : 'rgba(0, 0, 0, 0.3)';
    } else {
      backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

export default class Swiper extends React.Component {
    static navigationOptions = {
        header: null,    
    }

    render() {
        const { navigation } = this.props;
      return (
        <Onboarding
        DotComponent={Square}
        onSkip={() => this.props.navigation.navigate('Form')}
        onDone={() => this.props.navigation.navigate('Form')}
        nextLabel={'Siguiente'}
        skipLabel={'Saltar'}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/registro1.png')} />,
            title: 'Registráte',
            subtitle: 'Rellena los campos necesarios para poder empezar tu registro',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/registro2.png')} style={{width: 280, height: 200}}/>,
            title: 'Nuestro equipo',
            subtitle: 'Nuestro equipo se encargará de corroborar que todos tus datos esten correctos',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/registro3.jpg')} style={{width: 280, height: 200}} />,
            title: 'Comprueba la información',
            subtitle: 'Antes de terminar de realizar tu registro, comprueba que los datos esten correctos',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/registro4.jpg')} />,
            title: 'Te esperamos futuro Jaguar',
            subtitle: ':)',
          },
        ]}
      />

      );
    }
  }