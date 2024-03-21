import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from './screens/CameraScreen';
import GalleryScreen from './screens/GalleryScreen';
import PhotoScreen from './screens/PhotoScreen';



export default function App() {
  const CameraStack = () => {
    const Stack = createStackNavigator();
    return (
     <Stack.Navigator options={{tabBarLabel: "Camera"}}>
         <Stack.Screen name="Camera" component={CameraScreen}></Stack.Screen>
         <Stack.Screen name="Photo" component={PhotoScreen}></Stack.Screen>
     </Stack.Navigator>
    );
  }
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="CameraStack" component={CameraStack}/>
        <Tab.Screen name="Gallery" component={GalleryScreen}/>
      </Tab.Navigator>
    </NavigationContainer> 
  );
 }
 
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
