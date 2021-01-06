import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// List screen
import Main from '../screens/Main';
import SplashScreen from '../screens/SplashScreen';
import Hearts from '../screens/Hearts';
import FlyingHearts from '../screens/FlyingHearts';
const Stack = createStackNavigator();
const Routes = () => {
	// Create stack navigation
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Main"}>
				<Stack.Screen name="Main" component={Main} />
				<Stack.Screen name="SplashScreen" component={SplashScreen} />
				<Stack.Screen name="Hearts" component={Hearts} />
				<Stack.Screen name="FlyingHearts" component={FlyingHearts} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Routes;
