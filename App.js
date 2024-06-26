// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import App from "./AppJinx.js";
import PokeApi from "./PokeAPIComponent.js";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PokeAPIComponent" component={PokeApi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
