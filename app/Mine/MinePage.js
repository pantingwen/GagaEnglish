import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Dimensions,Alert} from 'react-native';

var {height, width} = Dimensions.get('window');

import theme from '../common/theme';

export default class MinePage extends Component{
	static navigationOptions=({navigation})=>({
		headerStyle:{
			backgroundColor:theme.color,		
		}
	});
	render(){
		return (
			<View style={styles.container}>
				<View style={styles.headImage}><Image style={styles.headImagePic} source={require("../img/Mine/head_image.png")}/></View>
				<View style={styles.operationList}>
					<TouchableOpacity style={styles.operationListItem} onPress={()=>this.onPressVip()}>
						<Image source={require("../img/Mine/vip@2x.png")}/>
						<Text style={styles.operationListItemText}>超级会员</Text>	
						<Image source={require("../img/Public/cell_arrow.png")}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.operationListItem} onPress={()=>this.onPressCollect()}>
						<Image source={require("../img/Mine/my_collect@2x.png")}/>
						<Text style={styles.operationListItemText}>我的收藏</Text>	
						<Image source={require("../img/Public/cell_arrow.png")}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.operationListItem} onPress={()=>this.onPressTheme()}>
						<Image source={require("../img/Mine/my_theme@2x.png")}/>
						<Text style={styles.operationListItemText}>主题设置</Text>	
						<Image source={require("../img/Public/cell_arrow.png")}/>
					</TouchableOpacity>
					<View style={{marginTop:10}}>
						<TouchableOpacity style={styles.operationListItem} onPress={()=>this.onPressAboutMe()}>
							<Image source={require("../img/Mine/about_me@2x.png")}/>
							<Text style={styles.operationListItemText}>关于作者</Text>	
							<Image source={require("../img/Public/cell_arrow.png")}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>		
		)
	}

	onPressAboutMe(){
		this.props.navigation.navigate("AboutMePage");
	}

	onPressTheme(){
		this.props.navigation.navigate("ThemePage");
	}

	onPressVip(){
		Alert.alert(
		  '确认信息',
		  '你还不是vip会员，是否确认加入会员',
		  [
		    {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},
		    {text: 'OK', onPress: () => this.onPressVipOk()},
		  ],
		  { cancelable: false }
		)
	}
	onPressVipOk(){
		Alert.alert(
			'提示信息',
			'欢迎您加入vip会员'
		);
	}
	onPressCollect(){
		Alert.alert('提示信息','您没有任何收藏信息');
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
	},
	headImage:{
		marginTop:10,
		alignItems:'center',
		padding:5,
		backgroundColor:'#fff',
	},
	headImagePic:{
		width:80,
		height:80,
	},
	operationList:{
		marginTop:10,
	},
	operationListItem:{
		marginTop:1,
		paddingLeft:20,
		flexDirection:'row',
		height:40,
		justifyContent:'flex-start',
		alignItems:'center',
		backgroundColor:'#fff'
	},
	operationListItemText:{
		textAlign:'left',
		width:width*0.75,
	}
});
