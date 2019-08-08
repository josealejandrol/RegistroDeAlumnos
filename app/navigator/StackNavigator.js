import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/InformationScreen';
import SwiperScreen from '../screens/SwiperScreen';
import FormScreen from '../screens/FormScreen';
import Modal from '../screens/ModalExample';
import Registro from '../screens/AspirantesRegScreen';
import Update from '../screens/UpdateScreen';

const AppNavigator = createStackNavigator({
        Home: HomeScreen,
        Swiper: SwiperScreen,
        Form: FormScreen,
        Modal: Modal,
        Registro: Registro,
        Update
},{
    initialRouteName: "Home"
})

export default createAppContainer(AppNavigator);