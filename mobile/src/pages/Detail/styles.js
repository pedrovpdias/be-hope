import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },    

    logoHeader: {
        maxWidth: 100,
        maxHeight: 60
    },

    headerText: {
        fontSize: 15,
        color: '#737380',
    },

    headerTextBold: {
        fontWeight: 'bold'
    },

    incidentList: {
        marginTop: 32
    },

    incident: {
        padding: 24,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginTop: 20
    },    

    incidentTitle: {
        marginTop: 8,
        fontSize: 20,
        marginBottom: 24,
        color: '#000000',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    contactBox: {
        padding: 24,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginTop: 20
    },

    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30
    },

    heroDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16
    },

    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',  
    },

    action: {
        backgroundColor: '#55B83E',
        borderRadius: 3,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
});