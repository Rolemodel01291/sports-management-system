import React from 'react'
import {View, Image, TextInput,ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import backgroundImg from '../../background.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import logoImg from '../../person.png';
import firebase from 'react-native-firebase';

const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)
// var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]

class AddprofileScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name    :'',
            age     :'',
            height  :'',
            weight  :'',
            firstImg:'',
            loading :false
        }
    }
    
    selectPhotoTapped = (data) => {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };    
        ImagePicker.showImagePicker(options, async (response) => {
            console.log('Response = ', response);    
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {                  
                    this.setState({firstImg: response.uri})
                    await this.uploadImage(response.uri.toString(),"first")                       
                }
        });
    }

    uploadImage = (image, index) => {
        this.setState({loading:true})
        let filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        firebase.storage().ref('products/'+ filename).putFile(image)
        .then(data=>{
            console.log(data.downloadURL)
            if(index==='first'){
                this.setState({firstImg:data.downloadURL})
                this.setState({loading:false})
            }
        })
    }

    componentDidUpdate(){
        // console.log("===================", this.props.addprofile)
        if (this.props.addprofile.state==='Success'){
            this.props.navigation.goBack()
        }     
    }
    addProfile =async () => {
        const {name, age, weight, height, firstImg} = this.state
        
        let guard = ''
        if (parseInt(height)<177){
            
            guard = "Point"
            
        } else if (parseInt(height)>177 && parseInt(height)<=185 ) {
            guard = "Shooting"
        } else if (parseInt(height)>185 && parseInt(height)<190 ) {
            guard = "Forward"
        } else if (parseInt(height)>=190) {
            guard = "Center"
        }
 
        console.log("================",guard)
        let id = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 7);
        var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]
        const data = {
            name: name,
            age: age,
            weight:weight,
            height:height,
            firstImg:firstImg,
            uid: id,
            guard:guard,
            
            month:monthNames[new Date().getMonth()]
        }
        monthNames[new Date().getMonth()]
        firebase.database().ref(`members/${id}/`).set(data)
        
        firebase.database().ref(`members/${id}/attend/${monthNames[new Date().getMonth()]}`).set({
            absent:'0', present:'0'
        })
        .then(data=>{this.props.navigation.goBack()})
        // this.props.addProfile(data)
    }
    render(){
        // console.log(new Date().getMonth() + 1)
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <ImageBackground source={backgroundImg} style={{width:width, height:height/1.039}}>
                        <View style={{height:65, alignItems:'center', justifyContent:'flex-start',flexDirection:'row', backgroundColor:'#d6d4d4'}}> 
                            <TouchableOpacity onPress = {()=>this.props.navigation.goBack()}>                         
                                <Icon 
                                    style={{marginLeft:25}}
                                    name = "arrow-left"
                                    size={20}
                                    color="gray"/>
                            </TouchableOpacity> 
                        </View>
                        <View style={{flex:0.3, justifyContent:'center'}}>
                            <TouchableOpacity style={{height:100, margin:5, alignItems:'center', justifyContent:'center'}}
                                onPress = {()=>this.selectPhotoTapped("firstImg")}>
                                    {this.state.firstImg!==''?
                                    <Image source={{uri:this.state.firstImg}} style = {{height:100, width:100, borderRadius:100 }}/> 
                                    :
                                    <Image source={ logoImg } style = {{height:100, width:100, }}/>                                  
                                    }      
                            </TouchableOpacity>  
                        </View>
                        <View style={{flex:0.65, padding:10, paddingHorizontal:20}}>
                            <Text> Please input your information</Text>
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Your name"
                                value={this.state.name}
                                onChangeText={(name)=>this.setState({name})}>
                            </TextInput>
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Your age"
                                value={this.state.age}
                                keyboardType={'numeric'}
                                onChangeText={(age)=>this.setState({age})}>
                            </TextInput>
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Your height"
                                value={this.state.height}
                                keyboardType={'numeric'}
                                onChangeText={(height)=>this.setState({height})}>
                            </TextInput>
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Your weight"
                                value={this.state.weight}
                                keyboardType={'numeric'}
                                onChangeText={(weight)=>this.setState({weight})}>
                            </TextInput>
                            
                            
                        </View>
                        <View style={{flex:0.09, paddingHorizontal:10}}>                       
                            <View style={{flex:0.03,flexDirection:'row',marginTop:8, backgroundColor:'gray'}} />
                        </View>
                        <View style={{flex:0.2, paddingHorizontal:10, justifyContent:'space-between', paddingVertical:8}}>                        
                            <TouchableOpacity onPress={this.props.reduxIncreaseCounter} onPress={this.addProfile}>
                                <View style={{height:50, justifyContent:'center', alignItems:'center', borderRadius:3,backgroundColor:'#DFDFDF',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>                                    
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <Icon 
                                            name = "user-circle-o"
                                            size={20}
                                            color="white"/>
                                        <Text style={{color:'white', fontSize:18, marginLeft:15}}>Add Profile</Text>
                                    </View>                           
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                        {/* <Text>{String(JSON.stringify(this.props.user) )}</Text> */}
                    </ImageBackground>
                </ScrollView>                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('State:');
    console.log(state);
    return {
      user: state.counter.user,
      addprofile: state.counter.addProfileResult,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        addProfile: (data) => dispatch({
            type: 'ADD_PROFILE',
            value: data,
        }),     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddprofileScreen);
