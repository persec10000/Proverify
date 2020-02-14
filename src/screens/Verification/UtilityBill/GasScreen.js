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
import GradientHeader from '../../../components/GradientHeader'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icons from '../../../utils/Icons'
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
    }
]

const OfferItem = props => {
    const { supplierName, from, to, time, cost, currency } = props.item
    return(
        <View style={styles.offerItem}>
            <View style={styles.offerFooter}>
                <Text style={styles.offerDeliveryCost}>
                    Delivery from (km):
                </Text>
                <Text style={[styles.offerDeliveryCost, {fontSize: 24, textAlign: 'center'}]}>
                    {cost} {currency}
                </Text>
                <TouchableOpacity 
                    style={[styles.gradientButton, { flex: 2}]}>
                    <LinearGradient 
                        colors={['#E8222B', '#141414']}
                        style={styles.gradienButtonBackground}>
                        <Text style={styles.gradienButtonLabel}>Make Order</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default class GasScreen extends Component {
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
                        GAS CONNECTION
                    </Text>
                </View>
            )
        }
    }

    _renderItem = ({ item }) =>  {
        return <OfferItem item={item} navigation={this.props.navigation}/>
    }

    _keyExtractor = (item, index) => { return index.toString() }

    render() {
        return (
            <View style={styles.container}>               
                <SafeAreaView style={styles.mainContainer}>
                    <View style={[styles.commonInputContainer, styles.locationField]}>
                        <TextInput
                            placeholder="Location"
                            style={styles.commonTextInput}
                            />
                    </View>
                    <TouchableWithoutFeedback style={[styles.commonInputContainer, styles.timeDateField]}>
                        <TextInput
                            placeholder="Time/ Date"
                            editable={false}
                            style={styles.commonTextInput} />
                      
                    </TouchableWithoutFeedback>
                    <View style={styles.searchRow}>
                       
                        <TouchableOpacity style={[styles.gradientButton, { flex: 2}]}>
                            <LinearGradient 
                                colors={['#E8222B', '#141414']}
                                style={styles.gradienButtonBackground}>
                                <Text style={styles.gradienButtonLabel}>Search</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        data={DATA}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1}}
                        />
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
    }
})
