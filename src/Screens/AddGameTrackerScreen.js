import React from 'react'
import {View, Image, TextInput,ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import backgroundImg from '../../background.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import logoImg from '../../person.png';
import firebase from 'react-native-firebase';
import { DatePicker } from 'native-base';

const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)

var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]

class AddGameTrackerScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={           
            point     :'',
            rebounds  :'',
            assists   :'',  
            date      :'',          
            loading   :false
        }
    }

    componentDidMount(){
        
        

    }

    componentDidUpdate(){
        // console.log("===================", this.props.addprofile)
        // if (this.props.addprofile.state==='Success'){
        //     this.props.navigation.goBack()
        // }     
    }
    addGameTracker =async () => {

        console.log(this.state.date)
        console.log(monthNames[this.state.date.split('/')[1]-1])
        
        firebase.database().ref(`members/${this.props.id}/tracker/${monthNames[this.state.date.split('-')[1]-1]}/${this.state.date}`).set({
            date    :this.state.date,
            month   :monthNames[this.state.date.split('-')[1]-1],
            point   :this.state.point,
            rebounds:this.state.rebounds,
            assists :this.state.assists
        }).then(data=>{this.props.navigation.goBack()})
    }
    setDate = (newDate) => {
        // let today = new Date();
        let date=newDate.getDate() + "-"+ parseInt(newDate.getMonth()+1) +"-"+newDate.getFullYear();
        console.log(date)
        this.setState({ date: date });
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
                        <View style={{flex:0.1, justifyContent:'center'}}>

                        </View>
                        <View style={{flex:0.6, padding:10, paddingHorizontal:20}}>
                            <Text> Please input below fields</Text>
                            <DatePicker
                                defaultDate={new Date()}                               
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                                />
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Enter Points"
                                value={this.state.point}
                                keyboardType={'numeric'}
                                onChangeText={(point)=>this.setState({point})}>
                            </TextInput>
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Enter Rebounds"
                                value={this.state.rebounds}
                                keyboardType={'numeric'}
                                onChangeText={(rebounds)=>this.setState({rebounds})}>
                            </TextInput>
                            <TextInput style={{backgroundColor:'white',paddingHorizontal:20, marginTop:10, borderRadius:3,shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
                                placeholder="Enter Assists"
                                value={this.state.assists}
                                keyboardType={'numeric'}
                                onChangeText={(assists)=>this.setState({assists})}>
                            </TextInput>
                            
                            
                        </View>
                        <View style={{flex:0.09, paddingHorizontal:10}}>                       
                            <View style={{flex:0.03,flexDirection:'row',marginTop:8, backgroundColor:'gray'}} />
                        </View>
                        <View style={{flex:0.2, paddingHorizontal:10, justifyContent:'space-between', paddingVertical:8}}>                        
                            <TouchableOpacity onPress={this.props.reduxIncreaseCounter} onPress={this.addGameTracker}>
                                <View style={{height:50, justifyContent:'center', alignItems:'center', borderRadius:3,backgroundColor:'#DFDFDF',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>                                    
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <Icon 
                                            name = "user-circle-o"
                                            size={20}
                                            color="white"/>
                                        <Text style={{color:'white', fontSize:18, marginLeft:15}}>Add Tracker</Text>
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
      id: state.counter.gametrackerId,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddGameTrackerScreen);
