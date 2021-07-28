import React from 'react'
import {View, Image, TextInput,ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import logoImg from '../../Logo.png';
import backgroundImg from '../../background.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)

class ProfileScreen extends React.Component{   
    
    constructor(props){
        super(props)
        this.state={
            email    :'',
            password :'',
            loading  :false,
            profiles :[]
        }
    }
   

    componentDidMount(){
        this.getProfile(data=>{
            console.log(data)
            this.setState({profiles:data})
        })
        // this.props.getProfile()
        // console.log("============",this.props.profiles)
    }
    getProfile = (callback) => {
        let temp = []
        firebase.database().ref('members/').on("child_added",snap=>{
            temp.push(snap.val())
            callback(temp)
        })
    }

    render(){
        // console.log("============",this.props.profiles)
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <ImageBackground source={backgroundImg} style={{width:width, height:height/1.08}}>
                        <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20,marginTop:10, width:40, height:40, borderRadius:40, backgroundColor:'gray',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,  alignItems:'center', justifyContent:'center'}}
                            onPress = {()=>this.props.navigation.navigate("Addprofile")}>
                            <Text style={{color:'white', fontSize:50}}>+</Text>
                        </TouchableOpacity> 
                        <ScrollView>         
                        {this.state.profiles.length>0&&
                            this.state.profiles.map((data,index)=>{
                            return(
                                <View key={index} style={{height:85, padding:10,}}>
                                    <TouchableOpacity >
                                        <View style={{backgroundColor:'#c6c8c9', height:75, borderRadius:75,  flexDirection:'row'}}>
                                            <View style={{height:75,width:75,borderRadius:75, overflow:'hidden'}}>
                                                <Image source={{uri:data.firstImg}} style={{height:75, width:75}}></Image>                                                
                                            </View> 
                                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                                                <View>
                                                    <Text style={{marginLeft:10, color:"gray"}}>Name:{data.name}</Text>
                                                    <Text style={{marginLeft:10, color:"gray"}}>Age:{data.age}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{marginLeft:10, color:"gray"}}>Height:{data.height} Cm</Text>
                                                    <Text style={{marginLeft:10, color:"gray"}}>Wegiht:{data.weight} Kg</Text>
                                                </View> 
                                                <View>
                                                    <Text style={{marginLeft:10, color:"gray"}}>{data.guard}</Text>                                                    
                                                </View>                                  
                                                
                                            </View>                                 
                                        </View>                                        
                                    </TouchableOpacity>                                    
                                </View>
                                
                            )
                        })}
                       </ScrollView>  
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
