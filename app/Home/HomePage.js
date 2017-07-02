import React,{Component} from 'react';
import {View,Text,StyleSheet,ListView,RefreshControl,AsyncStorage} from 'react-native';

import NavigationItem from '../Components/NavigationItem';
import HomeListItem from './HomeListItem';

import theme from '../common/theme'

export default class HomePage extends Component{
	static navigationOptions=({navigation})=>({
		headerStyle:{
			backgroundColor:theme.color,
		},
	});
	//构造函数
	constructor(){
		super();
		var ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
		this.state={
			refreshing:false,
			dataSource:ds.cloneWithRows([])
		}
	}

	componentDidMount(){
		this.setState({
			refreshing:false		
		});
		this.refreshData();
	}


	refreshData(){
		/*
		AsyncStorage.getItem("voa_list").then((data)=>{
			var dataSourceList=JSON.parse(data);
			console.log(data);
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows(dataSourceList),
				refreshing:false
			});
		});
		*/
		fetch("http://voa.jiaoninmai.com/index.php").then((response)=>response.json()).then((response)=>{this.setState({
			dataSource:this.state.dataSource.cloneWithRows(response),
			refreshing:false
		});AsyncStorage.setItem("voa_list",JSON.stringify(response));});
		console.log("refrshing");
	}

	render(){
		return (
			<ListView
				enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={(rowData)=>this.renderRow(rowData)}
				refreshControl={
					<RefreshControl refreshing={this.state.refreshing}
						onRefresh={()=>this.refreshData()}
						color='gray'
						progressBackgroundColor='red'
					/>
				}
			/>
		)
	}

	renderRow(rowData){
		return(
			<HomeListItem rowData={rowData} onItemPress={(id)=>this.onItemPress(id)}/>
		)
	}

	onItemPress(id){
		console.log(id);
		this.props.navigation.navigate("HomeDetail",{id:id})
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:"red",
		justifyContent:'center',
		alignItems:'center',
	}		
});
