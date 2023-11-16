import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EmployeeList from '../screens/EmployeeList';
import EmployeeSingleView from '../screens/EmployeeSingleView';
import EmployeeProfile from '../components/EmployeeProfile';
import AddEmployee from '../screens/AddEmployee';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
          name="EmployeeList"
          options={{headerShown: false}}
          component={EmployeeList}
        />
      <Stack.Screen
          name="EmployeeSingleView"
          component={EmployeeSingleView}
        />
      <Stack.Screen
          name="AddEmployee"
          component={AddEmployee}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

