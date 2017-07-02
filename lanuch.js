/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  AppRegistry,
  AsyncStorage,
} from 'react-native';

import Root from "./app/Root";

export default class GagaEnglish extends Component {
	constructor(props){
		super();
		this.state={
			theme_color:'',
		};
	}

	componentDidMount(){
		AsyncStorage.getItem("theme_color").then((data)=>{
			this.setState({
				theme_color:data	
			});		
		});
	}
	render() {
		return (
			<Root theme_color={this.state.theme_color}/>
		 );
	}
}

AppRegistry.registerComponent('GagaEnglish', () => GagaEnglish);
