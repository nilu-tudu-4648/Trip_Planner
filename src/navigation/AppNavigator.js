import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NAVIGATION } from '../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginUser, } from '../store/localReducer';

import { LoginScreen, Discover, HomeScreen, ItemScreen, CreateItinerary, } from '../screens';
const Stack = createNativeStackNavigator();


function AppNavigator() {
    const { user } = useSelector((state) => state.entities.localReducer);
    const dispatch = useDispatch()
    const checkUserDetails = async () => {
        try {
            const loggedInUser = JSON.parse(await AsyncStorage.getItem('loggedInUser'));
            if (loggedInUser !== null) {
                dispatch(setLoginUser(loggedInUser));
            } else {
                console.log('No user details found');
            }
        } catch (error) {
            console.log({ error });
        }
    };
    React.useEffect(() => {
        checkUserDetails()
    }, [user]);
    const options = { headerShown: false }
    return (
        <Stack.Navigator>
            {!user ?
                <Stack.Screen options={options} name={NAVIGATION.LOGIN} component={LoginScreen} />
                :
                <>
                    <Stack.Screen options={options} name={NAVIGATION.HOME} component={HomeScreen} />
                    <Stack.Screen options={options} name={NAVIGATION.DISCOVER} component={Discover} />
                    <Stack.Screen options={options} name={NAVIGATION.ITEMSCREEN} component={ItemScreen} />
                    <Stack.Screen options={options} name={NAVIGATION.ITINERARY} component={CreateItinerary} />
                </>
            }
        </Stack.Navigator>
    );
}

export default AppNavigator;