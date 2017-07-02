import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';

class AppDownloadListItem extends Component{
	render(){
		return(
			<TouchableOpacity onPress={()=>{this.props.onItemPress(this.props.rowData)}}>
				<View style={styles.container}>
					<Text style={styles.title}>{this.props.rowData.name}</Text>
					<View style={styles.author_info}>
						<Text>{this.props.rowData.full_file}</Text>
						<Text>{this.props.rowData.release_date}</Text>
					</View>
				</View>		
			</TouchableOpacity>
		)
	}
}


const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:"white",
		paddingTop:10,
		marginTop:1,
	},
	title:{
		fontSize:16,
		marginLeft:10,
	},
	author_info:{
		flex:1,
		flexDirection:'row',
		marginRight:10,
		justifyContent:'space-between'
	}
});

export default AppDownloadListItem;
