import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from './components/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './components/CartContext';

export default function App() {
  return (
    <View style={styles.container}>
      <CartProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </CartProvider>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#151515',
    //justifyContent: 'center',
  },
});
