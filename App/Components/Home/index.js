/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ProductListModule from './../../Modules/ProductListModule/ProductListModule'
export default class Home extends Component {
  constructor(props)
  {
    super(props);
    this._getProductList=this._getProductList.bind(this);
  }
  async componentDidMount()
  {
    const list=await this._getProductList();
  }
  async _getProductList()
  {
    try {
      const result=await ProductListModule.getProductList()
      console.log(result);
    } catch (e) {
      console.log(e);
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Home component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
