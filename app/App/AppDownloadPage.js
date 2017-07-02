import React,{Component} from 'react';
import {View,Text,ListView} from 'react-native';

import theme from '../common/theme';

import AppDownloadListItem from './AppDownloadListItem';
import AppDownloadDetail from './AppDownloadDetail';

class AppDownloadPage extends Component{
	static navigationOptions=({navigation})=>({
		headerStyle:{
			backgroundColor:theme.color
		}
	});

	constructor(){
		super();
		var ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
		this.state={
			refreshing:false,
			dataSource:ds.cloneWithRows([])
		}
	}

	componentDidMount(){
		var download_voa_list=this.props.navigation.state.params.data;
		this.setState({
			dataSource:this.state.dataSource.cloneWithRows(download_voa_list),
		});
	}

	render(){
		return(
			<ListView
				enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={(rowData)=>this.renderRow(rowData)}
			/>
		);
	}

	renderRow(rowData){
		return(
			<AppDownloadListItem rowData={rowData} onItemPress={(rowData)=>this.onItemPress(rowData)}/>
		)
	}

	onItemPress(rowData){
		this.props.navigation.navigate("AppDownloadDetail",{data:rowData});
	}
}
export default AppDownloadPage;
