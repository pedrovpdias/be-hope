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

    title: {
        fontSize: 30,
        marginBottom: 15,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    incidentList: {
        marginTop: 32
    },

    incident: {
        padding: 24,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginBottom: 16
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

    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#55B83E',
        padding: 20
    },

    detailsButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold'
    }

});