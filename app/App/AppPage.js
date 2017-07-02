import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,AsyncStorage} from 'react-native';

var {height, width} = Dimensions.get('window');

import theme from '../common/theme';

export default class AppPage extends Component{
	static navigationOptions=({navigation})=>({
		headerStyle:{
			backgroundColor:theme.color,
		}				
	});
	onPressDownload(){
		console.log("ok");
		AsyncStorage.getItem("download_voa_list").then((data)=>{
			var download_voa_list=JSON.parse(data);
			this.props.navigation.navigate("AppDownloadPage",{data:download_voa_list});
		});
	}
	render(){
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.appItem} onPress={()=>this.onPressDownload()}>
					<Text style={styles.appItemText}>已下载</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.appItem}>
					<Text style={styles.appItemText}>单词本</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.appItem}>
					<Text style={styles.appItemText}>帮助</Text>
				</TouchableOpacity>
			</View>		
		)
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'row'
	},
	appItem:{
		flex:1,
		width:height*0.1,
		margin:10,
		height:height*0.15,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'white'
	},
	appItemText:{
		textAlign:'center',
		fontSize:width*0.08,
	}
});

