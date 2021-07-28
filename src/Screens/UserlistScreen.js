import React from 'react'
import {View, Image, TextInput,ImageBackground, Dimensions, Text, CheckBox, TouchableOpacity } from 'react-native';
import logoImg from '../../person.png';
import backgroundImg from '../../background.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import Time from 'react-native-vector-icons/Entypo'
import BackIcon from 'react-native-vector-icons/Ionicons';
import LogoutIcon from 'react-native-vector-icons/Feather'

const width = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)
class Login extends React.Component{
    render(){
        return(
            <View style={{flex: 1}}>
                <ImageBackground source={backgroundImg} style={{width:width, height:height}}>
                    <View style={{height:60,justifyContent:'center',alignItems:'center', backgroundColor:'white',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                        <Text style={{fontSize:17}}> Select user</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{height:70,  alignItems:'center', justifyContent:'center'}}>
                            <View style={{height:50, alignItems:'center',flexDirection:'row', width:width/1.1, backgroundColor:'white', borderRadius:50 ,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                                <View style={{height:50, width:50, borderRadius:50, backgroundColor:'red'}}>
                                    <Image source={logoImg} style={{height:50, width:50}}/>
                                </View>
                                <View >
                                    <Text>Johnissimus Van-Doe</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'gray'}}>User ID:</Text>
                                        <Text style={{color:'gray'}}>54845</Text>
                                    </View>                                
                                </View>
                                <BackIcon 
                                style={{position:'absolute', right:10}}
                                    name = "ios-arrow-forward"
                                    size={20}
                                    color="black"/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{height:70,  alignItems:'center', justifyContent:'center'}}>
                            <View style={{height:50, alignItems:'center',flexDirection:'row', width:width/1.1, backgroundColor:'white', borderRadius:50 ,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                                <View style={{height:50, width:50, borderRadius:50, backgroundColor:'red'}}>
                                    <Image source={logoImg} style={{height:50, width:50}}/>
                                </View>
                                <View >
                                    <Text>Johnissimus Van-Doe</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'gray'}}>User ID:</Text>
                                        <Text style={{color:'gray'}}>54845</Text>
                                    </View>                                
                                </View>
                                <BackIcon 
                                style={{position:'absolute', right:10}}
                                    name = "ios-arrow-forward"
                                    size={20}
                                    color="black"/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{height:70,  alignItems:'center', justifyContent:'center'}}>
                            <View style={{height:50, alignItems:'center',flexDirection:'row', width:width/1.1, backgroundColor:'white', borderRadius:50 ,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                                <View style={{height:50, width:50, borderRadius:50, backgroundColor:'red'}}>
                                    <Image source={logoImg} style={{height:50, width:50}}/>
                                </View>
                                <View >
                                    <Text>Johnissimus Van-Doe</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'gray'}}>User ID:</Text>
                                        <Text style={{color:'gray'}}>54845</Text>
                                    </View>                                
                                </View>
                                <BackIcon 
                                style={{position:'absolute', right:10}}
                                    name = "ios-arrow-forward"
                                    size={20}
                                    color="black"/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{height:70,  alignItems:'center', justifyContent:'center'}}>
                            <View style={{height:50, alignItems:'center',flexDirection:'row', width:width/1.1, backgroundColor:'white', borderRadius:50 ,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                                <View style={{height:50, width:50, borderRadius:50, backgroundColor:'red'}}>
                                    <Image source={logoImg} style={{height:50, width:50}}/>
                                </View>
                                <View >
                                    <Text>Johnissimus Van-Doe</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'gray'}}>User ID:</Text>
                                        <Text style={{color:'gray'}}>54845</Text>
                                    </View>                                
                                </View>
                                <BackIcon 
                                style={{position:'absolute', right:10}}
                                    name = "ios-arrow-forward"
                                    size={20}
                                    color="black"/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                    <View style={{marginLeft:22,flex:0.2, width:width/1.1, paddingHorizontal:10, justifyContent:'space-between', paddingVertical:8, position:'absolute', bottom:50}}>
                        <TouchableOpacity>
                            <View style={{height:50, justifyContent:'center', alignItems:'center', borderRadius:3,backgroundColor:'white',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                    <LogoutIcon 
                                        name = "log-out"
                                        size={20}
                                        color="black"/>
                                    <Text style={{color:'black', fontSize:18, marginLeft:15}}>Log out</Text>
                                </View>                           
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                
            </View>
        )
    }
}

export default Login;