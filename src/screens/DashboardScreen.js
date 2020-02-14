import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform, ToastAndroid,FlatList,ScrollView} from 'react-native';
import GradientHeader from '../components/GradientHeader';
import GradientButton from '../components/GradientButton';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { menuService } from '../services/MenuService';
import { usersService } from '../services/UsersService'
import ModalDropdown from 'react-native-modal-dropdown';
import { SlideAnimation } from 'react-native-popup-dialog';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let self = null;
const MenuItem = props => {
  const { MenuId, MenuName, Flag } = props.item
  return(
      <GradientButton
        label={MenuName}
        _onPress={()=>
          MenuName == "MY REQUEST"?
          props.myRequest(MenuId)
          :
          MenuName == "VERIFICATION"?
            props.verification(MenuId):null
        }
      />
  )
}

export default class DashboardScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitleStyle: { color: '#fff'},
      headerStyle: {
          backgroundColor: 'transparent',
      },
      headerTitleAlign: 'center',
      header: (props) => <GradientHeader {...props} />,
      headerTitle: (
        <View style={{width: '100%'}}>
          <Text style={styles.headerTitle}>
              Dashboard
          </Text>
        </View>
      )       
    }
}

  constructor(props){
    super(props);
    this.state={
      data: [],
      options: [],
      ClientId: '',
      clientIdArray: [],
    }
    self = this;
  }

  myRequest = async(MenuId) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    let {ClientId} = this.state;
    if(_.isEmpty(ClientId)) {
      Alert.alert(__APP_NAME__, 'Please Choose Client Name!');
      return;
    }
    this.props.navigation.navigate('MyRequest', {MenuId: MenuId, UserId: user.UserId, RoleId: user.RoleID, ClientId: ClientId});
  }

  verification = async(MenuId) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    let {ClientId} = this.state;
    if(_.isEmpty(ClientId)) {
      Alert.alert(__APP_NAME__, 'Please Choose Client Name!');
      return;
    }
    this.props.navigation.navigate('Verification', {MenuId: MenuId, UserId: user.UserId, RoleId: user.RoleID, ClientId: ClientId});
  }

  _renderItem = ({item}) => {
    return <MenuItem item={item} myRequest={this.myRequest} verification={this.verification} navigation={this.props.navigation}/>
  }

  _keyExtractor = (item, index) => { return index.toString() }

  _dropdown = (index, value) => {
    this.setState({ClientId: this.state.clientIdArray[index]})
  }

  
  componentDidMount = async() => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    let params = {
      MenuId: 0,
      UserId: user.UserId,
      ClientId: user.ClientId,
      RoleId: user.RoleID,
      Mode: 1
    }
    menuService.getMenuItem(params, async function (res) { 
      if(res.result != null) {
        self.setState({data: res.result});
      }
      else {
        Platform.select({
          ios: ()=>{AlertIOS.alert("No record");},
          android: ()=>{ToastAndroid.show("No record", ToastAndroid.SHORT);}
        })();
      }
    }, function (error) {
      console.log(error);
    });
    usersService.getClient(params, async function (res) {
      if(res.result != null) {
        res.result.map((result, key) => {
          const options = {...self.state.options};
          const clientIdArray = {...self.state.clientIdArray};
          options[key] = result.ClientName;
          clientIdArray[key] = result.ClientID;
          self.setState({options, clientIdArray});
        })
        
      }
    }, function (error){
      Platform.select({
        ios: ()=>{AlertIOS.alert(error);},
        android: ()=>{ToastAndroid.show(error, ToastAndroid.SHORT);}
      })();
    })
  }
  
  render(){
    const {data, options,ClientId} = this.state;
    
    return(
      <ScrollView>
        <View style={styles.container}>
          <ModalDropdown 
            ref="dropdown_2"
            style={styles.dropdown_2}
            textStyle={styles.dropdown_2_text}
            dropdownStyle={styles.dropdown_2_dropdown}
            options={options}
            onSelect={(index, value) => this._dropdown(index, value)}
          />
          <FlatList 
            data={data}
            renderItem={this._renderItem}
            // contentContainerStyle = {{flexGrow: 1,justifyContent:'center',}}
            keyExtractor={this._keyExtractor}
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
          />
        </View>
      </ScrollView>
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
      justifyContent: "center"
  },
  gradientButton: {
      height: 40,
      borderRadius: 15,
      overflow: 'hidden'
  },
  gradienButtonBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
  },
  gradienButtonLabel: {
      fontSize: 16,
      color: '#fff',
      letterSpacing: 0
  },
  dropdown_2: {
    alignSelf: 'center',
    width: "70%",
    marginTop: 100,
    marginBottom: 50,
    // right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: '#E8222B',
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: "70%",
    height: 300,
    borderColor: '#E8222B',
    borderWidth: 2,
    borderRadius: 3,
  }
})
