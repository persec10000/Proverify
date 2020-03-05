import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Alert,
    AlertIOS,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../../components/CustomTextInput';
import _ from 'lodash';
import GradientButton from '../../components/GradientButton';
import CustomPassInput from '../../components/CustomPassInput';
import { usersService } from '../../services/UsersService';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-community/async-storage'

let self = null;
class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            password: '',
            isLoggingIn: false,
            isChecked: false,
            showpassword: true
        }
        self = this;
    }
      
    login = () => {
        const {id, password} = this.state;
        if(_.isEmpty(id) || _.isEmpty(password)) {
            Alert.alert(__APP_NAME__, 'The username and password fields are empty!');
            return;
        }
        this.setState({ isLoggingIn: true });
        let params  = {
            username: this.state.id,
            userid: '',
            password: this.state.password
        };
        usersService.signin(params, async function (res) { 
            if(res.result != null) {
                AsyncStorage.setItem("user", JSON.stringify(res.result));
                Platform.select({
                    ios: ()=>{AlertIOS.alert("Login Successfully");},
                    android: ()=>{ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);}
                })();
                setTimeout(() => {
                    self.props.navigation.navigate('Dashboard');
                }, 600 );
            }
            else {
                self.setState({ isLoggingIn: false })
                Platform.select({
                    ios: ()=>{AlertIOS.alert("Wrong username or Password, please try again");},
                    android: ()=>{ToastAndroid.show("Wrong username or Password, please try again", ToastAndroid.SHORT);}
                })();
            }
          }, function (error) {
            console.log(error);
        });
    }

    forgot = () => {
        this.props.navigation.navigate('Forgot')
    }

    onChangeId = (text) => {
        this.setState({ id: text })
    }

    onChangePassword = (text) => {
        this.setState({ password: text })
    }

    changePwdType = () => {
        this.setState( state => ({showpassword: !state.showpassword}));
    }

    async componentDidMount(){
        let remembername = await AsyncStorage.getItem('username');
        let rememberpass = await AsyncStorage.getItem('password');
        if (typeof(remembername) !== undefined && typeof(rememberpass) !== undefined){
            this.setState({
                id: remembername,
                password: rememberpass
            })
        }
    }
    render(){
        const {id, password, isLoggingIn, isChecked} = this.state;
        
        return (
            <KeyboardAwareScrollView 
                style={styles.container}>
                <Image 
                    source={require('../../resources/images/appLogo.png')} 
                    style={styles.appLogo}/>
                <View style={styles.mainLoginContainer}>
                    <CustomTextInput 
                        placeholder="Username"
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 17
                        }}
                        value={id}
                        onChangeText={this.onChangeId}
                    />
                    <CustomPassInput 
                        inputWrapperStyle={{
                            marginBottom: 17
                        }}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#707070"
                        secureTextEntry={this.state.showpassword}
                        onChangeText={this.onChangePassword}
                        iconPress={this.changePwdType}
                    />
                   <CheckBox
                        style={{flex: 1, marginHorizontal: 22, marginVertical: 5}}
                        onClick={()=>{
                        this.setState({
                            isChecked:!this.state.isChecked
                        }, 
                        ()=>{
                            if (this.state.isChecked){
                                AsyncStorage.setItem('username', id);
                                AsyncStorage.setItem('password', password);
                            }
                            else {
                                AsyncStorage.removeItem('username');
                                AsyncStorage.removeItem('password');
                            }
                        })
                        }}
                        isChecked={this.state.isChecked}
                        rightText={"Remember me"}
                    />
                    <TouchableOpacity
                        onPress={this.forgot} 
                        style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={styles.actionContainer}>
                        {isLoggingIn ?
                            <View style={styles.gradientBtnWrapper}>
                                <View style={styles.loginBtn}>
                                    <LinearGradient colors={['#E8222B', '#141414']} style={styles.loginBtnBackground}>
                                        <ActivityIndicator color='#fff'/>
                                    </LinearGradient>
                                </View>
                            </View>
                            :
                            <GradientButton
                                label="Login"
                                _onPress={this.login}
                            />
                        }
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appLogo: {
        alignSelf: 'center',
        marginTop: 100,
        marginBottom: 50
    },
    mainLoginContainer: {
        flex: 1
    },
    forgotPasswordContainer: {
        paddingHorizontal: 110,
        alignItems: 'center'
    },
    forgotPasswordText: {
        fontSize: 16,
        letterSpacing: 0,
        color: '#707070',
        textDecorationLine: 'underline'
    },
    actionContainer: {
        marginTop: 32,
        alignItems: 'center'
    },
    gradientBtnWrapper: {
        alignItems: 'center',
        marginTop: 10
    },
    loginBtn: {
        width: 280,
        height: 56,
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
    createAccountBtn: {
        marginTop: 10,
        width: 265,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#888888',
    },
    createAccountText: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 0
    },
    signInWith: {
        alignItems: 'center',
        marginTop: 38
    },
    signInWithText: {
        color: '#707070',
        fontSize: 16
    },
    signInOptionContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInOption: {
        marginHorizontal: 2.5
    }
})

export default LoginScreen