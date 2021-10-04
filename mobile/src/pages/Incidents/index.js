import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import imgLogo from '../../assets/logo.png';

import styles from './styles';

function Incidents(){
    const [total, setTotal] = useState(0);
    const [incidents, setIncidents] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }
 
    async function loadIncidents(){
        if(loading) {
            return; 
        }

        if(total > 0 && incidents.length === total ){
            return;
        }

        setLoading(true);
        
        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']) ; 
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);
    
    return(
        <View style={styles.container} >
            <View style={styles.header} >
                <Image source={imgLogo} style={styles.logoHeader} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <FlatList
                data={incidents }
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident} >

                        <Text style={styles.incidentTitle} >{incident.title }</Text>
                        
                        <Text style={styles.incidentProperty} >Descrição:</Text>
                        <Text style={styles.incidentValue} >{incident.description }</Text>

                        <Text style={styles.incidentProperty} >ONG:</Text>
                        <Text style={styles.incidentValue} >{incident.name}</Text>

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

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText} >
                                Mais informações
                            </Text>
                            <Feather name="arrow-right" size={16} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                )}
            />       
        
        </View>
    );
}

export default Incidents;