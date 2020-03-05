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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
        buttonsize={{width:310,height:56}}
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
    console.log("io==",options[0])
    return(
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style = {{marginVertical:80, marginHorizontal: 40, height:50, borderRadius:10, alignItems:'center',borderWidth: 1, borderColor:'red', flexDirection:'row'}} onPress={()=>this.dropdown.show()}>
            <ModalDropdown 
              ref={ref => {this.dropdown = ref}}
              style={styles.dropdown_2}
              textStyle={styles.dropdown_2_text}
              dropdownStyle={styles.dropdown_2_dropdown}
              dropdownTextStyle={styles.dropdown_text}
              defaultIndex={-1}
              defaultValue={options[0]}
              options={options}
              onSelect={(index, value) => this._dropdown(index, value)}
            />
            <MaterialIcons 
              style={styles.icon}
              name={'keyboard-arrow-down'}
              size={34}
              // onPress={this.props.iconPress}
            />  
          </TouchableOpacity>
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
    flex: 1
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 15,
    // textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_text: {
    fontSize: 16,
    color: '#000',
  },
  dropdown_2_dropdown: {
    width: '79%',
    // marginHorizontal: 20,
    height: 300,
    borderColor: '#E8222B',
    borderWidth: 1,
    borderRadius: 3,
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 6
},
})
