import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import GradientHeader from '../../components/GradientHeader'
import CustomTextInput from '../../components/CustomTextInput'
import DropDown from '../../components/Dropdown'
import ActionSheet from '../../components/ActionSheet'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icons from '../../utils/Icons'
import SafeAreaView from 'react-native-safe-area-view'

const DATA = [
    {
        supplierName: 'Jane Dou',
        from: 'Sity mall, Green street, 4',
        to: 'Soborna street, 11, Sumy',
        time: '13:00 - 14:00',
        cost: '2',
        currency: '$'
    },
    {
        supplierName: 'Jone Dou',
        from: 'Sity mall, Green street, 4',
        to: 'Soborna street, 11, Sumy',
        time: '13:00 - 14:00',
        cost: '1',
        currency: '$'
    },
    {
        supplierName: 'Johe Dou',
        from: 'Sity mall, Green street, 4',
        to: 'Soborna street, 11, Sumy',
        time: '13:00 - 14:00',
        cost: '4',
        currency: '$'
    },
    {
        supplierName: 'Jae Dou',
        from: 'Sity mall, Green street, 4',
        to: 'Soborna street, 11, Sumy',
        time: '13:00 - 14:00',
        cost: '6',
        currency: '$'
    },
    {
        supplierName: 'Jeoh Dou',
        from: 'Sity mall, Green street, 4',
        to: 'Soborna street, 11, Sumy',
        time: '13:00 - 14:00',
        cost: '5',
        currency: '$'
    },
    {
        supplierName: 'Jane Dou',
        from: 'Sity mall, Green street, 4',
        to: 'Soborna street, 11, Sumy',
        time: '13:00 - 14:00',
        cost: '2',
        currency: '$'
    },
    {
        supplierName: 'Jane Dou',
        from: 'Sity mall, Green street, 4',
        to: 'Soborna street, 11, Sumy',
        time: '13:00 - 14:00',
        cost: '2',
        currency: '$'
    },
]

