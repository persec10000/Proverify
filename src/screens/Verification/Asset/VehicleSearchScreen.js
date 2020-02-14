import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import GradientHeader from '../../../components/GradientHeader';
import CustomTextInput from '../../Auth/CustomTextInput';
import GradientButton from '../../../components/GradientButton';
import SafeAreaView from 'react-native-safe-area-view';
import {menuService} from '../../../services/MenuService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let self = null;
export default class VehicleSearchScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitleStyle: { color: '#fff' },
            headerStyle: {
                backgroundColor: 'transparent',
            },
            headerLeft: (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(null);
                }}
                style={styles.headerLeftBtn}>
                <Image
                  style={{tintColor: '#fff'}}
                  source={require('../../../resources/images/settings/caret-left.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (
              <View style={{paddingHorizontal:20}}></View>
            ),
            header: (props) => <GradientHeader {...props} />,
            headerTitle: (
                <View style={{width: '100%'}}>
                    <Text style={styles.headerTitle}>
                        VEHICLE RC SEARCH
                    </Text>
                </View>
            )
        }
    }
    constructor(props){
        super(props);
        this.state={
            registNumber: ''
        }
        self = this;
    }
    onChangeRegistNumber = (text) => {
        this.setState({registNumber: text});
    }

    back = () => {
        this.props.navigation.goBack(null);
    }
    submit = () => {
        
    }
    render() {
        const {registNumber} = this.state;
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <SafeAreaView style={styles.mainContainer}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textStyle}>
                            Client Name 
                        </Text>
                        <Text style={styles.textStyle1}>
                            * 
                        </Text>
                    </View>
                    <CustomTextInput 
                        placeholder="Enter Client Name..."
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        inputStyle={{
                            paddingVertical: 10,
                        }}
                        // value={votercard}
                        // onChangeText={this.onChangeVoterCard}
                    />
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textStyle}>
                            Case No 
                        </Text>
                        <Text style={styles.textStyle1}>
                            * 
                        </Text>
                    </View>
                    <CustomTextInput 
                        placeholder="Enter Case No..."
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        inputStyle={{
                            paddingVertical: 10,
                        }}
                        // value={votercard}
                        // onChangeText={this.onChangeVoterCard}
                    />
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textStyle}>
                            Registration Number 
                        </Text>
                        <Text style={styles.textStyle1}>
                            * 
                        </Text>
                    </View>
                    <CustomTextInput 
                        placeholder="Enter your registration number..."
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 5
                        }}
                        inputStyle={{
                            paddingVertical: 10,
                        }}
                        value={registNumber}
                        onChangeText={this.onChangeRegistNumber}
                    />
                    <View style={styles.actionContainer}>
                        <GradientButton
                            label="Back"
                            _onPress={this.back}
                        />              
                        <GradientButton
                            label="Submit"
                            _onPress={this.submit}
                        />  
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center'
    },
    headerLeftBtn: {
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
    },
    
    actionContainer: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 15
    },
    textStyle: {
        paddingLeft: 20,
        fontSize: 20,
        marginVertical: 10,
    },
    textStyle1: {
        fontSize: 20,
        marginVertical: 10,
        color: 'red',
        paddingLeft: 5
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 14,
        marginTop: 30
    },
})
