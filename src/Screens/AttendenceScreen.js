import React from 'react'
import {View, Image, TextInput,ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import logoImg from '../../Logo.png';
import backgroundImg from '../../background.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Swipeable from 'react-native-swipeable-row';
import DateTimePicker from "react-native-modal-datetime-picker";


const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)

// const leftContent = <Text>Pull to activate</Text>;
 
// const rightButtons = [
//     <TouchableOpacity style={{backgroundColor:'green',height:60}} onPress={this.setPresent}>
//         <Text>Present</Text>
//     </TouchableOpacity>,
//     <TouchableOpacity style={{backgroundColor:'red', height:60}}>
//         <Text>Absent</Text>
//     </TouchableOpacity>
// ];
var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]

var ID = ''
var MONTH = ''
class AttendenceScreen extends React.Component{   
    
    constructor(props){
        super(props)
        this.state={
            email    :'',
            password :'',
            loading  :false,
            profiles :[],
            mode:'date',
            datepickerView:false,
            chosenDateTime:'',
            updateMonth:{},
            isAbsentVisible:false,
            isPresentVisible:false,
        }
    }   

    componentDidMount(){
        this.getProfile(data=>{
            // console.log(data)
            this.setState({profiles:data})            
        })
        // this.props.getProfile()
        
    }
    getProfile = (callback) => {
        let temp = []
        firebase.database().ref('members/').on("child_added",snap=>{
            temp.push(snap.val())
            // console.log("=======dddddddddd=====", Object.keys(snap.val().attend))
            callback(temp)
        })
    }
    setPresent = (uid, present, month) => {
        
        firebase.database().ref(`members/${uid}/attend/${month}`).update({
            present:String(parseInt(present)+1)
        })
        this.getProfile(data=>{
            // console.log(data)
            this.setState({profiles:data})            
        })
    }

    setAbsent = (uid, absent, month) => {
        firebase.database().ref(`members/${uid}/attend/${month}`).update({
            absent:String(parseInt(absent)+1)
        })
        this.getProfile(data=>{
            // console.log(data)
            this.setState({profiles:data})            
        })
        // alert(absent)
    }
    updateMonth =async (id,month,absent, present) => {
        await this.setState({updateMonth:{id:id, month:month, absent:absent, present:present}})
        this.setState({ datepickerView: true });
        console.log("-------------",this.state.updateMonth)

    }

