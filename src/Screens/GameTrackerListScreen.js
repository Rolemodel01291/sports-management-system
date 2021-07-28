import React from 'react'
import {View, TouchableOpacity, Text, ScrollView, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)

var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]

class GameTrackerListScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trackers:[]
        }
    }
    componentDidMount(){
        console.log("---------------------",this.props.id)
        this.getTracker(this.props.id, tracker=>{
            console.log(tracker)
            this.setState({trackers:tracker})
        })
    }

    getTracker = (id, callback) => {
        let temp = [];
        firebase.database().ref(`members/${id}/tracker/${monthNames[new Date().getMonth()]}`).on('child_added', snap=>{
            // console.log(snap)
            temp.push(snap.val())
            callback(temp)
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20,marginTop:10, width:40, height:40, borderRadius:40, backgroundColor:'gray',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,  alignItems:'center', justifyContent:'center'}}
                    onPress = {()=>this.props.navigation.navigate("AddGameTracker")}>
                    <Text style={{color:'white', fontSize:50}}>+</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:width/5*2, alignItems:'center'}}>
                        <Text>Date</Text>
                    </View>
                    <View style={{width:width/5, alignItems:'center'}}>
                        <Text>Points</Text>                        
                    </View>
                    <View style={{width:width/5, alignItems:'center'}}>
                        <Text>Rebounds</Text>                        
                    </View>
                    <View style={{width:width/5, alignItems:'center'}}>
                        <Text>Assists</Text>                        
                    </View>                    
                </View>
                <ScrollView>
                    {this.state.trackers.map((data, index)=>{
                        return (
                            <View style={{flexDirection:'row', height:70, backgroundColor:'#e2e2e2', alignItems:'center',margin:5}}  key={index}>
                                <View style={{width:width/5*2, alignItems:'center'}}>
                                    <Text>{data.date}</Text>
                                </View>
                                <View style={{width:width/5, alignItems:'center'}}>
                                    <Text>{data.point}</Text>                        
                                </View>
                                <View style={{width:width/5, alignItems:'center'}}>
                                    <Text>{data.rebounds}</Text>                        
                                </View>
                                <View style={{width:width/5, alignItems:'center'}}>
                                    <Text>{data.assists}</Text>                        
                                </View>                    
                            </View>
                        )
                    })}
                   
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('State:');
    console.log(state);
    return {
        id:state.counter.gametrackerId,
        
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

export default connect(mapStateToProps, mapDispatchToProps)(GameTrackerListScreen);
