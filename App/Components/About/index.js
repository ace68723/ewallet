'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
	ListView,
	StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
	Text,
  View,
} from 'react-native';

// import UserAction from '../../Actions/UserAction';
import UserStore from '../../Stores/UserStore';
import SboxHeader from '../SboxHeader';
import AuthAction from  '../../Actions/AuthAction';

const { height, width } = Dimensions.get('window');

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
        shouldDoAuth: true,
    }
    this._goToHistory = this._goToHistory.bind(this);
    this._login = this._login.bind(this);
    this._handleLoginSuccessful = this._handleLoginSuccessful.bind(this);
    this._goBack = this._goBack.bind(this);
    this._contact = this._contact.bind(this);
    this._onChange = this._onChange.bind(this);
    this._logout = this._logout.bind(this);
		this._goToCmEat = this._goToCmEat.bind(this);
  }
	componentDidMount() {
    UserStore.addChangeListener(this._onChange);
		// UserAction.checkUserLogin();
	}
  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    const state = Object.assign({},UserStore.getState());
    this.setState(state);
  }

  _goToHistory() {
    this.props.navigator.push({
      screen: 'SboxHistory',
      navigatorStyle: {navBarHidden: true},
    })
  }
  _login() {
    this.props.navigator.showModal({
      screen: 'CmLogin',
      animated: false,
      navigatorStyle: {navBarHidden: true},
      passProps: {handleBackToHome: this._goBack,handleLoginSuccessful: this._handleLoginSuccessful},
    })
  }

  _logout() {
    AuthAction.logout();
    this.props.handleBackToHome();
  }

	_goToCmEat() {
		this.props.navigator.resetTo({
				screen: 'cmHome',
				animated: true,
				animationType: 'fade',
				navigatorStyle: {navBarHidden: true},
				passProps:{goToCmEat: true}
			});
	}

  _contact() {
    this.props.navigator.push({
      screen: 'SboxAboutContact',
      navigatorStyle: {navBarHidden: true},
    })
  }

  _handleLoginSuccessful() {
    // UserAction.checkUserLogin();
    // this.props.navigator.dismissModal();
  }

  _goBack() {
    // this.props.navigator.dismissModal();
  }

  _renderLoginOrHistory() {
    if (this.state.shouldDoAuth == false) {
      return (
        <TouchableOpacity onPress={this._goToHistory}
            activeOpacity={0.4}
            style={{flexDirection: 'row',
										paddingTop: 10,
										paddingBottom: 10,
										alignItems: 'center',
										backgroundColor: 'white'}}>
            <Image style={{height: 30,
													 width: 30,
													 marginLeft: 20,
													 marginRight: 20,}} source={require('./img/login.png')}/>
            <Text style={{flex: 1,
													fontSize: 18,
													textAlign: 'left'}}
									allowFontScaling={false}>
									我的订单
						</Text>
            <Image style={{height: 20, width: 20, marginRight:20,}} source={require('./img/right.png')}/>
        </TouchableOpacity>
      )
    }else {
      return (
        <TouchableOpacity onPress={this._login}
            activeOpacity={0.4}
            style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center', backgroundColor: 'white'}}>
            <Image style={{height: 30, width: 30,
													 marginLeft: 20,
													 marginRight: 20,}}
									 source={require('./img/login.png')}/>
            <Text style={{flex: 1,
													fontSize: 18,
													textAlign: 'left'}}
									allowFontScaling={false}>登入</Text>
            <Image style={{height: 20, width: 20, marginRight:20,}} source={require('./img/right.png')}/>
        </TouchableOpacity>
      )
    }
  }

  _renderContact() {
    return (
      <TouchableOpacity onPress={this._contact}
          activeOpacity={0.4}
          style={{flexDirection: 'row',
									paddingTop: 10,
									paddingBottom: 10,
									alignItems: 'center',
									backgroundColor: 'white'}}>
          <Image style={{height: 30,
												 width: 30,
												 marginLeft: 20,
												 marginRight: 20,}}
								 source={require('./img/contact.png')}/>
          <Text style={{flex: 1,
												fontSize: 18,
												textAlign: 'left'}}
								allowFontScaling={false}>联系客服</Text>
          <Image style={{height: 20,
												 width: 20,
												 marginRight:20,}}
								 source={require('./img/right.png')}/>
      </TouchableOpacity>
    )
  }

  _renderLogout() {
    if (this.state.shouldDoAuth == false) {
      return (
        <TouchableOpacity onPress={this._logout}
            activeOpacity={0.4}
            style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center', backgroundColor: 'white'}}>
            <Image style={{height: 30, width: 30, marginLeft: 20, marginRight: 20,}} source={require('./img/exit.png')}/>
            <Text style={{flex: 1, fontSize: 18, textAlign: 'left'}}
									allowFontScaling={false}>登出</Text>
            <Image style={{height: 20, width: 20, marginRight:20,}} source={require('./img/right.png')}/>
        </TouchableOpacity>
      )
    }
  }

	_renderCmEat() {

	   if (this.state.shouldDoAuth == false) {
			return(
				<TouchableOpacity onPress={this._goToCmEat}
						activeOpacity={0.4}
						style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center', backgroundColor: 'white'}}>
						<Image style={{height: 30, width: 30, marginLeft: 20, marginRight: 20,}} source={require('./img/chanmao.png')}/>
						<Text style={{flex: 1, fontSize: 18, textAlign: 'left'}}
									allowFontScaling={false}>馋猫订餐</Text>
						<Image style={{height: 20, width: 20, marginRight:20,}} source={require('./img/right.png')}/>
				</TouchableOpacity>
			)
		}
	}

  render() {
    return(
      <View style={styles.viewController}>
          <SboxHeader title={"设置"}
                  goBack={this._renderGoBackBtn}
                  leftButtonText={'none'}/>
					<ScrollView style={{backgroundColor: '#efefef'}}>
              {this._renderLoginOrHistory()}
              <View style={styles.separator}></View>
              {this._renderContact()}
							<View style={styles.separator}></View>
							{this._renderCmEat()}
              <View style={styles.separator}></View>
              {this._renderLogout()}
          </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
    // backgroundColor: '#D5D5D5',
  },
  navigation: {
    flexDirection:'row'
  },
  back: {
    flex: 1,
    justifyContent:'center',
  },
  title: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:'center',
    // backgroundColor: "blue",
  },
  separator: {
		borderBottomWidth: 1,
		borderColor: "#D5D5D5"
	},
});
