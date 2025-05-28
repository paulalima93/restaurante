import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import Home from './screens/Home';
import Order from './screens/Order';

export default function App() {
  return (
    <View style={styles.container}>
      <Order />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#151515',
    backgroundColor: '#fff',
    //justifyContent: 'center',
  },
});
