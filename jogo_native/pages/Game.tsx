import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';

export type YourNavigationParamList = {
    History: undefined;
};

export const dados = [
    { id: 1, image: require('../assets/dado1.jpg') },
    { id: 2, image: require('../assets/dado2.jpg') },
    { id: 3, image: require('../assets/dado3.jpg') },
    { id: 4, image: require('../assets/dado4.jpg') },
    { id: 5, image: require('../assets/dado5.jpg') },
    { id: 6, image: require('../assets/dado6.jpg') },
];

const Game = () => {
    const [result, setResult] = useState<string | null>(null);
    const [point, setPoint] = useState<number | null>(null);
    const [dadoOne, setdadoOne] = useState<number>();
    const [dadoTwo, setdadoTwo] = useState<number>();
    const [matchHistory, setMatchHistory] = useState<{ date: string; won: boolean }[]>([]);
    const navigation = useNavigation<StackTypes>();

    useEffect(() => {
        loadMatchHistory()
            .then((history) => {
                setMatchHistory(history);
            })
            .catch((error) => {
                console.error('Erro ao carregar histórico:', error);
            });
    }, []);

    const playGame = () => {
        const playdadoOne = Math.floor(Math.random() * 6);
        const playdadoTwo = Math.floor(Math.random() * 6);

        const dadoOneValue = dados[playdadoOne].id;
        const dadoTwoValue = dados[playdadoTwo].id;

        setdadoOne(dadoOneValue);
        setdadoTwo(dadoTwoValue);

        const sumdados = dadoOneValue + dadoTwoValue;

        if (sumdados >= 7 && sumdados <= 11) {
            setPoint(sumdados);
            setResult(`Você ganhou! Sua pontuação total foi de ${sumdados}`);
        } else {
            setPoint(sumdados);
            setResult(`Você perdeu! Sua pontuação total foi de ${sumdados}`);
        }
    
        
        const newMatch = { date: new Date().toISOString(), won: sumdados >= 7 && sumdados <= 11 };
        const updatedHistory = [...matchHistory, newMatch];
        setMatchHistory(updatedHistory);
        saveMatchHistory(updatedHistory);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, marginBottom: 10, marginTop: 30 }}>Jogo de Dados</Text>

                    {dadoOne && dadoTwo && (
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Image
                                source={dados.find((dado) => dado.id === dadoOne)?.image}
                                style={{ width: 100, height: 100, marginRight: 20 }}
                            />
                            <Image
                                source={dados.find((dado) => dado.id === dadoTwo)?.image}
                                style={{ width: 100, height: 100, marginRight: 20 }}
                            />
                        </View>
                    )}
                    <TouchableOpacity onPress={playGame} style={{ padding: 10, backgroundColor: 'pink', borderRadius: 5, marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>Jogar</Text>
                    </TouchableOpacity>

                    {result && (
                        <Text style={{ fontSize: 18, marginTop: 15 }}>{result}</Text>
                    )}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('History')}
                        style={{ padding: 10, backgroundColor: 'pink', borderRadius: 5, marginTop: 20 }}
                    >
                        <Text style={{ color: 'black', fontSize: 18 }}>Ver Histórico</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Game;