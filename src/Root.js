import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import LoginScreen from './Screens/Login'
import UserlistScreen from './Screens/UserlistScreen'
import SignupScreen from './Screens/Signup'
import ProfileScreen from './Screens/ProfileScreen'
import {View, Text, Button, TouchableOpacity} from 'react-native'
import AddprofileScreen from './Screens/AddprofileScreen';
import AttendenceScreen from './Screens/AttendenceScreen';
import GameTrackerScreen from './Screens/GameTrackerScreen';
import GameTrackerListScreen from './Screens/GameTrackerListScreen';
import AddGameTrackerScreen from './Screens/AddGameTrackerScreen';
import WorkoutRoutineScreen from './Screens/WorkoutRoutineScreen';
import WorkoutRoutineListScreen from './Screens/WorkoutRoutineListScreen';
import AddWorkoutRoutineScreen from './Screens/AddWorkoutRoutineScreen';

const DrawerContent = (props) => (
    <View>
      <View
        style={{
          backgroundColor: '#947bf7',
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>
          UCSI
        </Text>
      </View>
      {/* <TouchableOpacity
        title="Update the title"
        onPress={() => this.props.navigation.navigate('Profile')}
        >
            <Text>Home</Text>
        </TouchableOpacity> */}
      <DrawerNavigatorItems {...props} />
    </View>
  )
const MainStack = createDrawerNavigator(
    {    
        Profiles: {
        screen: ProfileScreen,
        },
        Attendence: {
          screen: AttendenceScreen,
        },
        GameTracker: {
          screen: GameTrackerScreen,
        },
        WorkoutRoutine: {
          screen: WorkoutRoutineScreen,
        },
    },
    {
        initialRouteName: 'Profiles',
        contentComponent: DrawerContent,
    }
);

const drawerScreens = createStackNavigator(
    {
        
        Login: {
            screen: LoginScreen,
            navigationOptions: { header: null }
        },   
        Userlist: {
            screen: UserlistScreen,
            navigationOptions: { header: null }
        }, 
        Signup: {
            screen: SignupScreen,
            navigationOptions: { header: null }
        },  
        Profile  : MainStack, 
        Addprofile: {
          screen: AddprofileScreen,
          navigationOptions: { header: null }
        },
        GameTrackerList: {
          screen: GameTrackerListScreen,
          navigationOptions: { header: null }
        },
        AddGameTracker: {
          screen: AddGameTrackerScreen,
          navigationOptions: { header: null }
        },
        WorkoutRoutineList: {
          screen: WorkoutRoutineListScreen,
          navigationOptions: { header: null }
        },
        AddWorkoutRoutine: {
          screen: AddWorkoutRoutineScreen,
          navigationOptions: { header: null }
        },
        
    },
    {
        initialRouteName: 'Login',
        
    }
)


class Root extends React.Component{
    render() {
        const Navigation = createAppContainer(drawerScreens);
        return (<Navigation/>);
    }
}

export default Root