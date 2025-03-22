// Copyright (c) Microsoft.
// Licensed under the MIT license.

import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {UserContext} from '../UserContext';

const Stack = createStackNavigator();

const HomeComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola! Prueba 123</Text>
      <Text style={styles.description}>Esta es una prueba de Fast Refresh</Text>
    </View>
  );
};

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          component={HomeComponent}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'red',
  },
  description: {
    fontSize: 16,
    color: 'purple',
  },
});
