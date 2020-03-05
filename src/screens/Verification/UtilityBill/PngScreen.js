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
import CustomTextInput from '../../../components/CustomTextInput';
import GradientButton from '../../../components/GradientButton';
import SafeAreaView from 'react-native-safe-area-view';
import {menuService} from '../../../services/MenuService';

let self = null;
export default class PngScreen extends Component {
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
                        PNG
                    </Text>
                </View>
            )
        }
    }
    constructor(props){
        super(props);
        this.state={
            consumerID: '',
            BPnumber: ''
        }
        self = this;
    }
    onChangeConsumerID = (text) => {
        this.setState({consumerID: text});
    }
    onChangeBPnumber = (text) => {
        this.setState({BPnumber: text});
    }
    back = () => {
        this.props.navigation.goBack(null);
    }
    submit = () => {
        
    }
    render() {
        const {consumerID,BPnumber} = this.state;
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.mainContainer}>
                    <Text style={styles.textStyle}>
                        Consumer ID
                    </Text>
                    <CustomTextInput 
                        placeholder="Enter your consumer id..."
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 17
                        }}
                        inputStyle={{
                            paddingVertical: 10,
                        }}
                        value={consumerID}
                        onChangeText={this.onChangeConsumerID}
                    />
                    <Text style={styles.textStyle}>
                        BP Number
                    </Text>
                    <CustomTextInput 
                        placeholder="Enter your BP number..."
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 17
                        }}
                        inputStyle={{
                            paddingVertical: 10,
                        }}
                        value={BPnumber}
                        onChangeText={this.onChangeBPnumber}
                    />
                    <Text style={styles.textStyle}>
                        Service Provider
                    </Text>
                    <CustomTextInput 
                        placeholder="Select your service provider..."
                        placeholderTextColor="#707070"
                        inputWrapperStyle={{
                            marginBottom: 15
                        }}
                        inputStyle={{
                            paddingVertical: 10,
                        }}
                        // value={pancard}
                        onChangeText={this.onChangePanCard}
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
            </View>
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
        marginTop: 25,
        alignItems: 'center'
    },
    textStyle: {
        paddingHorizontal: 20,
        fontSize: 20,
        marginVertical: 15
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 14,
        marginTop: 50
    },
  
})
