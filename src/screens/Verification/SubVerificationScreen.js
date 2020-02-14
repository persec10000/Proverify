import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView} from 'react-native';
import GradientHeader from '../../components/GradientHeader';
import GradientButton from '../../components/GradientButton';
import {menuService} from '../../services/MenuService';

let self = null;
const SubVerificationItem = props => {
  const { MenuId, MenuName, Flag } = props.item
  return(
      <GradientButton
        label={MenuName}
        _onPress={()=>
          props.FinalVerification(MenuId, MenuName)
        }
      />
  )
}

export default class SubVerificationScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      headerTitleStyle: { color: '#fff'}, 
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
            source={require('../../resources/images/settings/caret-left.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{paddingHorizontal:20}}></View>
      ),
      header: (props) => <GradientHeader {...props} />,
      headerTitle:(props)=> (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.headerTitle}>
              {params.MenuName}
          </Text>
        </View>
      )       
    }
}

  constructor(props){
    super(props);
    this.state={
      data: []
    }
    self = this;
  }

  componentDidMount(){
    let param = this.props.navigation.state.params;
    let params = {
      MenuId: param.MenuId,
      UserId: param.UserId,
      ClientId: param.ClientId,
      RoleId: param.RoleId,
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
  }

  _renderItem = ({item}) => {
    return <SubVerificationItem item={item} FinalVerification={this.FinalVerification} navigation={this.props.navigation}/>
  }

  _keyExtractor = (item, index) => { return index.toString() }

  FinalVerification = (MenuId, MenuName) => {
    // switch(MenuName){
    //   case 'BACKGROUND CHECK':      this.props.navigation.navigate('Background');break;
    //   case 'PAN CARD':              this.props.navigation.navigate('PanCard');break;
    //   case 'DRIVING LICENCE':       this.props.navigation.navigate('DrivingLicense');break;
    //   case 'NREGA':                 this.props.navigation.navigate('Nrega');break;
    //   case 'VOTER CARD':            this.props.navigation.navigate('VoterCard');break;
    //   case 'PASSPORT':              this.props.navigation.navigate('Passport');break;
    //   case 'GSTIN':                 this.props.navigation.navigate('Gstin');break;
    //   case 'SHOP & ESTABLISHMENT':  this.props.navigation.navigate('Shop');break;
    //   case 'BANK VERIFICATION':     this.props.navigation.navigate('Bank');break;
    //   case 'PNG':                   this.props.navigation.navigate('Png');break;
    //   case 'GAS CONNECTION':        this.props.navigation.navigate('Gas');break;
    //   case 'MOBILE':                this.props.navigation.navigate('Mobile');break;
    //   case 'ELECTRICITY BILL':      this.props.navigation.navigate('Electricity');break;
    //   case 'EPF (otp based)':       this.props.navigation.navigate('Epf');break;
    //   case 'ESIC':                  this.props.navigation.navigate('Esic');break;
    //   case 'FORM 16':               this.props.navigation.navigate('Form');break;
    //   case 'FORM 16 QUARTERLY':     this.props.navigation.navigate('FormQuarterly');break;
    //   case 'VEHICLE RC':            this.props.navigation.navigate('Vehicle');break;
    //   case 'VEHICLE RC SEARCH':     this.props.navigation.navigate('VehicleSearch');break;
    // }
    this.props.navigation.navigate("SubmitVerification", {MenuName: MenuName});
  }

  render(){
    const {data} = this.state;
    return(
        <ScrollView
          contentContainerStyle={{flexGrow: 1,justifyContent:'center'}} 
          style={styles.container}>
          <FlatList 
              data={data}
              renderItem={this._renderItem}
              contentContainerStyle = {{flexGrow: 1,justifyContent:'center',}}
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
          />
        </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#fff',
      // textAlign: 'center'
  },
  headerLeftBtn: {
      paddingHorizontal: 20,
  },
  container: {
      flex: 1,
  },
  gradientButton: {
      height: 40,
      borderRadius: 15,
      overflow: 'hidden'
  },
})
