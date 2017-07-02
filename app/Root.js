import React,{Component} from 'react';
import {Text,View,StatusBar,AsyncStorage} from 'react-native';

import {TabNavigator,StackNavigator,TabBarBottom} from 'react-navigation';

import HomePage from "./Home/HomePage";//首页
import HomeDetail from "./Home/HomeDetail";//详情页面
import AppPage from "./App/AppPage"; //应用首页
import MinePage from "./Mine/MinePage"; //我的首页
import AboutMePage from "./Mine/AboutMePage";//关于作者 详情页
import ThemePage from "./Mine/ThemePage"; //主题设置
import AppDownloadPage from "./App/AppDownloadPage"; //已经下载的列表页面
import AppDownloadDetail from "./App/AppDownloadDetail";//下载之后的详情页面

const lightContentScenes = ['']

import TabBarItem from './Components/TabBarItem';

import SplashScreen from 'react-native-splash-screen';


var theme_color="orange";

export default class Root extends Component{


	componentDidMount(){
		SplashScreen.hide();
	}

	constructor(props){
		super(props)
		StatusBar.setBarStyle('light-content')
		AsyncStorage.getItem("theme_color").then((data)=>{
			console.log("ddddd");
			theme_color=data;		
		});
	}
	render(){
		return (
				<Navigator/>
		);
	}
}

const Tab = TabNavigator({
	Home: {
	screen: HomePage,
	navigationOptions: ({ navigation }) => ({
		tabBarLabel: '首页',
		tabBarIcon: ({ focused, tintColor }) => (
			<TabBarItem
				tintColor={tintColor}
				focused={focused}
				normalImage={require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
			/>)
		}),
	},
	App: {
	screen: AppPage,
	navigationOptions: ({ navigation }) => ({
		tabBarLabel: '应用',
		tabBarIcon: ({ focused, tintColor }) => (
			<TabBarItem
				tintColor={tintColor}
				focused={focused}
				normalImage={require('./img/tabbar/pfb_tabbar_app@2x.png')}
			/>)
		}),
	},
	Mine: {
	screen: MinePage,
	navigationOptions: ({ navigation }) => ({
		tabBarLabel: '我的',
		tabBarIcon: ({ focused, tintColor }) => (
			<TabBarItem
				tintColor={tintColor}
				focused={focused}
				normalImage={require('./img/tabbar/pfb_tabbar_mine@2x.png')}
			/>)
		}),
	},
},
{
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
	swipeEnabled: true,
	lazy: true,
	tabBarOptions: {
		activeTintColor: "#979797",
		activeTintColor: theme_color,
		inactiveTintColor: '#979797',
		style: { backgroundColor: '#ffffff' },
	},
}

);

const Navigator=StackNavigator({
	Tab:{screen:Tab},
	HomeDetail:{screen:HomeDetail},
	AboutMePage:{screen:AboutMePage},
	AppDownloadPage:{screen:AppDownloadPage},
	AppDownloadDetail:{screen:AppDownloadDetail},
	ThemePage:{screen:ThemePage}
},{
	navigationOptions:{
		headerBackTitle:null,
		headerTintColor:'#333333',
		showIcon:true
	}
});
