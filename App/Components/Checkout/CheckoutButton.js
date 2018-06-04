/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';



const { height, width } = Dimensions.get('window');
export default class CheckoutButton extends Component {
  _renderLoadingBtn() {
    return(
      <View style={{position:'absolute',
                    alignItems:'center',
                    justifyContent:'center',
                    bottom:0,
                    width:width,
                    backgroundColor:'#ff7685',
                    height:60,}}>
          <Image source={require('./Img/Loading_dots_white.gif')} style={{width:45,height:15}}/>
      </View>
    )
  }
  _renderAddAddressBtn() {
      return(
        <TouchableOpacity  style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={this.props.goToAddress}
          activeOpacity={0.4}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{color:'#ffffff',
                            fontSize:20,
                            fontFamily:'FZZhunYuan-M02S'}}
                    allowFontScaling={false}>
                添加配送地址
              </Text>
          </View>
        </TouchableOpacity>
      )
  }
  _renderAddCardBtn() {
      return(
        <TouchableOpacity  style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={this.props.goToAddCard}
          activeOpacity={0.4}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{color:'#ffffff',
                            fontSize:20,
                            fontFamily:'FZZhunYuan-M02S'}}
                    allowFontScaling={false}>
                添加支付方式
              </Text>
          </View>
        </TouchableOpacity>
      )
  }
  _renderCheckoutBtn() {
    return(
      <TouchableOpacity  style={{
                position:'absolute',
                bottom:0,
                width:width,
                height:60,
                backgroundColor:'#ff7685',}}
        onPress={this.props.doCheckout}
        activeOpacity={0.4}>
        <View style={{flex:1,
                      alignItems:'center',
                      justifyContent:'center',}}>
            <Text style={{color:'#ffffff',
                          fontSize:20,
                          fontFamily:'FZZhunYuan-M02S'}}
                  allowFontScaling={false}>
              确认下单
            </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderBtn(){
    switch(this.props.checkoutStatus){
      case "loading":
        return this._renderLoadingBtn();
      break;
      case "shouldDoAuth":
        return this._renderLoadingBtn();
      break;
      case "soldOut":
        return this._renderLoadingBtn();
      break;
      case "shouldAddAddress":
        return this._renderAddAddressBtn();
      break;
      case "shouldAddCard":
        return this._renderAddCardBtn();
      break;
      case "readyToCheckout":
        return this._renderCheckoutBtn();
      break;

    }
  }
  render() {
    return (
      <View style={{
                position:'absolute',
                bottom:0,
                width:width,
                height:60,
                backgroundColor:'#ff7685',}}>
        {this._renderBtn()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
