import {AsyncStorage} from 'react-native';
const theme={
	color:"red"
};
AsyncStorage.getItem("theme_color").then((data)=>{
	theme.color=data		
});

export default theme;
