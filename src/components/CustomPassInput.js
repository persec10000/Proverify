import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    TextInput,
    Image,
    Platform,
    Alert
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class CustomPassInput extends Component {
    render() {
        const { inputWrapperStyle, inputStyle} = this.props;
        return (
            <View style={[styles.textInputWrapper, inputWrapperStyle ]}>
                <TextInput 
                    style={[styles.textInput, inputStyle]}
                    {...this.props}
                />
                <MaterialIcons 
                    style={styles.icon}
                    name={'visibility-off'}
                    size={30}
                    onPress={this.props.iconPress}
                />   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputWrapper: {
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 15,
        marginHorizontal: 22,
        overflow: 'hidden'
    },
    textInput: {
        fontSize: 16,
        paddingHorizontal: 18,
        paddingVertical: 14,
        padding: Platform.select({
            android: 0
        }),
        color: '#000',
        fontWeight: '400',
        fontFamily: 'Raleway-Regular'
    },
    icon: {
        position: 'absolute',
        top: 12,
        right: 10
    },
})
