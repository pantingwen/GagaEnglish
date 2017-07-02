import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native';

import theme from '../common/theme';

class ThemePage extends Component{
	static navigationOptions=({navigation})=>({
		headerTitle:"主题设置",
		headerStyle:{
			backgroundColor:theme.color,
		}
	})
	render(){
		return(
			<View style={styles.container}>
				<TouchableOpacity onPress={()=>this.onPressTheme("red")}>
					<View style={{height:50,backgroundColor:"red",marginTop:1}}></View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>this.onPressTheme("green")}>
					<View style={{height:50,backgroundColor:"green",marginTop:1}}></View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>this.onPressTheme("yellow")}>
					<View style={{height:50,backgroundColor:"yellow",marginTop:1}}></View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>this.onPressTheme("orange")}>
					<View style={{height:50,backgroundColor:"orange",marginTop:1}}></View>
				</TouchableOpacity>
			</View>		
		)
	}

	onPressTheme(color){
		AsyncStorage.setItem("theme_color",color);
		this.props.navigation.goBack();
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1
	},
});

export default ThemePage;
