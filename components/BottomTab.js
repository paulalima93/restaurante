import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native'; 
import Home from '../screens/Home'; 
import Order from '../screens/Order';
import Cart from '../screens/Cart';
import { useCart } from './CartContext';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const {cart} = useCart();
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <Tab.Navigator screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: "#252525", borderTopLeftRadius: 10, borderTopRightRadius: 10},
        tabBarIcon: ({focused}) => {
          let icon;

          if(route.name === "Home") {
            icon = require("../assets/home.png")
          } else if(route.name == "Order") {
            icon = require("../assets/menu.png")
          } else if(route.name == "Cart") {
            icon = require("../assets/cart.png")

            return(
              <View>
                <Image source={icon} style={{width: 20, height: 20}}/>
                {cartQuantity > 0 && (
                  <View style={{
                    position: 'absolute',
                    backgroundColor: "#f6f7f9",
                    borderRadius: 10,
                    height: 18,
                    width: 18,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    top: -8,
                    right: -10
                  }}>
                  
                    <Text style={{
                    textAlign: 'center',
                    fontSize: 10
                  }}> {cartQuantity} </Text>
                  </View>
                )}
              </View>
            )
          }

          return <Image source={icon} style={{width: 20, height: 20}}/>
        }
    })}>
      <Tab.Screen name="Home" component={Home} options={({ route }) => ({
    tabBarStyle: ((route?.state?.index ?? 0) === 0) ? { display: 'none' } : undefined,
  })}/>
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}

export default MyTabs;