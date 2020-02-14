import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  StyleSheet
} from 'react-native';
import icClose from '../resources/images/ic_dropdown_close.png';
import icCheck from '../resources/images/ic_check.png';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class DropDown extends React.Component {
  constructor(props, context) {
    super(props, context);

    var selectIndex = -1
    this.state = {
      isOpen: false,
      selectIndex: selectIndex,
      selectTitle: this.props.placeholder,
      textColor: '#999797',
      rotationAnims: new Animated.Value(0),
      openStyle: {
        height: 44
      },
      opacity: 0
    };

    this.defaultConfig = {
      bgColor: '#eeeeee',
      hintColor: '#999797',
      tintColor: '#999797',
      activityTintColor: "#999797",
      arrowImg: icClose,
      checkImage: icCheck
    };

  }

  renderChcek(index, title) {
    if (this.state.selectIndex == index) {
      var checkImage = this.props.checkImage ? this.props.checkImage : this.defaultConfig.checkImage;
      return (
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 15, flexDirection: 'row' }} >
          <Text
            style={[
              styles.item_text_style,
              this.props.optionTextStyle,
              { color: this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor }
            ]} >
            {title}
          </Text>
          <Image
            source={checkImage}
            style={styles.ic_check} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 15, flexDirection: 'row' }} >
          <Text style={[
            styles.item_text_style,
            this.props.optionTextStyle,
            { color: this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor }
          ]} >{title}</Text>
        </View>
      );
    }
  }

  renderActivityPanel() {
    var currentTitles = this.props.data;

    var heightStyle = {};
    heightStyle.height = currentTitles.length * 44 > 220 ? 220 : currentTitles.length * 44;
    if (this.props.maxHeight && this.props.maxHeight < heightStyle.height) {
      heightStyle.height = this.props.maxHeight;
    }

    return (
      <View style={[styles.active_pane, { opacity: this.state.opacity }]}>
        <TouchableOpacity onPress={() => this.openOrClosePanel()} activeOpacity={1} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <View style={{ opacity: 0.4, backgroundColor: 'white', flex: 1 }} />
        </TouchableOpacity>

        <ScrollView style={[styles.scroll_view, heightStyle]} >
          {
            currentTitles.map((title, index) =>
              <TouchableOpacity activeOpacity={0.5} style={{ flex: 1, height: 44 }} onPress={this.itemOnPress.bind(this, index)} >
                {this.renderChcek(index, title)}
                <View style={{ backgroundColor: '#F6F6F6', height: 1, marginLeft: 15 }} />
              </TouchableOpacity>
            )
          }
        </ScrollView>
      </View>
    );
  }

  openOrClosePanel() {
    if (this.state.isOpen) {
      this.closePanel();
    }
    else {
      this.openPanel();
    }
  }

  openPanel() {
    Animated.timing(
      this.state.rotationAnims,
      {
        toValue: 0.5,
        duration: 300,
        easing: Easing.linear
      }
    ).start();

    this.setState({
      isOpen: true,
      openStyle: {
        height: DEVICE_HEIGHT
      },
      opacity: 1
    })
  }

  closePanel() {
    Animated.timing(
      this.state.rotationAnims,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }
    ).start();

    this.setState({
      isOpen: false,
      openStyle: {
        height: 44
      },
      opacity: 0
    })
  }

  itemOnPress(index) {
    var selectIndex = this.state.selectIndex;
    selectIndex = index;
    this.setState({
      selectIndex: selectIndex,
      textColor: '#333333',
      selectTitle: this.props.data[index]
    });
    if (this.props.handler) {
      this.props.handler(index);
    }
    this.openOrClosePanel();
  }

  renderDropDownArrow() {
    var icon = this.props.arrowImg ? this.props.arrowImg : this.defaultConfig.arrowImg;
    return (
      <Animated.Image
        source={icon}
        style={{
          width: 30,
          height: 30,
          marginLeft: 8,
          tintColor: this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor,
          transform: [{
            rotateZ: this.state.rotationAnims.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }]
        }} />
    );
  }

  render() {

    return (
      <View style={[styles.container, this.state.openStyle]} >
        <View style={{
          flexDirection: 'row',
          backgroundColor: this.props.bgColor ? this.props.bgColor : this.defaultConfig.bgColor
        }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.openOrClosePanel.bind(this)}
            style={{ flex: 1, height: 42, alignItems: "center", justifyContent: "center" }} >
            <View style={styles.dropdown_content} >
              <Text
                style={[
                  { color: this.state.textColor },
                  styles.title_style,
                  this.props.titleStyle,
                ]}>
                {this.state.selectTitle}
              </Text>
              {this.renderDropDownArrow()}
            </View>
          </TouchableOpacity>
        </View>

        {this.renderActivityPanel()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    dropdown_content: {
      width: '100%',
      paddingLeft: 10,
      flex: 1, 
      flexDirection: 'row', 
      alignItems: "center", 
      justifyContent: "space-between"
    },
    title_style: {
      fontSize: 14
    },
    item_text_style: {
      color: '#333333',
      fontSize: 14
    },
    active_pane: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 44,
      bottom: 0,
    },
    scroll_view: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    },
    ic_check: {
      width: 20,
      height: 20,
      tintColor: '#6ad583'
    }
})
export default DropDown;