    handleDateTimePicked = date => {
        var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]
        console.log("A date has been picked: ",this.state.updateMonth, monthNames[date.getMonth()]);
        firebase.database().ref(`members/${this.state.updateMonth.id}/attend/${this.state.updateMonth.month}`).remove()
        firebase.database().ref(`members/${this.state.updateMonth.id}/attend/${monthNames[date.getMonth()]}`).set({
            absent:this.state.updateMonth.absent,
            present:this.state.updateMonth.present
        })
        this.getProfile(data=>{
            // console.log(data)
            this.setState({profiles:data})            
        })
        this.hideDateTimePicker();
    };

    hideDateTimePicker = () => {
        this.setState({ datepickerView: false });
    };

    setAbsentVisible = (id, month) => {
        ID = id
        MONTH = month
        this.setState({isAbsentVisible:true})
    }

    closeAbsendModal = () => {
        this.setState({isAbsentVisible:false})
    }

    resetAbsent = () => {
        firebase.database().ref(`members/${ID}/attend/${MONTH}`).update({
            absent:'0'
        })
        this.closeAbsendModal()
        this.getProfile(data=>{
            // console.log(data)
            this.setState({profiles:data})            
        })
    }
    setPresentVisible = (id, month) => {
        ID = id
        MONTH = month
        this.setState({isPresentVisible:true})
    }

    closePresentModal = () => {
        this.setState({isPresentVisible:false})
    }

    resetPresent = () => {
        firebase.database().ref(`members/${ID}/attend/${MONTH}`).update({
            present:'0'
        })
        this.closePresentModal()
        this.getProfile(data=>{
            // console.log(data)
            this.setState({profiles:data})            
        })
    }
    render(){
        // console.log("============",this.props.profiles)
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <ImageBackground source={backgroundImg} style={{width:width, height:height/1.08}}>   
                        <View style={{flexDirection:'row'}}>
                            <Text style={{width:width/6,marginLeft:50}}>Player</Text>
                            <Text style={{width:width/6}}>Month</Text>
                            <Text style={{width:width/6}}>Absent</Text>
                            <Text style={{width:width/6}}>Present</Text>
                        </View>                     
                        <ScrollView>         
                        {this.state.profiles.length>0&&
                            this.state.profiles.map((data,index)=>{
                                
                            return(                                
                                <View key={index} style={{height:60,  justifyContent:'center'}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <View style={{height:50,width:50,borderRadius:50, overflow:'hidden'}}>
                                            <Image source={{uri:data.firstImg}} style={{height:50, width:50}}></Image>                                                
                                        </View>
                                        
                                        <Text style={{width:width/7, marginLeft:10}}>{data.name}</Text>
                                            {Object.keys(data.attend).map((item, index)=>{
                                                // if (item===String(monthNames[new Date().getMonth()])){
                                                    return <TouchableOpacity onPress={()=>this.updateMonth(data.uid,item,data.attend[item].absent,data.attend[item].present)}>
                                                            <Text style={{width:width/6}} key={index}>{item}</Text>
                                                        </TouchableOpacity>
                                                // }
                                            })} 
                                            {Object.keys(data.attend).map((item, index)=>{
                                                // if (item===String(monthNames[new Date().getMonth()])){
                                                    return <TouchableOpacity onPress={()=>this.setAbsentVisible(data.uid, item)}>
                                                        <Text style={{width:width/6, marginLeft:5}} key={index}>{data.attend[item].absent}</Text>
                                                    </TouchableOpacity> 
                                                // }
                                            })}   
                                            {Object.keys(data.attend).map((item, index)=>{
                                                // if (item===String(monthNames[new Date().getMonth()])){
                                                    return <TouchableOpacity onPress={()=>this.setPresentVisible(data.uid, item)}>
                                                        <Text style={{width:width/9, marginLeft:5}} key={index}>{data.attend[item].present}</Text>
                                                    </TouchableOpacity>
                                                // }
                                            })}  
                                            {Object.keys(data.attend).map((item, index)=>{
                                                // if (item===String(monthNames[new Date().getMonth()])){
                                                    return <TouchableOpacity style={{height:60,width:width/9, backgroundColor:'red', alignItems:'center', justifyContent:'center', borderRadius:2, margin:2}}
                                                                onPress = {()=>this.setAbsent(data.uid, data.attend[item].absent, item)}>
                                                                <Text style={{fontSize:12, color:'white'}}>Absent</Text>
                                                            </TouchableOpacity> 
                                                // }
                                            })} 
                                            {Object.keys(data.attend).map((item, index)=>{
                                                // if (item===String(monthNames[new Date().getMonth()])){
                                                    return  <TouchableOpacity style={{height:60, width:width/8, backgroundColor:'green', alignItems:'center', justifyContent:'center', borderRadius:2, margin:2}}
                                                                onPress = {()=>this.setPresent(data.uid,data.attend[item].present, item)}>
                                                                <Text style={{fontSize:12, color:'white'}}>Present</Text>
                                                            </TouchableOpacity>
                                                // }
                                            })} 
                                       
                                    </View>                                           
                                    
                                </View>                                
                            )
                        })}
                        
                       </ScrollView> 
                       {this.state.isAbsentVisible&&
                        <View style={{height:200, backgroundColor:'gray', alignSelf:'auto', alignItems:'center', justifyContent:'space-around'}}>
                            <Text style={{color:'white', fontSize:20}}>Are you really reset absent value?</Text>
                            <View style={{flexDirection:'row', }}>
                                <TouchableOpacity style={{height:40, width:60, backgroundColor:'green', marginRight:30, alignItems:'center', justifyContent:'center'}}
                                    onPress = {this.resetAbsent}>
                                    <Text style={{color:'white', fontSize:20}}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{height:40, width:60, backgroundColor:'red',alignItems:'center', justifyContent:'center'}}
                                    onPress = {this.closeAbsendModal}>
                                    <Text style={{color:'white', fontSize:20}}>No</Text>
                                </TouchableOpacity>

                            </View>
                        </View> 
                        }
                        {this.state.isPresentVisible&&
                        <View style={{height:200, backgroundColor:'gray', alignSelf:'auto', alignItems:'center', justifyContent:'space-around'}}>
                            <Text style={{color:'white', fontSize:20}}>Are you really reset present value?</Text>
                            <View style={{flexDirection:'row', }}>
                                <TouchableOpacity style={{height:40, width:60, backgroundColor:'green', marginRight:30, alignItems:'center', justifyContent:'center'}}
                                    onPress = {this.resetPresent}>
                                    <Text style={{color:'white', fontSize:20}}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{height:40, width:60, backgroundColor:'red',alignItems:'center', justifyContent:'center'}}
                                    onPress = {this.closePresent}>
                                    <Text style={{color:'white', fontSize:20}}>No</Text>
                                </TouchableOpacity>

                            </View>
                        </View> 
                        }
                        
                       <DateTimePicker
                            mode={this.state.mode}
                            isVisible={this.state.datepickerView}
                            onConfirm={this.handleDateTimePicked}
                            onCancel={this.hideDateTimePicker}
                            /> 
                    
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
        user:state.counter.user,
      profiles: state.counter.profiles,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch({
            type: 'GET_PROFILE',
            value: '',
        }),     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendenceScreen);
