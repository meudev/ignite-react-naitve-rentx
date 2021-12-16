import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StatusBar, useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

type Props = NativeStackScreenProps<any,'SchedulingComplete'>;

export function SchedulingComplete({navigation}:Props) {
    const { width } = useWindowDimensions();

    function handleConfirm() {
        navigation.navigate('Home');
    };
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro Alugado!</Title>

                <Message>
                    Agora você só precisa ir {"\n"}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu autómovel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleConfirm}/>
            </Footer>

        </Container>
    );
}