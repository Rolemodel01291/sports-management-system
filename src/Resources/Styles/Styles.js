import {StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {Dimensions } from "react-native";

const screenHeight = Math.round(Dimensions.get('window').height);

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },       
    splashlogoimagebackground:{
      width : screenWidth,
      height: screenHeight,
      // resizeMode: 'cover',
      alignItems:'center',
      justifyContent:'center',
      
    },
    splashlogoimage:{
      width:320,
      height:300,
    },
    splashlogotext:{
      fontFamily:'Poppins-Black', 
      fontSize:60, 
      color:'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: 4, height: 10},
      textShadowRadius: 10
    },
    loginbackgroundimage:{
      width : screenWidth,
      height: screenHeight/1.05,     
      // alignItems:'center',
      // justifyContent:'center',
      
    },
    profilebackgroundimage:{
      width : screenWidth,
      height: screenHeight,     
      alignItems:'center',
      justifyContent:'center',
      
    }
});

export default styles;