import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerItems from '../../DrawerItems';
import { NAVIGATION } from '../constants/routes';
import { SIZES } from '../constants/theme';
import AppNavigator from './AppNavigator';
import { StatusBar } from 'expo-status-bar';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
                width: SIZES.width * .85,
            },
            headerShown: false
        }} drawerContent={(props) => <DrawerItems {...props} />}>
            <Drawer.Screen name={NAVIGATION.APP_NAVIGATOR} component={AppNavigator} />
        </Drawer.Navigator>
    );
}