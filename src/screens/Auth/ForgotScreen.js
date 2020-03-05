import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import GradientButton from '../../components/GradientButton';
import CustomTextInput from '../../components/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ForgotScreen extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            header: null
        }
    };
    
    constructor(props) {
        super(props)
    
        this.state = {
            isChecked: false
        }
    }
    
    _onPressTerm = () => {
        this.setState(prevState => ({
            ...prevState,
            isChecked: !prevState.isChecked
        }))
    }
    back = () => {
        this.props.navigation.goBack(null);
    }
    render() {
        const { isChecked } = this.state;
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.appLogoContainer}>
                    <Image
                        source={require('../../resources/images/smallLogo.png')}
                        />
                </View>
                <View style={styles.registerForm}>
                    <Text style={styles.registerLabel}>Forgot Password</Text>
                    <CustomTextInput 
                        placeholder="Name"
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 17
                        }}
                    />
                    <CustomTextInput 
                        placeholder="Password"
                        placeholderTextColor="#707070"
                        secureTextEntry={true}
                        inputWrapperStyle={{
                            marginBottom: 17
                        }}
                    />
                    <CustomTextInput 
                        placeholder="Password confirm"
                        placeholderTextColor="#707070"
                        secureTextEntry={true}
                        inputWrapperStyle={{
                            marginBottom: 17
                        }}
                    />
                    <GradientButton
                        label="Back"
                        _onPress={this.back}
                    />
                    <GradientButton
                        label="Submit"
                        // _onPress={this._startMakingOrder}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appLogoContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    registerForm: {

    },
    registerLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#707070',
        marginVertical: 15,
        alignSelf: 'center',
        marginBottom: 20
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkedDot: {
        width: 19, 
        height: 19, 
        backgroundColor: '#E8222B', 
        borderRadius: 10
    },
    termText: {
        fontSize: 12,
        letterSpacing: 0,
        color: '#707070'
    },
    actionContainer: {
        marginVertical: 32,
        alignItems: 'center'
    },
    loginBtn: {
        width: 265,
        height: 60,
    },
    loginBtnBackground: {
        flex: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 20,
        color: '#fff',
        letterSpacing: 0
    },
})
