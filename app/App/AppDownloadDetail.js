import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Slider,TouchableOpacity,Dimensions,Button,AsyncStorage} from 'react-native';

import Video from 'react-native-video';

import theme from '../common/theme';

var {height, width} = Dimensions.get('window');


const RNFS=require("react-native-fs");

let jobId=-1;

var fullUri="";

class AppDownloadDetail extends Component{

	static navigationOptions=({navigation})=>({
		headerStyle:{
			backgroundColor:theme.color
		}
	})

	constructor(){
		super();
		this.state={
			dataItem:{},
			pause:false,
			isLoaded:false
		};
	}
	render(){
		var data=this.props.navigation.state.params.data;
		console.log(data);
		var fullUri=data.full_url;
		var fullUris= fullUri.split("/");
		console.log(fullUris);
		var finalUrl= RNFS.DocumentDirectoryPath+"\/"+fullUris[4];
		return(
			<View style={styles.container}>
				<View style={styles.body}>
					<Text style={styles.title}>{this.props.navigation.state.params.data.name}</Text>
					<ScrollView>
							<Text style={styles.content}>{this.props.navigation.state.params.data.content}</Text>
					</ScrollView>
					<HomeDetailFooter fullUri={finalUrl}/>
				</View>
			</View>		
		);
	}
}

class HomeDetailFooter extends Component{
	constructor(){
		super();
		this.state={
			pause:false,
			playNow:"0",
			operationText:'暂停',
			paused:false,
			progress:0,
			sliderValue:10,
			currentTime:0,
			playableDuration:1,
		};
	}
	onButtonPress(){
		var operationText="";
		var paused=false;
		if(this.state.operationText=='暂停'){
			operationText="播放";	
			paused=true;
		}else if(this.state.operationText=='播放'){
			operationText="暂停";
			paused=false;
		}
		this.setState({
			operationText:operationText,
			paused:paused
		});
	}
	getProgress(offset){
		var progress=this.state.progress+offset;
		return Math.sin(progress % Math.PI) % 1;
	}
	render(){
		return(
			<View style={styles.footer}>
				<Slider style={styles.footerSlider} value={this.state.currentTime} maximumValue={this.state.playableDuration} onSlidingComplete={(value)=>this.refs.video.seek(value)}/>
				<TouchableOpacity onPress={()=>{this.onButtonPress()}}>
					<Text style={styles.footerText}>{this.state.operationText}</Text>
				</TouchableOpacity>
				<Video source={{uri:this.props.fullUri}} ref='video' volume={1.0}  paused={this.state.pause} onProgress={(currentTime)=>this.setTime(currentTime)} paused={this.state.paused}/>
			</View>	
		)
	}

	setTime(currentTime){
		this.setState({
			currentTime:currentTime.currentTime,
			playableDuration:currentTime.playableDuration
		});
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'flex-end',
	},
	body:{
		flex:1,
		justifyContent:'flex-start',
	},
	title:{
		marginTop:10,
		fontSize:18,
		justifyContent:'center',
		textAlign:"center",
	},
	content:{
		margin:10,
		textAlign:'left',
	},
	footer:{
		height:50,
		flexDirection:'row',
		alignItems:'center',		
		justifyContent:'space-around',
		backgroundColor:'#fff'
	},
	footerSlider:{
		width:width*0.7
	},
	footerText:{
		fontSize:20		 
	}
});

export default AppDownloadDetail;
