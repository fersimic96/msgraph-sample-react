// Copyright (c) Microsoft.
// Licensed under the MIT license.

import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {UserContextType, UserContext} from '../UserContext';

type Props = {
  navigation: any;
};

export default function UserContextScreen({navigation}: Props) {
  const {userLoading, userFirstName, userFullName, userEmail, userTimeZone, userPhoto} = 
    React.useContext<UserContextType>(UserContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información de Usuario</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Estado de carga:</Text>
          <Text style={styles.dataValue}>{userLoading ? 'Cargando...' : 'Listo'}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Nombre completo:</Text>
          <Text style={styles.dataValue}>{userFullName}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Nombre:</Text>
          <Text style={styles.dataValue}>{userFirstName}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Email:</Text>
          <Text style={styles.dataValue}>{userEmail}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Zona horaria:</Text>
          <Text style={styles.dataValue}>{userTimeZone}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Text
          style={styles.button}
          onPress={() => navigation.goBack()}>
          Volver
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 15,
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50',
  },
  dataContainer: {
    marginBottom: 10,
  },
  dataLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  dataValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
