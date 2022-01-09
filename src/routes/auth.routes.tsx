import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFristStep } from '../screens/SignUp/SignUpFristStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
            initialRouteName="Splash"
        >
            <Screen name="Splash" component={Splash} />
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUpFristStep" component={SignUpFristStep} />
            <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
            <Screen name="Confirmation" component={Confirmation} />
        </Navigator>
    )
}