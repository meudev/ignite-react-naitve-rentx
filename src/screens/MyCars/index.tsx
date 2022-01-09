import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Car as ModelCar } from '../../databases/model/Car';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import api from '../../services/api';

import {
    Container,
    Header,
    Title,
    SubTittle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { format } from 'date-fns/esm';
import { parseISO } from 'date-fns';

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState(true);
    const screenIsFocus = useIsFocused();

    const theme = useTheme();
    const navigation = useNavigation<any>();

    function handleBack() {
        navigation.goBack();
    };

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/rentals');
                const dataFormatted = response.data.map((data: DataProps) => {
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
                    }
                })
                setCars(dataFormatted);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, [screenIsFocus]);

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                />
                <Title>
                    Seus agendamentos,
                    estão aqui.
                </Title>
                <SubTittle>
                    Conforto, segurança e praticidade.
                </SubTittle>

            </Header>

            {loading ? <LoadAnimation /> :
            
                <Content>

                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWapper>
                        )}
                    />
                </Content>

            }
        </Container>
    );
}