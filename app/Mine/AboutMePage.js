import React,{Component} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

import theme from '../common/theme';

class AboutMePage extends Component{
	static navigationOptions=({navigation})=>({
		headerTitle:"关于作者",
		headerStyle:{
			backgroundColor:theme.color,
		}
	})
	render(){
		return (
			<View style={styles.container}>
				<View style={{marginLeft:10}}>
					<Text>nickname:三稳</Text>
					<Text>qq:980502568</Text>
					<Text>wechat:iamsanwen</Text>
				</View>
				<Image style={styles.image} source={require("../img/Mine/me.png")}/>
			</View>		
		);
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'white'
	},
	image:{
		marginTop:20,
		width:130,
		height:130
	}
});

export default AboutMePage;
