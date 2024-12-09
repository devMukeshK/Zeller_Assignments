import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/home';
import UserDetail from '../screen/userDetail';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{title: '', headerBackButtonDisplayMode: 'minimal'}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerBackButtonDisplayMode: 'minimal'}}
        name="UserDetail"
        component={UserDetail}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
