import React from 'react'
import {View, Image, TextInput,ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import logoImg from '../../Logo.png';
import backgroundImg from '../../background.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)

class GameTrackerScreen extends React.Component{   
    
    constructor(props){
        super(props)
        this.state={
            email    :'',
            password :'',
            loading  :false,
            profiles :[]
        }
    }
   
    
    goSignup = () => {
        this.props.navigation.navigate("Signup")
    }
    signIn = () => {
        const {email, password} = this.state
        const data = {email:email, password:password}
        this.props.logIn(data)
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
    goGameTrackerList = (id) => {
        this.props.setGameTrackerId(id)
        this.props.navigation.navigate("GameTrackerList")
    }
    render(){
        console.log("============",this.props.profiles)
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <ImageBackground source={backgroundImg} style={{width:width, height:height/1.08}}>
                        
                        <ScrollView>         
                        {this.state.profiles.length>0&&
                            this.state.profiles.map((data,index)=>{
                            return(
                                <View key={index} style={{height:85, padding:10,}}>
                                    <TouchableOpacity onPress = {()=>this.goGameTrackerList(data.uid)}>
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
        setGameTrackerId: (id) => dispatch({
            type: 'SET_GAMETRACKER_ID',
            value: id,
        }),   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameTrackerScreen);
