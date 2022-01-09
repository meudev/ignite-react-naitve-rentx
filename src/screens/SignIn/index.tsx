import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import theme from '../../styles/theme';
import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation<any>();
    const { signIn } = useAuth();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório.')
                    .email('Digite um e-mail válido.'),
                password: Yup.string()
                    .required('A senha é obrigatória.')
            });

            await schema.validate({ email, password });

            signIn({ email, password });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro na autenticação', 'Ocoreu um erro ao fazer o login, verifique as credenciais.');
            }
        }
    }

    function handleNewAccount() {
        navigation.navigate('SignUpFristStep');
    }

    return (
        <KeyboardAwareScrollView>
            <Container>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Header>
                    <Title>
                        Estamos{'\n'}quase lá.
                    </Title>
                    <SubTitle>
                        Faça seu login para começar{'\n'}
                        uma experiência incrível.
                    </SubTitle>
                </Header>

                <Form>
                    <Input
                        iconName="mail"
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <PasswordInput
                        iconName="lock"
                        placeholder='Password'
                        onChangeText={setPassword}
                        value={password}
                    />
                </Form>

                <Footer>
                    <Button
                        title="Login"
                        onPress={handleSignIn}
                        enabled={true}
                        loading={false}
                    />
                    <Button
                        title="Criar conta gratuita"
                        color={theme.colors.background_secondary}
                        light
                        onPress={handleNewAccount}
                        enabled={true}
                        loading={false}
                    />
                </Footer>

            </Container>
        </KeyboardAwareScrollView>
    );
}