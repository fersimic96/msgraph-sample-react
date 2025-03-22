// Copyright (c) Microsoft.
// Licensed under the MIT license.

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {UserContext} from '../UserContext';

const HomeComponent = () => {
  const modules = [
    {
      id: 1,
      title: 'Combustibles',
      icon: 'gas-station',
      color: '#FF6B6B',
    },
    {
      id: 2,
      title: 'Tarjetas',
      icon: 'credit-card',
      color: '#4ECDC4',
    },
    {
      id: 3,
      title: 'Servicios',
      icon: 'tools',
      color: '#45B7D1',
    },
    {
      id: 4,
      title: 'Promociones',
      icon: 'gift',
      color: '#96CEB4',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>YPF</Text>
        <Text style={styles.headerSubtitle}>Tu aplicación de servicios</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>$0.00</Text>
      </View>

      {/* Modules Grid */}
      <View style={styles.modulesContainer}>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={[styles.moduleCard, {backgroundColor: module.color}]}
          >
            <Text style={styles.moduleTitle}>{module.title}</Text>
            {/* Aquí iría el ícono correspondiente */}
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>YPF 2025</Text>
      </View>
    </ScrollView>
  );
};

export default class HomeScreen extends React.Component {
  render() {
    return (
      <HomeComponent />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#2C3E50',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#ECF0F1',
    fontSize: 16,
  },
  balanceContainer: {
    padding: 20,
    backgroundColor: '#3498DB',
  },
  balanceTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modulesContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  moduleCard: {
    width: '45%',
    height: 100,
    borderRadius: 10,
    margin: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moduleTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#2C3E50',
  },
  footerText: {
    color: '#ECF0F1',
    textAlign: 'center',
  },
});
