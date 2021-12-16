import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'

import BransSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
    Container
} from './styles';


export function Splash() {
    const splashAnimation = useSharedValue(0);
    const navigation = useNavigation<any>();

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [0, 20, 40],
                [1, .5, 0],
                Extrapolate.CLAMP
            )
        }
    })

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [60, 80, 100],
                [0, .5, 1],
                Extrapolate.CLAMP
            )
        }
    })

    function startApp() {
        navigation.navigate('Home');
    }

    useEffect(() => {
        splashAnimation.value = withTiming(
            150,
            { duration: 1000 },
            () => {
                'worklet'
                runOnJS(startApp)();
            }
        )
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BransSvg width={80} height={80} />
            </Animated.View>
            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>


        </Container>
    );
}