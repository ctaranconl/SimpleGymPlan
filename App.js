import ShowWelcomeScreen from './screens/WelcomeScreen';
import RoutineDetails from './screens/RoutineDetails';
import ExerciseView from './screens/ExerciseDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Rutinas" component={ShowWelcomeScreen} />
        <Stack.Screen name="DetallesRutina" component={RoutineDetails} />
        <Stack.Screen name="DetallesEjercicio" component={ExerciseView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



//<Stack.Screen name="CreateRoutineMain" component={CreateRoutineMain} />