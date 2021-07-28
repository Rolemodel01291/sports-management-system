import React from 'react'
import {View, TouchableOpacity, Text, ScrollView, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

const width  = Math.floor(Dimensions.get('window').width)
const height = Math.floor(Dimensions.get('window').height)

var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]

class WorkoutRoutineListScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trackers:[]
        }
    }
    componentDidMount(){
        // console.log("---------------------",this.props.id)
        this.props.navigation.addListener ('willFocus', () =>{
            this.getTracker(this.props.id, routine=>{
                // console.log("=====33===",routine)
                this.setState({trackers:routine})
            })
        })
        this.getTracker(this.props.id, routine=>{
            // console.log("=====33===",routine)
            this.setState({trackers:routine})
        })
    }

    getTracker = (id, callback) => {
        let temp = [];
        let pushups = 0
        let pullups = 0
        let situps  = 0
        let run     = 0
        firebase.database().ref(`members/${id}/routines/`).once('value', snap=>{
            console.log('-------',Object.keys(snap.val()))
            Object.keys(snap.val()).map(data=>{
                console.log("=========",Object.keys(snap.val()[data]))
                pushups = 0
                pullups = 0
                situps  = 0
                run     = 0
                Object.keys(snap.val()[data]).map(item=>{                    
                    pushups = pushups + parseInt(snap.val()[data][item].pushups)
                    pullups = pullups + parseInt(snap.val()[data][item].pullups)
                    situps  = situps  + parseInt(snap.val()[data][item].situps)
                    run     = run + parseInt(snap.val()[data][item].run)
                    console.log("-----ddd----", pushups)
                })
                temp.push({pushups:String(pushups), month: data, pullups:String(pullups), situps:String(situps), run: String(run)})
            })
            callback(temp)
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20,marginTop:10, width:40, height:40, borderRadius:40, backgroundColor:'gray',shadowColor: "#000",shadowOffset: {	width: 0,	height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,  alignItems:'center', justifyContent:'center'}}
                    onPress = {()=>this.props.navigation.navigate("AddWorkoutRoutine")}>
                    <Text style={{color:'white', fontSize:50}}>+</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:width/6*2, alignItems:'center'}}>
                        <Text>Month</Text>
                    </View>
                    <View style={{width:width/6, alignItems:'center'}}>
                        <Text>Pushups</Text>                        
                    </View>
                    <View style={{width:width/6, alignItems:'center'}}>
                        <Text>pull-ups</Text>                        
                    </View>
                    <View style={{width:width/6, alignItems:'center'}}>
                        <Text>sit-ups</Text>                        
                    </View>   
                    <View style={{width:width/6, alignItems:'center'}}>
                        <Text>run</Text>                        
                    </View>                   
                </View>
                <ScrollView>
                    {this.state.trackers.map((data, index)=>{
                        return (
                            <View style={{flexDirection:'row', height:70, backgroundColor:'#e2e2e2', alignItems:'center',margin:5}}  key={index}>
                                <View style={{width:width/6*2, alignItems:'center'}}>
                                    <Text>{data.month}</Text>
                                </View>
                                <View style={{width:width/6, alignItems:'center'}}>
                                    <Text>{data.pushups}</Text>                        
                                </View>
                                <View style={{width:width/6, alignItems:'center'}}>
                                    <Text>{data.pullups}</Text>                        
                                </View>
                                <View style={{width:width/6, alignItems:'center'}}>
                                    <Text>{data.situps}</Text>                        
                                </View>     
                                <View style={{width:width/6, alignItems:'center'}}>
                                    <Text>{data.run}</Text>                        
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutRoutineListScreen);
