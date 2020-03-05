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
import CustomTextInput from '../../components/CustomTextInput';
import GradientButton from '../../components/GradientButton';
import SafeAreaView from 'react-native-safe-area-view';
import {menuService} from '../../services/MenuService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

let self = null;
let drop1 = null;
let drop2 = null;
let drop3 = null;
let date = null;
const dropdown1 = ref => {drop1 = ref};
const dropdown2 = ref => {drop2 = ref};
const dropdown3 = ref => {drop3 = ref};
const datePicker = ref => {date = ref};
const SubmitVerificationItem = (props) => {
  const { title, mandatory } = props.item;
  const { onChangeValue, birthday } = props;
  const options1 = ['Male', 'Female', 'Transgender'];
  const options2 = ['Personal', 'Service', 'Diplomatic'];
  const options3 = ['Personal', 'Service', 'Diplomatic'];
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
      {title == 'Gender' || title == 'Passport Type' || title == 'Service Provider'?
        <TouchableOpacity style = {{marginBottom:5, marginHorizontal: 22, height:50, borderRadius:15, alignItems:'center',borderWidth: 1, borderColor:'#707070', flexDirection:'row'}} onPress={()=>title=='Gender'?drop1.show():title=='Passport Type'?drop2.show():drop3.show()}>
            {title == 'Gender'?
            <ModalDropdown 
                // ref={ref => {dropdown = ref}}
                ref={dropdown1}
                style={styles.dropdown_2}
                textStyle={styles.dropdown_2_text}
                dropdownStyle={styles.dropdown_2_dropdown}
                dropdownTextStyle={styles.dropdown_text}
                options={options1}
                onSelect={(index, value) => props._dropdown1(index, value)}
            />
            :
            <Fragment>
                {title == 'Passport Type'?
                <ModalDropdown 
                    ref={dropdown2}
                    style={styles.dropdown_2}
                    textStyle={styles.dropdown_2_text}
                    dropdownStyle={styles.dropdown_2_dropdown}
                    dropdownTextStyle={styles.dropdown_text}
                    options={options2}
                    onSelect={(index, value) => props._dropdown2(index, value)}
                />
                :
                <ModalDropdown 
                    // ref={ref => {dropdown = ref}}
                    ref={dropdown3}
                    style={styles.dropdown_2}
                    textStyle={styles.dropdown_2_text}
                    dropdownStyle={styles.dropdown_2_dropdown}
                    dropdownTextStyle={styles.dropdown_text}
                    options={options3}
                    onSelect={(index, value) => props._dropdown3(index, value)}
                />
                }
            </Fragment>
            }
            <MaterialIcons 
                style={styles.icon}
                name={'keyboard-arrow-down'}
                size={34}
            // onPress={this.props.iconPress}
            />  
        </TouchableOpacity>
        :
        <Fragment>
            {title == 'Date of Birth' ?
                <CustomTextInput 
                    placeholder={`Enter ${title}...`}
                    placeholderTextColor="#707070"
                    inputWrapperStyle={{
                        marginBottom: 5
                    }}
                    inputStyle={{
                        paddingVertical: 10,
                    }}
                    editable={false}
                    suffixIcon={true}
                    onPressSuffixIcon={() => { date.onPressDate()}}
                    value={birthday && birthday.format('DD/MM/YYYY')}
                    //   value={pancard}
                    onChangeText={(text)=>onChangeValue(text,title)}
                />
                :
                <CustomTextInput 
                    placeholder={`Enter ${title}...`}
                    placeholderTextColor="#707070"
                    inputWrapperStyle={{
                        marginBottom: 5
                    }}
                    inputStyle={{
                        paddingVertical: 10,
                    }}
                    //   value={pancard}
                    onChangeText={(text)=>onChangeValue(text,title)}
                />
            }
        </Fragment>
        }
        <DatePicker
            style={{width: 0, height: 0}}
            ref={datePicker}
            androidMode="spinner"
            showIcon={false}
            mode="date"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={props._onChangeDate}
            customStyles={{
                dateInput: {
                    borderWidth: 0,
                    height: 0
                },
                btnTextConfirm: {
                    color: '#AC040C',
                    fontSize: 20,
                },
                btnTextCancel: {
                    color: '#707070',
                    fontSize: 20,
                },
            }}
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
            pancard: '',
            initialgender: ['Male', 'Female', 'Transgender'],
            initialpassporttype: ['Personal', 'Service', 'Diplomatic'],
            initialservice: [],
            birthday: moment()
        }
        self = this;
    }
    onChangeValue = (text,title) => {
        console.log("title===>",text);
        switch(title){
            case 'Case No': this.setState({CaseNo: text}); break;
            case 'First Name': this.setState({FirstName: text}); break;
            case 'Last Name': this.setState({LastName: text}); break;
            case 'Gender': this.setState({Gender: text}); break;
            case 'Date of Birth': this.setState({DOB: text}); break;
            case 'Father Name': this.setState({FatherName: text}); break;
            case 'Mobile No': this.setState({MobileNo: text}); break;
            case 'Address1': this.setState({Address1: text}); break;
            case 'Address2': this.setState({Address2: text}); break;
            case 'State': this.setState({StateName: text}); break;
            case 'Pincode': this.setState({Pincode: text}); break;
            case 'Pan Card No': this.setState({}); break;
            case 'PAN No': this.setState({}); break;
            case 'Driving License': this.setState({}); break;
            case 'Voter Card No': this.setState({}); break;
            case 'Passport Number': this.setState({}); break;
            case 'Date of Expiry': this.setState({DateofExpiry: text}); break;
            case 'Passport Type': this.setState({PassportType: text}); break;
            case 'Country Code': this.setState({CountryCode: text}); break;
            case 'GSTIN': this.setState({}); break;
            case 'Registration Number': this.setState({}); break;
            case 'IFSC': this.setState({}); break;
            case 'Account No': this.setState({}); break;
            case 'Consumer ID': this.setState({}); break;
            case 'BP Number': this.setState({}); break;
            case 'Service Provider': this.setState({}); break;
            case 'LPG ID': this.setState({}); break;
            case 'OTP': this.setState({}); break;
            case 'UAN': this.setState({}); break;
            case 'ESIC ID': this.setState({}); break;
            case 'TAN': this.setState({}); break;
            case 'Certificate Number': this.setState({}); break;
            case 'Total Amount of TDS Deducted': this.setState({});break;
            case 'Fiscal Year': this.setState({FinancialYear: text}); break;
            case 'Entity ID/CIN': this.setState({}); break;
            case 'Employer Name': this.setState({}); break;
            case 'Employee Name': this.setState({}); break;
            case 'Email ID': this.setState({EmailId: text}); break;
            case 'Engine Number': this.setState({}); break;
            case 'Chassis Number': this.setState({}); break;
            case 'Company Name': this.setState({}); break;
            case 'CIN/LLPIN': this.setState({}); break;
            case 'Import Export Code': this.setState({}); break;
            case 'License No': this.setState({}); break;
            case 'Membership Number': this.setState({}); break;
            case 'CP Number': this.setState({}); break;
            case 'Year of Registration': this.setState({}); break;
            case 'Medical Council': this.setState({}); break;
        }
        // this.setState({pancard: text});
    }

    back = () => {
        this.props.navigation.goBack(null);
    }
    submit = async() => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        console.log("user===>",user)
        let {CaseNo, Mode, FirstName, LastName, MobileNo, FatherName, Gender, DOB, Address1, Address2, Pincode, StateName, StateCode, EmailId, TANNo, PAN, FinancialYear, DateofExpiry, PassportType, CountryCode, Provider} = this.state;
        let params = {
            ClientId: user.ClientId,
            UserId: user.UserId,
            CaseNo: typeof CaseNo != 'undefined' ? CaseNo : '',
            Mode: typeof Mode != 'undefined' ? Mode : '',
            FirstName: typeof FirstName != 'undefined' ? FirstName : '',
            MiddleName: typeof MiddleName != 'undefined' ? MiddleName : '',
            LastName: typeof LastName != 'undefined' ? LastName : '',
            MobileNo: typeof MobileNo != 'undefined' ? MobileNo : '',
            FatherName: typeof FatherName != 'undefined' ? FatherName : '',
            Gender: typeof Gender != 'undefined' ? Gender : '',
            DOB: typeof DOB != 'undefined' ? DOB : '',
            POIType: typeof POIType != 'undefined' ? POIType : '',
            POINo: typeof POINo != 'undefined' ? POINo : '',
            Address1: typeof Address1 != 'undefined' ? Address1 : '',
            Address2: typeof Address2 != 'undefined' ? Address2 : '',
            Address3: typeof Address3 != 'undefined' ? Address3 : '',
            Pincode: typeof Pincode != 'undefined' ? Pincode : '',
            StateName: typeof StateName != 'undefined' ? StateName : '',
            StateCode: typeof StateCode != 'undefined' ? StateCode : '',
            EmailId: typeof EmailId != 'undefined' ? EmailId : '',
            TANNo: "TANNo",
            PAN: "PAN",
            FinancialYear: typeof FinancialYear != 'undefined' ? FinancialYear : '',
            DateofExpiry: typeof DateofExpiry != 'undefined' ? DateofExpiry : '',
            PassportType: typeof PassportType != 'undefined' ? PassportType : '',
            CountryCode: typeof CountryCode != 'undefined' ? CountryCode : '',
            Provider: typeof Provider != 'undefined' ? Provider : ''
        }
    }
    _renderItem = ({item}) => {
      const ref = React.createRef();
      return <SubmitVerificationItem item={item} birthday={this.state.birthday} _dropdown1={this._dropdown1} _dropdown2={this._dropdown2} _dropdown3={this._dropdown3} _onChangeDate={this._onChangeDate} ref={ref=>SubmitVerificationItem(ref)} FinalVerification={this.FinalVerification} navigation={this.props.navigation} onChangeValue={this.onChangeValue}/>
    }
    
    _keyExtractor = (item, index) => { return index.toString() }
    _dropdown1 = (index, value) => {
        this.setState({gender: this.state.initialgender[index]})
    }
    _dropdown2 = (index, value) => {
        this.setState({passportType: this.state.initialpassporttype[index]})
    }
    _dropdown3 = (index, value) => {
        this.setState({service_provider: this.state.initialservice[index]})
    }
    _onChangeDate = (value) => {
        const birthday = moment(value, 'DD/MM/YYYY')
        this.setState({ birthday })
    }
    componentDidMount () {
      
      let {params} = this.props.navigation.state;
       switch(params.MenuName){
        case 'BACKGROUND CHECK':                this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: true}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: true},{title: 'Gender', mandatory: true}, {title: 'Father Name', mandatory: true}, {title: 'Date of Birth', mandatory: true}, {title: 'Mobile No', mandatory: true}, {title: 'PAN No', mandatory: true}, {title: 'Address1', mandatory: true}, {title: 'Address2', mandatory: true}, {title: 'Address3', mandatory: true}, {title: 'Pincode', mandatory: true}]});break;
        case 'PAN CARD':                        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Pan Card No', mandatory: true}]});break;
        case 'DRIVING LICENCE':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Driving License', mandatory: true}, {title: 'Date of Birth', mandatory: true}]});break;
        case 'NREGA':                           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Driving License', mandatory: true}, {title: 'Date of Birth', mandatory: true}]});break;
        case 'VOTER CARD':                      this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Voter Card No', mandatory: true}]});break;
        case 'PASSPORT':                        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'File Number', mandatory: true}, {title: 'Date of Birth', mandatory: true}, {title: 'Passport Number', mandatory: false}]});break;
        case 'PASSPORT MRZ GENERATOR':          this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'Date of Birth', mandatory: true}, {title: 'Date of Expiry', mandatory: true}, {title: 'Gender', mandatory: true}, {title: 'Passport Number', mandatory: true}, {title: 'Passport Type', mandatory: true}, {title: 'Country Code', mandatory: true}]});break;
        case 'GSTIN':                           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'SHOP & ESTABLISHMENT':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}, {title: 'State', mandatory: true}]});break;
        case 'BANK VERIFICATION':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: false}, {title: 'Middle Name', mandatory: false}, {title: 'Last Name', mandatory: false}, {title: 'IFSC', mandatory: true}, {title: 'Account No', mandatory: true}]});break;
        case 'PNG':                             this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Consumer ID', mandatory: false}, {title: 'BP Number', mandatory: false}, {title: 'Service Provider', mandatory: true}]});break;
        case 'GAS CONNECTION':                  this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'LPG ID', mandatory: true}]});break;
        case 'MOBILE':                          this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Mobile No', mandatory: true}, {title: 'OTP', mandatory: true}]});break;
        case 'ELECTRICITY BILL':                this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Consumer ID', mandatory: true}, {title: 'Service Provider', mandatory: true}]});break;
        case 'EPF (OTP BASED)':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'UAN', mandatory: false}, {title: 'Mobile No', mandatory: true}]});break;
        case 'ESIC':                            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'ESIC ID', mandatory: true}]});break;
        case 'FORM 16':                         this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'TAN', mandatory: true}, {title: 'PAN', mandatory: true}, {title: 'Certificate Number', mandatory: true}, {title: 'Total Amount of TDS Deducted', mandatory: true}, {title: 'Fiscal Year', mandatory: true}]});break;
        case 'FORM 16 QUARTERLY':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'TAN', mandatory: true}, {title: 'PAN', mandatory: true}, {title: 'Fiscal Year', mandatory: true}]});break;
        case 'EMPLOYMENT VERIFICATION':         this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Entity ID/CIN', mandatory: false}, {title: 'Employer Name', mandatory: true}, {title: 'Employee Name', mandatory: true}, {title: 'Mobile No', mandatory: false}, {title: 'Email ID', mandatory: false}]});break;
        case 'EPF UAN LOOKUP':                  this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Mobile No', mandatory: true}]});break;
        case 'EMPLOYER LOOKUP':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'UAN', mandatory: true}]});break;
        case 'ESIC ID':                         this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'ESIC ID', mandatory: true}]});break;
        case 'ITR-V':                           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'PAN', mandatory: true}]});break;
        case 'VEHICLE RC(ADVANCED)':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'VEHICLE RC(BASIC)':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'VEHICLE ALERTS CHECK':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'VEHICLE RC SEARCH':               this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Engine Number', mandatory: false}, {title: 'Chassis Number', mandatory: false}, {title: 'State', mandatory: false}]});break;
        case 'GST SEARCH BASIS PAN':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'PAN', mandatory: true}]});break;
        case 'GSP GSTIN AUTHENTICATION':        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'GSP GST RETURN FILING':           this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'GST AUTHENTICATION':              this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'GSTIN', mandatory: true}]});break;
        case 'COMPANY SEARCH BY NAME':          this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: true}]});break;
        case 'COMPANY SEARCH LITE':             this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'First Name', mandatory: true}]});break;
        case 'COMPANY / LLP CIN LOOKUP':        this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Company Name', mandatory: true}]});break;
        case 'COMPANY AND LLP MASTER DATA\n':   this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'CIN / LLPIN / FCRN / FLLPIN', mandatory: true}]});break;
        case 'MCA SIGNATORIES':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'CIN / LLPIN', mandatory: true}]});break;
        case 'UDYOG AADHAR NUMBER':             this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'UAN', mandatory: true}, {title: 'Mobile No', mandatory: false}]});break;
        case 'TAN AUTHENTICATION':              this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'TAN', mandatory: true}]});break;
        case 'IEC DETAILED PROFILE':            this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Import Export Code', mandatory: true}]});break;
        case 'FSSAI LICENSE AUTHENTICATION':    this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'FDA LICENSE AUTHENTICATION':      this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'License No', mandatory: true}, {title: 'State', mandatory: true}]});break;
        case 'CA MEMBERSHIP':                   this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Membership Number', mandatory: true}]});break;
        case 'ICSI MEMBERSHIP':                 this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Membership Number', mandatory: false}, {title: 'CP Number', mandatory: false}]});break;
        case 'ICWAI MEMBERSHIP':                this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Membership Number', mandatory: true}]});break;
        case 'ICWAI FIRM':                      this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}]});break;
        case 'MCI MEMBERSHIP':                  this.setState({data: [{title: 'Case No', mandatory: true}, {title: 'Registration Number', mandatory: true}, {title: 'Year of Registration', mandatory: true}, {title: 'Medical Council', mandatory: true}]});break;
      }
    }
    render() {
        const {pancard, data} = this.state;
        console.log('this==>', this.state.gender)
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
    dropdown_2_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
        fontFamily: 'Raleway-Regular',
        paddingHorizontal: 15,
        // textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_text: {
        fontSize: 16,
        color: '#000',
    },
    dropdown_2_dropdown: {
        width: '81%',
        // marginRight: 300,
        height: 150,
        borderColor: '#707070',
        borderWidth: 1,
        borderRadius: 3,
    },
    icon: {
        position: 'absolute',
        top: 8,
        right: 6
    },
})
