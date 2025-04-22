import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Order from "../screens/Order";

const Stack = createStackNavigator();
export default function StackNavigator(){
    return(
        <NavigationContainer>
            <StackNavigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Order" component={Order}/>
            </StackNavigator>
        </NavigationContainer>
    )
}