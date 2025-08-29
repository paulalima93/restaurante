import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Order from '../screens/Order';
import Cart from '../screens/Cart';
import MyTabs from './BottomTab';
import Login from '../screens/Login';
import Register from '../screens/Register';
import User from '../screens/User';

const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
  );
}

export default MyStack;
