import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import api from '../../../services/api';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SignUpSecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation<any>();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert('Atenção', 'Informe a senha e a confirmação.')
        }
        if (password != passwordConfirm) {
            return Alert.alert('Atenção', 'As senhas não são iguais.')
        }

        await api.post('/users', {
            name: user.name,
            driver_license: user.driverLicense,
            email: user.email,
            password,
        }).then(() => {
            navigation.navigate('Confirmation', {
                title: 'Conta Criada!',
                message: `Agora é só fazer login\ne aproveitar.`,
                nextScreenRoute: 'SignIn',
            })
        }).catch(() => {
            Alert.alert('Opa', 'Não foi possível cadastrar.');
        });

    };

    return (
        <KeyboardAwareScrollView>
            <Container>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Header>
                    <BackButton onPress={handleBack} />
                    <Steps>
                        <Bullet active />
                        <Bullet />
                    </Steps>
                </Header>

                <Title>
                    Crie sua{'\n'}
                    conta
                </Title>

                <SubTitle>
                    Faça seu cadastro de{'\n'}
                    forma rápida e fácil.
                </SubTitle>

                <Form>
                    <FormTitle>
                        2. Senha
                    </FormTitle>
                    <PasswordInput
                        iconName='lock'
                        placeholder='Senha'
                        onChangeText={setPassword}
                        value={password}
                    />
                    <PasswordInput
                        iconName='lock'
                        placeholder='Repetir Senha'
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
                    />
                </Form>
                <Button
                    color={theme.colors.success}
                    title="Cadastrar"
                    onPress={handleRegister}
                />

            </Container>
        </KeyboardAwareScrollView>
    );
}