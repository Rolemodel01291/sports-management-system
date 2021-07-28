import React from 'react'
import {View, Image, TextInput,ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import logoImg from '../../Logo.png';
import backgroundImg from '../../background.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Actions from '../actions'
import { connect } from 'react-redux';

const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email           :'',
            password        :'',
            confirmPassword :'',
            loading         :false
        }
    }

    signUp = async () => {
        const {email, password, confirmPassword} = this.state
        if (email === ''){
            alert("Enter Email!")
        } else if (password === '') {
            alert("Enter Password")
        } else if (password!==confirmPassword){
            alert("Confirm password!")
        } else {
            const data = {email:email, password:password}
            await this.props.signUp(data)    
        }         
    }
    
    componentDidUpdate(){        
        if(this.props.user.email){
            this.props.navigation.replace("Login")
        }
    }
    render(){
        
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <ImageBackground source={backgroundImg} style={{width:width, height:height/1.039}}>
                        <View style={{flex:0.4, alignItems:'center', justifyContent:'center'}}>
                            <Image source = {logoImg} style={{height:100, width:100, marginBottom:-50}} />
                        </View>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <Text>basketball team fitness management</Text>
                        </View>
                        <View style={{flex:0.3, padding:10}}>
                            
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Your email"
                                value={this.state.email}
                                onChangeText={(email)=>this.setState({email})}/>
                            
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Password"
                                placeholder="Confirm Password"
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={(password)=>this.setState({password})}/>
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                secureTextEntry={true}
                                onChangeText={(confirmPassword)=>this.setState({confirmPassword})}/>
                            
                        </View>
                        <View style={{flex:0.09, paddingHorizontal:10}}>                       
                            <View style={{flex:0.03,flexDirection:'row',marginTop:8, backgroundColor:'gray'}} />
                        </View>
                        <View style={{flex:0.2, paddingHorizontal:10, justifyContent:'space-between', paddingVertical:8}}>                        
                            <TouchableOpacity onPress={this.signUp}>
                                <View style={{height:50, justifyContent:'center', alignItems:'center', borderRadius:3,backgroundColor:'#DFDFDF',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                                    
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <Icon 
                                            name = "user-circle-o"
                                            size={20}
                                            color="white"/>
                                        <Text style={{color:'white', fontSize:18, marginLeft:15}}>Sign Up</Text>
                                    </View>                           
                                </View>
                            </TouchableOpacity>                            
                        </View>
                    </ImageBackground>
                </ScrollView>                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.counter.user,
    };
  };

const mapDispatchToProps = (dispatch) => {

    return {   
        signUp: (data) => dispatch({
            type: 'SIGN_UP',
            value: data,
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
