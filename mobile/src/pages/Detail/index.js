import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá, ${incident.name}! Estou entrando em contato pos gostaria de ajudar no caso "${incident.title}"`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Image source={logoImg} style={styles.logoHeader} />

                    <TouchableOpacity onPress={navigateBack} >
                        <Feather name="arrow-left" size={28} color="#55B83E" />
                    </TouchableOpacity>
                </View>

                <View style={styles.incident} > 
                    <Text style={styles.incidentTitle} >{incident.title }</Text>
                            
                        <Text style={styles.incidentProperty} >Descrição:</Text>
                        <Text style={styles.incidentValue} >{incident.description }</Text>

                        <Text style={styles.incidentProperty} >ONG:</Text>
                        <Text style={styles.incidentValue} >{incident.name}</Text>

                        <Text style={styles.incidentProperty} >Inclusão:</Text>
                        <Text style={styles.incidentValue} >{incident.date ? (incident.date.slice(0, 10)).split('-').reverse().join('/') : '' }</Text>

                        <Text style={styles.incidentProperty} >Localização:</Text>
                        <Text style={styles.incidentValue} >{incident.city} / {incident.uf}</Text>

                    <Text style={styles.incidentProperty} >VALOR:</Text>
                    <Text style={styles.incidentValue} >
                        {Intl.NumberFormat(
                            'pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }
                        ).format(incident.value)}
                    </Text>
                </View>

                <View style={styles.contactBox} >
                    <Text style={styles.heroTitle} >Salve o dia!</Text>
                    <Text style={styles.heroTitle} >Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription} >Entre em contato:</Text>

                    <View style={styles.actions} >
                        <TouchableOpacity style={styles.action} onPress={sendWhatsApp} >
                            <Text style={styles.actionText} >WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail} >
                            <Text style={styles.actionText} >E-mail</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

export default Detail;