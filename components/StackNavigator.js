import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Stack } from 'expo-router';
import Home from "../screens/Home";
import Order from "../screens/Order";
import Reserve from "../screens/Reserve";
import TakeAway from "../screens/TakeAway";

const Stack = createStackNavigator();
export default function StackNavigator(){
    return(
        <NavigationContainer>
            <StackNavigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Order" component={Order}/>
                <Stack.Screen name="Reserve" component={Reserve}/>
                <Stack.Screen name="TakeAway" component={TakeAway}/>
            </StackNavigator>
        </NavigationContainer> 
    )
}