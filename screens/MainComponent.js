import { Image, Text, Platform, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import DiaryScreen from './DiaryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import DashboardScreen from './DashboardScreen';
import NotificationsScreen from './NotificationsScreen';
import SettingsScreen from './SettingsScreen';
import { Icon } from 'react-native-elements';
import logo from '../assets/Time4WaterLogo.png'

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: 'blue' }
};

const DashboardNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Dashboard'
                component={DashboardScreen}
                options={({ navigation }) => ({
                    title: 'Dashboard',
                })}
            />
        </Stack.Navigator>
    );
};

const NotificationsNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Notifications'
                component={NotificationsScreen}
                options={({ navigation }) => ({
                    title: 'Notifications',
                    headerLeft: () => (
                        <Icon
                            name='arrow-left'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.goBack()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const SettingsNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Settings'
                component={SettingsScreen}
                options={({ navigation }) => ({
                    title: 'Settings',
                    headerLeft: () => (
                        <Icon
                            name='arrow-left'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.goBack()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const DiaryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Diary'
                component={DiaryScreen}
                options={({ navigation }) => ({
                    title: 'Water Intake Diary',
                    headerLeft: () => (
                        <Icon
                            name='arrow-left'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.goBack()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>Time4Water</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
);


const Main = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
        >
            <Drawer.Navigator
                initialRouteName='Dashboard'
                drawerContent={CustomDrawerContent}
                drawerStyle={{ backgroundColor: '#c9dcff' }}
            >
                <Drawer.Screen
                    name='Dashboard'
                    component={DashboardNavigator}
                    options={{
                        title: 'Dashboard',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Diary'
                    component={DiaryNavigator}
                    options={{
                        title: 'Water Intake Diary',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='calendar'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Notifications'
                    component={NotificationsNavigator}
                    options={{
                        title: 'Notifications',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='bell'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Settings'
                    component={SettingsNavigator}
                    options={{
                        title: 'Settings',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='gear'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#0b269e',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});


export default Main;