const CANCEL_INDEX2 = 0
const DESTRUCTIVE_INDEX2 = 4
const title2 = <Text style={{ color: '#000', fontSize: 20, textAlign: 'center' }}>Sort By</Text>
const OfferItem = props => {
    const { supplierName, from, to, time, cost, currency } = props.item
    return(
        <View style={styles.offerItem}>
            <View style={styles.offerMainInfo}>
                <View style={styles.offerDetail}>
                    <View style={styles.offerDetailRow}>
                        <Text style={styles.rowLabel}>Created on: </Text>
                        <Text style={styles.rowLabel}>2020-02-07</Text>
                    </View>
                    <View style={styles.offerDetailRow}>
                        <Text style={styles.rowLabel}>File Name:</Text>
                        <Text style={styles.rowLabel}>React Native Tutorial.pdf</Text>
                    </View>
                    <View style={styles.offerDetailRow}>
                        <Text style={styles.rowLabel}>Folder Name:</Text>
                        <Text style={styles.rowLabel}>Folder1</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default class MyRequestScreen extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitleStyle: { color: '#fff' },
            headerStyle: {
                backgroundColor: 'transparent',
            },
            header: (props) => <GradientHeader {...props} />,
            headerTitle: (
                <View style={{flex: 1}}>
                    <Text style={styles.headerTitle}>
                        MY REQUESTS
                    </Text>
                </View>
            ),
            headerRight: (
                <TouchableOpacity onPress={navigation.getParam('sort')} style={{paddingHorizontal: 15}}>
                    <Text style={{fontWeight: 'bold',color: "#FFF",fontSize: 18,}}>
                        Sort
                    </Text>
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity
                    onPress={()=>navigation.goBack(null)} 
                    style={styles.headerLeftBtn}>
                    <Image
                        style={{ tintColor: '#fff' }}
                        source={require('../../resources/images/settings/caret-left.png')}
                        />
                </TouchableOpacity>
            )
        }
    }

    constructor(props){
        super(props);
        this.state={
            item: '',
            ascSize: false,
            descSize: false,
            ascModified: false,
            descModified: false,
            ascType: false,
            descType: false,
        };
    }
    _renderItem = ({ item }) =>  {
        return <OfferItem item={item} navigation={this.props.navigation}/>
    }

    _keyExtractor = (item, index) => { return index.toString() }
    onSelectGroup = (index) => {
        if (index == 0){
            this.setState({item: "date"});
        }
        else if (index == 1){
            this.setState({item: 'docType'});
        }
    }
    onSelectDocument = (index) => {
        
    }

    //actionSheet start//
  showActionSheet2 = () => this.actionSheet2.show()
  getActionSheetRef2 = ref => (this.actionSheet2 = ref)
  handlePress2 = index => this.actionSheetfuncton1(index)

  actionSheetfuncton1(index) {
    if (index == 1) {
        this.latestUse()
        if (this.state.ascSize == false) {
            if (this.state.descSize == false) {
                this.setState({
                    ascSize: false,
                    descSize: true,
                    value: 0,
                    ascType: false,
                    descType: false,
                    ascModified: false,
                    descModified: false,
                })
            } else {
                this.setState({
                    ascSize: true,
                    descSize: false,
                    ascType: false,
                    descType: false,
                    ascModified: false,
                    descModified: false,
                    value: 1
                })
            }
        }else{
            this.setState({
                ascSize: false,
                descSize: true,
                value: 0,
                ascType: false,
                descType: false,
                ascModified: false,
                descModified: false,
            })
        }
    }
    if (index == 2) {
        this.FileType();
        if (this.state.ascType == false) {
            if (this.state.descType == false) {
                this.setState({
                    ascType: false,
                    descType: true,
                    ascModified: false,
                    descModified: false,
                    ascSize: false,
                    descSize: false,
                    value: 0
                })
            } else {
                this.setState({
                    ascType: true,
                    descType: false,
                    ascModified: false,
                    descModified: false,
                    ascSize: false,
                    descSize: false,
                    value:1
                })
            }
        }else{
            this.setState({
                ascType: false,
                descType: true,
                ascModified: false,
                descModified: false,
                ascSize: false,
                descSize: false,
                value: 0
            })
        }
    }
    if (index == 3) {
        this.LastModified();
        if (this.state.ascModified == false) {
            if (this.state.descModified == false) {
                this.setState({
                    ascModified: false,
                    descModified: true,
                    ascType: false,
                    descType: false,
                    ascSize: false,
                    descSize: false,
                    value: 0
                })
            } else {
                this.setState({
                    ascModified: true,
                    descModified: false,
                    ascType: false,
                    descType: false,
                    ascSize: false,
                    descSize: false,
                    value: 1
                })
            }
        }else{
            this.setState({
                ascModified: false,
                descModified: true,
                ascType: false,
                descType: false,
                ascSize: false,
                descSize: false,
                value: 0
            })
        }
    }
    if (index == 4) {
        this.ResetArray()
        this.setState({
            ascModified: false,
            descModified: false,
            ascType: false,
            descType: false,
            ascSize: false,
            descSize: false,
            value: 1
        })
    }
    }

    SortBy(prop, inascSizeOrder) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return inascSizeOrder === 1 ? 1 : -1; //  in case to show  large to small order in case of integer
                //return 1;
            } else if (a[prop] < b[prop]) {
                return inascSizeOrder === 1 ? -1 : 1;
                //return -1;
            }
            return 0;
        }
    }

    latestUse() {
        this.setState({ isLoading: true, searchtrue: true , LoadingDialog:false })
        var sortedArray = this.state.dataSource.sort(this.SortBy('Size', this.state.value));
        this.setState({
            dataSource: sortedArray,
        });
        setTimeout(() => {
            this.setState({ isLoading: false, searchtrue: false , LoadingDialog:false})
        }, 2000);
    }
    FileType() {
        this.setState({ isLoading: true, searchtrue: true , LoadingDialog:false })
        var sortedArray = this.state.dataSource.sort(this.SortBy('DocumentType', this.state.value));
        this.setState({
            dataSource: sortedArray,
        })
        setTimeout(() => {
            this.setState({ isLoading: false, searchtrue: false , LoadingDialog:false})
        }, 2000);
    }
    LastModified() {
        this.setState({ isLoading: true, searchtrue: true , LoadingDialog:false })
        var sortedArray = this.state.dataSource.sort(this.SortBy('UpdatedOn', this.state.value));
        this.setState({
            dataSource: sortedArray,
        })
        setTimeout(() => {
            this.setState({ isLoading: false, searchtrue: false , LoadingDialog:false})
        }, 2000);
    }

    componentDidMount = () => {
        this.props.navigation.setParams({ sort: this.showActionSheet2 });
    }
    render() {
        const data=["Date","Document type"];
        const docTypeData=['Status', 'In progress']
        const options2 = [
            'Cancel',
            {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>File Size</Text>
                    {this.state.ascSize &&
                        <Text style={styles.options2Text}>- Asc</Text>
                    }
                    {this.state.descSize &&
                        <Text style={styles.options2Text}>- Desc</Text>
                    }
                </View >,
                height: 40,
            },
            {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>File Type</Text>
                    {this.state.ascType &&
                        <Text style={styles.options2Text}>- Asc</Text>
                    }
                    {this.state.descType &&
                        <Text style={styles.options2Text}>- Desc</Text>
                    }
                </View >,
                height: 40,
            },
            {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>Last Modified</Text>
                    {this.state.ascModified &&
                        <Text style={styles.options2Text}>- Asc</Text>
                    }
                    {this.state.descModified &&
                        <Text style={styles.options2Text}>- Desc</Text>
                    }
                </View >,
                height: 40,
            }, {
                component: <View
                    style={styles.options2Row}>
                    <Text style={styles.options2Text}>Reset</Text>
                </View >,
                height: 40,
            },
          ]
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.mainContainer}>
                    <DropDown
                        placeholder="Select Filter Type"
                        data={data}
                        handler={this.onSelectGroup} 
                    />
                    {this.state.item == "date" &&
                    <>
                        <CustomTextInput 
                            placeholder="From Date"
                            placeholderTextColor="#707070"
                            inputWrapperStyle={{
                                marginTop: 5,
                                marginBottom: 5,
                                marginHorizontal: 8,
                                
                            }}
                            inputStyle={{
                                paddingVertical: 8,
                            }}
                            editable={false}
                            suffixIcon={true}
                            // onPressSuffixIcon={() => { this.datePicker.onPressDate()}}
                            // value={birthday && birthday.format('DD/MM/YYYY')}
                        />
                        <CustomTextInput 
                            placeholder="To Date"
                            placeholderTextColor="#707070"
                            inputWrapperStyle={{
                                marginBottom: 5,
                                marginHorizontal: 8,
                                
                            }}
                            inputStyle={{
                                paddingVertical: 10,
                            }}
                            editable={false}
                            suffixIcon={true}
                            // onPressSuffixIcon={() => { this.datePicker.onPressDate()}}
                            // value={birthday && birthday.format('DD/MM/YYYY')}
                        />
                    </>
                    }
                    {this.state.item == 'docType'&&
                    <DropDown
                        placeholder="Select Document Type"
                        data={docTypeData}
                        handler={this.onSelectDocument} 
                    />
                    }
                    
                    <ActionSheet
                        ref={this.getActionSheetRef2}
                        title={title2}
                        options={options2}
                        cancelButtonIndex={CANCEL_INDEX2}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX2}
                        onPress={this.handlePress2}
                    />
                    <FlatList 
                        data={DATA}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1}}
                    />
                    
                    {/* <View style={styles.footer}>
                            <TouchableOpacity onPress={this.showActionSheet2}
                                style={{ alignItems: 'center', position: "absolute", left: 10, flexDirection: 'row' }}>
                                <Image source={Images.sort} style={{ width: 30, height: 30, tintColor: '#000' }} />
                                <Text style={styles.footerSort}>Sort</Text>
                            </TouchableOpacity>
                    </View> */}
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
    screenTitleContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0,
        color: '#707070'
    },
    screenTitleBtn: {
        position: 'absolute',
        left: 0,
        padding: 25
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 14
    },
    commonInputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C2C2C2',
        borderStyle: 'solid',
        borderRadius: 15,
        marginBottom: 10
    },
    commonTextInput: {
        padding: 0,
        flex: 1,
        fontSize: 16,
        color: '#707070',
        letterSpacing: 0
    },
    searchRow: {
        flexDirection: 'row',
        // alignItems: 'center',
        // height: 40,
    },
    radiusFilter: {
        // width: 127,
        flex: 1,
        height: 40,
        marginRight: 17
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
    offerItem: {
        paddingVertical: 13,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        borderRadius: 15,
        marginBottom: 10
    },
    offerMainInfo: {
        flexDirection: 'row'
    },
    supplierContainer: {
        alignItems: 'center',
        marginRight: 20
    },
    supplierAvatar: {
        width: 55,
        height: 55
    },
    supplierName: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '700',
        color: '#6A6A6A'
    },
    offerDetail: {
        width: '100%',
        justifyContent: 'space-between'
    },
    offerDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3
    },
    rowIcon: {
        width: 31
    },
    rowLabel: {
        fontSize: 16,
        color: '#707070',
        letterSpacing: 0,
    },
    offerFooter: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 14 
    },
    offerDeliveryCost: { 
        flex: 1, 
        fontSize: 14, 
        color: '#319800', 
        fontWeight: 'bold' 
    },
    
  footer: {
    position: 'absolute',
    height: 50,
    bottom: 0,
    width: "100%",
    backgroundColor: "red"
  },
  footerSort: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: "#000",
    fontSize: 20,
  },
})
