import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet,FlatList} from 'react-native';
import GradientHeader from '../../components/GradientHeader';
import GradientButton from '../../components/GradientButton';
import {menuService} from '../../services/MenuService'
import { ScrollView } from 'react-native-gesture-handler';


let self = null;
const VerificationItem = props => {
  const { MenuId, MenuName, Flag } = props.item
  return(
      <GradientButton
        label={MenuName}
        _onPress={()=>
          props.subVerification(MenuId, MenuName)
        }
        buttonsize={{width:330,height:56}}
      />
  )
}

export default class VerificationScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
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
      headerTitle: (
        <View style={{width: '100%'}}>
          <Text style={styles.headerTitle}>
              VERIFICATIONS
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

  // retail = () => {
  //   this.props.navigation.navigate("Retail");
  // }

  // kyc = () => {
  //   this.props.navigation.navigate("KYC");
  // }

  // utility = () => {
  //   this.props.navigation.navigate("Utility");
  // }

  // vehicle = () => {
  //   this.props.navigation.navigate("Vehicle");
  // }
  subVerification = (MenuId,MenuName) => {
    let param = this.props.navigation.state.params;
    this.props.navigation.navigate('SubVerification',{MenuId: MenuId, MenuName: MenuName, UserId: param.UserId, RoleId: param.RoleID, ClientId: param.ClientId})
  }

  _renderItem = ({item}) => {
    return <VerificationItem item={item} subVerification={this.subVerification} navigation={this.props.navigation}/>
  }

  _keyExtractor = (item, index) => { return index.toString() }

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
      textAlign: 'center'
  },
  headerLeftBtn: {
      paddingHorizontal: 20,
  },
  container: {
      flex: 1,
  },
  mainContainer: {
      flex: 1,
      paddingHorizontal: 14
  },
  gradientButton: {
      height: 40,
      borderRadius: 15,
      overflow: 'hidden'
  },
})
