import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Slider,TouchableOpacity,Dimensions,Button,AsyncStorage,Alert} from 'react-native';

import Video from 'react-native-video';

import theme from '../common/theme';

var {height, width} = Dimensions.get('window');


const RNFS=require("react-native-fs");

let jobId=-1;

var fullUri="";


class DownLoadButton extends Component{
	constructor(){
		super();
		this.state={
			buttonTitle:'下载'
		}
	}
	render(){
		return (
			<Button title={this.state.buttonTitle} onPress={()=>this.onPressDownload(this.props.id)}/>
			)
	}
	

	onPressDownload(id){
		fetch("http://voa.jiaoninmai.com/detail.php?id="+id).then((response)=>response.json()).then((response)=>{
			console.log(response);
			console.log("begin to loading"+response);
			var fullUri=response.full_url;
			var fullUris= fullUri.split("/");
			console.log(fullUris);
			var downloadDesc= RNFS.DocumentDirectoryPath+"\/"+fullUris[4];
			console.log(downloadDesc);
			var res=RNFS.exists(downloadDesc);
			res.then((data)=>{
				console.log("data is:"+typeof(data) );
				if(data){
					this.setState({
						buttonTitle:'已下载过'
					});
					Alert.alert('提醒','你之前已经下载过该文件～');
				}else{
					this.downloadFile(response,1);
				}
			});
			
		});
	}

	downloadFile(response,background){
		var fullUri=response.full_url;
		const progressDivider = 1;
		console.log("loading"+fullUri);
		if(jobId!=='-1'){
			console.log("a download is already in progress");
		}

		const begin=res=>{
			console.log("beging to loading");
		}

		const progress=data=>{
			console.log(data);
			var percent=data.bytesWritten/data.contentLength;
			percent=percent.toFixed(2)*100;
			percent=percent.toString();
			if(percent.length<=3){
				this.setState({
					buttonTitle:percent.toString()+"%"
				});
			}
		}

		var fullUris= fullUri.split("/");
		console.log(fullUris);
		const downloadDesc= RNFS.DocumentDirectoryPath+"\/"+fullUris[4];
		const ret = RNFS.downloadFile({ fromUrl: fullUri, toFile: downloadDesc, begin, progress, background, progressDivider });

    	jobId = ret.jobId;

    	ret.promise.then(res=>{
			AsyncStorage.getItem("download_voa_list").then((data)=>{
				if(data){
					var download_voa_list=JSON.parse(data);
				}else{
					var download_voa_list=new Array();
				}
				download_voa_list.push(response);
				AsyncStorage.setItem("download_voa_list",JSON.stringify(download_voa_list));
			});
    		console.log("download success");
    	}).catch(err=>{
    		 console.log(`ERROR: Code: ${err.code} Message: ${err.message}`);
    	});

		console.log(downloadDesc);
	}
}

class HomeDetail extends Component{
	static navigationOptions=({navigation})=>({
		headerTitle:'列表详情',
		headerStyle:{
			backgroundColor:theme.color
		},
		headerRight:(
			<DownLoadButton id={navigation.state.params.id}/>
		)
	})

	constructor(){
		super();
		this.state={
			dataItem:{},
			pause:false,
			isLoaded:false
		};
	}
	componentDidMount(){
		console.log("begin to load data");
		this.refreshData();
	}

	refreshData(){
		var id=this.props.navigation.state.params.id;
		fetch("http://voa.jiaoninmai.com/detail.php?id="+id).then((response)=>response.json()).then((response)=>{
			this.setState({
				dataItem:response,
				pause:false,
				isLoaded:true
			});
			console.log(response);
		});
	}
	render(){
		if(this.state.isLoaded){
			return(
				<View style={styles.container}>
					<View style={styles.body}>
						<Text style={styles.title}>{this.state.dataItem.name}</Text>
						<ScrollView>
							<Text style={styles.content}>{this.state.dataItem.content}</Text>
						</ScrollView>
					</View>
					<HomeDetailFooter fullUri={this.state.dataItem.full_url}/>
				</View>		
			);
		}else{
			return(
				<View style={styles.container}>
					<View style={styles.body}>
						<Text style={styles.title}>{this.state.dataItem.name}</Text>
						<ScrollView>
							<Text style={styles.content}>{this.state.dataItem.content}</Text>
						</ScrollView>
					</View>
				</View>		
			);
		}
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
		console.log("uri is:"+this.props.fullUri);
		var fullUris=this.props.fullUri.split("/");
		const fileLocalPath= RNFS.DocumentDirectoryPath+"\/"+fullUris[4];
		var ret=RNFS.exists(fileLocalPath);
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

export default HomeDetail;
