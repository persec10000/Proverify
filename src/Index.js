import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import _ from 'lodash';
import LoginScreen from './screens/Auth/LoginScreen';
import ForgotScreen from './screens/Auth/ForgotScreen';
import DashboardScreen from './screens/DashboardScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MyRequestScreen from './screens/Myrequest/MyRequestScreen';
import BackgroundScreen from './screens/Verification/Retail/BackgroundScreen';
import NregaScreen from './screens/Verification/Retail/NregaScreen';
import PanCardScreen from './screens/Verification/Retail/PanCardScreen';
import DrivingLicenseScreen from './screens/Verification/Retail/DrivingLicenseScreen';
import PassportScreen from './screens/Verification/Retail/PassportScreen';
import VoterCardScreen from './screens/Verification/Retail/VoterCardScreen';
import BankScreen from './screens/Verification/DigitalEssentials/BankScreen';
import GstinScreen from './screens/Verification/DigitalEssentials/GstinScreen';
import ShopScreen from './screens/Verification/DigitalEssentials/ShopScreen';
import ElectriciryScreen from './screens/Verification/UtilityBill/ElectricityScreen';
import GasScreen from './screens/Verification/UtilityBill/GasScreen';
import MobileScreen from './screens/Verification/UtilityBill/MobileScreen';
import PngScreen from './screens/Verification/UtilityBill/PngScreen';
import EpfScreen from './screens/Verification/Employment/EpfScreen';
import EsicScreen from './screens/Verification/Employment/EsicScreen';
import FormScreen from './screens/Verification/Employment/FormScreen';
import FormQuarterlyScreen from './screens/Verification/Employment/FormQuarterlyScreen';
import VehicleSearchScreen from './screens/Verification/Asset/VehicleSearchScreen'
import VerificationScreen from './screens/Verification/VerificationScreen';
import SubVerificationScreen from './screens/Verification/SubVerificationScreen';
import VehicleScreen from './screens/Verification/Asset/VehicleScreen';
import AsyncStorage from '@react-native-community/async-storage';
import SubmitVerificationScreen from './screens/Verification/SubmitVerificationScreen';
console.disableYellowBox = true;

const VerificationNavigatorConfigs = {
    Verification: {
        screen: VerificationScreen
    },
    SubVerification: {
        screen: SubVerificationScreen
    },
    SubmitVerification: {
      screen: SubmitVerificationScreen
    },
    Background: {
        screen: BackgroundScreen
    },
    PanCard: {
      screen: PanCardScreen
    },
    DrivingLicense: {
      screen: DrivingLicenseScreen
    },
    Passport: {
      screen: PassportScreen
    },
    Nrega: {
      screen: NregaScreen
    },
    VoterCard: {
      screen: VoterCardScreen
    },
    Bank: {
      screen: BankScreen
    },
    Png: {
      screen: PngScreen
    },
    Gstin: {
      screen: GstinScreen
    },
    Shop: {
      screen: ShopScreen
    },
    Gas: {
      screen: GasScreen
    },
    Mobile: {
      screen: MobileScreen
    },
    Electricity: {
      screen: ElectriciryScreen
    },
    Epf: {
      screen: EpfScreen
    },
    Esic: {
      screen: EsicScreen
    },
    Form: {
      screen: FormScreen
    },
    FormQuarterly: {
      screen: FormQuarterlyScreen
    },
    VehicleSearch: {
      screen: VehicleSearchScreen
    },
    Vehicle: {
      screen: VehicleScreen
  },
}

const VerificationContainer = createStackNavigator(VerificationNavigatorConfigs);
const MainAppRouteConfigs = {
  Dashboard: {
    screen: DashboardScreen,
  },
  MyRequest: {
    screen: MyRequestScreen,
  },
  Verification: {
    screen: VerificationContainer,
    navigationOptions: {
      header: null,
    },
  },
};

const MainAppNavigatorConfigs = {
  initialRouteName: 'Dashboard',
};

const MainAppNavigator = createStackNavigator(MainAppRouteConfigs, MainAppNavigatorConfigs);
const MainAppContainer = createAppContainer(MainAppNavigator);

const AuthRouteConfigs = {
  Login: {
    screen: LoginScreen,
    navigationOptions: {
        header: null
    }
  },
  Forgot: {
    screen: ForgotScreen,
    navigationOptions: {
        header: null
    }
  },
  MainScreen: {
    screen: MainAppContainer,
    navigationOptions: {
      header: null,
    },
  },
};

const AuthStackNavigatorConfig = {initialRouteName: 'Login'};

const AuthNavigator = createStackNavigator(AuthRouteConfigs,AuthStackNavigatorConfig);
const AuthContainer = createAppContainer(AuthNavigator);

class AuthLoadingScreen extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('userinfo');
    this.props.navigation.navigate(!_.isEmpty(user) ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const AppSwitchRouteConfigs = {
  AuthLoading: AuthLoadingScreen,
  Auth: AuthContainer,
  App: MainAppContainer,
};

const AppSwitchNavigatorConfigs = {
  initialRouteName: 'AuthLoading',
};

const AppSwitchNavigator = createSwitchNavigator(
  AppSwitchRouteConfigs,
  AppSwitchNavigatorConfigs,
);
const AppSwitchContainer = createAppContainer(AppSwitchNavigator);

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <AppSwitchContainer ref={ref => (this._navigator = ref)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  draweritemText: {
    marginLeft: 20,
    fontSize: 20,
  },
});
