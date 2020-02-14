import React, { Component, Fragment } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import GradientHeader from '../../components/GradientHeader';
import CustomTextInput from '../Auth/CustomTextInput';
import GradientButton from '../../components/GradientButton';
import SafeAreaView from 'react-native-safe-area-view';
import {menuService} from '../../services/MenuService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let self = null;

const SubmitVerificationItem = props => {
  const { title, mandatory } = props.item
  return(
    <Fragment>
      {mandatory?
      <View style={{flexDirection:'row'}}>
        <Text style={styles.textStyle}>
            {title} 
        </Text>
        <Text style={styles.textStyle1}>
            * 
        </Text>
      </View>
      :
      <Text style={styles.textStyle}>
        {title} 
      </Text>
      }
      <CustomTextInput 
          placeholder={`Enter ${title}...`}
          placeholderTextColor="#707070"
          inputWrapperStyle={{
              marginBottom: 5
          }}
          inputStyle={{
              paddingVertical: 10,
          }}
          // value={pancard}
          // onChangeText={this.onChangePanCard}
      />
      </Fragment>  
  )
}

export default class SubmitVerificationScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
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
                        {params.MenuName}
                    </Text>
                </View>
            )
        }
    }
    constructor(props){
        super(props);
        this.state={
            pancard: ''
        }
        self = this;
    }
    onChangePanCard = (text) => {
        this.setState({pancard: text});
    }

    back = () => {
        this.props.navigation.goBack(null);
    }
    submit = () => {
        
    }
    _renderItem = ({item}) => {
      return <SubmitVerificationItem item={item} FinalVerification={this.FinalVerification} navigation={this.props.navigation}/>
    }
  
    _keyExtractor = (item, index) => { return index.toString() }
    componentDidMount () {
      let {params} = this.props.navigation.state;
      console.log("Company and LLP Master Data\n",params)
       switch(params.MenuName){
        case 'BACKGROUND CHECK':                this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: true}, {title: 'Gender', mandatory: true}, {title: 'Father Name', mandatory: true}, {title: 'Date of Birth', mandatory: true}, {title: 'Mobile No', mandatory: true}, {title: 'PAN No', mandatory: true}, {title: 'Address1', mandatory: true}, {title: 'Address2', mandatory: true}, {title: 'State', mandatory: true}, {title: 'Pincode', mandatory: true}]});break;
        case 'PAN CARD':                        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Pan Card No', mandatory: true}]});break;
        case 'DRIVING LICENCE':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Driving License', mandatory: true}, {title: 'Date of Birth', mandatory: true}]});break;
        case 'NREGA':                           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Driving License', mandatory: true}, {title: 'Date of Birth', mandatory: true}]});break;
        case 'VOTER CARD':                      this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Voter Card No', mandatory: true}]});break;
        case 'PASSPORT':                        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'File Number', mandatory: true}, {title: 'Date of Birth', mandatory: true}, {title: 'Passport Number', mandatory: false}]});break;
        case 'Passport MRZ Generator':          this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Date of Birth', mandatory: true}, {title: 'Date of Expiry', mandatory: true}, {title: 'Gender', mandatory: true}, {title: 'Passport Number', mandatory: true}, {title: 'Passport Type', mandatory: true}, {title: 'Country Code', mandatory: true}]});break;
        case 'GSTIN':                           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'SHOP & ESTABLISHMENT':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}, {title: 'State', mandatory: true}]});break;
        case 'BANK VERIFICATION':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'IFSC', mandatory: true}, {title: 'Account No', mandatory: true}]});break;
        case 'PNG':                             this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Consumer ID', mandatory: false}, {title: 'BP Number', mandatory: false}, {title: 'Service Provider', mandatory: true}]});break;
        case 'GAS CONNECTION':                  this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'LPG ID', mandatory: true}]});break;
        case 'MOBILE':                          this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Mobile No', mandatory: true}, {title: 'OTP', mandatory: true}]});break;
        case 'ELECTRICITY BILL':                this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Consumer ID', mandatory: true}, {title: 'Service Provider', mandatory: true}]});break;
        case 'EPF (otp based)':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'UAN', mandatory: false}, {title: 'Mobile No', mandatory: true}]});break;
        case 'ESIC':                            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'ESIC ID', mandatory: true}]});break;
        case 'FORM 16':                         this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'TAN', mandatory: true}, {title: 'PAN', mandatory: true}, {title: 'Certificate Number', mandatory: true}, {title: 'Total Amount of TDS Deducted', mandatory: true}, {title: 'Fiscal Year', mandatory: true}]});break;
        case 'FORM 16 QUARTERLY':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'TAN', mandatory: true}, {title: 'PAN', mandatory: true}, {title: 'Fiscal Year', mandatory: true}]});break;
        case 'Employment Verification':         this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Entity ID/CIN', mandatory: false}, {title: 'Employer Name', mandatory: true}, {title: 'Employee Name', mandatory: true}, {title: 'Mobile', mandatory: false}, {title: 'Email ID', mandatory: false}]});break;
        case 'EPF UAN Lookup':                  this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Mobile', mandatory: true}]});break;
        case 'Employer Lookup':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'UAN', mandatory: true}]});break;
        case 'ESIC ID':                         this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'ESIC ID', mandatory: true}]});break;
        case 'ITR-V':                           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'PAN', mandatory: true}]});break;
        case 'VEHICLE RC(Advanced)':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'VEHICLE RC(Basic)':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'Vehicle Alerts Check':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'VEHICLE RC SEARCH':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Engine Number', mandatory: false}, {title: 'Chassis Number', mandatory: false}, {title: 'State', mandatory: false}]});break;
        case 'GST Search Basis PAN':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'PAN', mandatory: true}]});break;
        case 'GST GSTIN Authentication':        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'GSP GST Return Filing':           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'GST Authentication':              this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'Company Search by Name':          this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Name', mandatory: true}]});break;
        case 'Company Search Lite':             this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Name', mandatory: true}]});break;
        case 'Company / LLP CIN Lookup':        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Company Name', mandatory: true}]});break;
        case 'Company and LLP Master Data\n':   this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'CIN / LLPIN / FCRN / FLLPIN', mandatory: true}]});break;
        case 'MCA Signatories':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'CIN / LLPIN', mandatory: true}]});break;
        case 'Udyog Aadhar Number':             this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'UAN', mandatory: true}, {title: 'Mobile No', mandatory: false}]});break;
        case 'TAN Authentication':              this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'TAN', mandatory: true}]});break;
        case 'IEC Detailed Profile':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Import Export Code', mandatory: true}]});break;
        case 'FSSAI License Authentication':    this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'FDA License Authentication':      this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'License No', mandatory: true}, {title: 'State', mandatory: true}]});break;
        case 'CA Membership':                   this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Membership Number', mandatory: true}]});break;
        case 'ICSI Membership':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Membership Number', mandatory: false}, {title: 'CP Number', mandatory: false}]});break;
        case 'ICWAI Membership':                this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Membership Number', mandatory: true}]});break;
        case 'ICWAI Firm':                      this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'MCI Membership':                  this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}, {title: 'Year of Registration', mandatory: true}, {title: 'Medical Council', mandatory: true}]});break;
      }
    }
    render() {
        const {pancard, data} = this.state;
        
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <SafeAreaView style={styles.mainContainer}>
                  <FlatList 
                      data={data}
                      renderItem={this._renderItem}
                      contentContainerStyle = {{flexGrow: 1,justifyContent:'center',}}
                      keyExtractor={this._keyExtractor}
                      showsVerticalScrollIndicator={false}
                      style={{flex: 1}}
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
