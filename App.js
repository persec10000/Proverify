/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Index from './src/Index';
import { StatusBar, Platform, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { omit } from 'lodash';
import getFontFamily from './src/utils/getFontFamily';


StatusBar.setBarStyle('dark-content')

const setCustomText = customProps => {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    let oldProps = props;
    const style = StyleSheet.flatten([customProps.style, props.style]);
    props = {
      ...props,
      style: (style.fontFamily === 'Raleway' || !style.fontFamily) ? [
        omit(style, 'fontWeight', 'fontStyle'),
        {
          fontFamily: getFontFamily('Raleway', style),
        },
      ] : style,
    };
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

setCustomText({});


const App = () => {
  return (   
    <Index />
  );
};

export default App;
