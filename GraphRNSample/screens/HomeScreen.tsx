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
import {theme} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeComponent = () => {
  const modules = [
    {
      id: 1,
      title: 'Rutinas',
      icon: 'calendar-check',
      color: theme.colors.accent,
    },
    {
      id: 2,
      title: 'Equipos',
      icon: 'tools',
      color: theme.colors.accent,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>YPF</Text>
          <Text style={styles.headerSubtitle}>Tu aplicación de servicios</Text>
        </View>
      </View>

      {/* Balance Section */}
      <View style={[styles.balanceContainer, theme.components.card]}>
        <Text style={styles.balanceTitle}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>$0.00</Text>
      </View>

      {/* Modules Grid */}
      <View style={styles.modulesContainer}>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={[styles.moduleCard, {backgroundColor: module.color}]}
            onPress={() => console.log(`Module ${module.title} pressed`) }>
            <MaterialCommunityIcons
              name={module.icon}
              size={50}
              color={theme.colors.secondary}
              style={[styles.icon, {marginBottom: theme.spacing.medium}]}
            />
            <Text style={[styles.moduleTitle, {fontSize: 18}]}>{module.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={[styles.footer, theme.components.card]}>
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
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
  },
  headerTitle: {
    ...theme.fonts.heading,
    marginBottom: theme.spacing.small,
  },
  headerSubtitle: {
    ...theme.fonts.subtitle,
  },
  balanceContainer: {
    ...theme.components.card,
    marginHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  },
  balanceTitle: {
    ...theme.fonts.title,
    marginBottom: theme.spacing.small,
  },
  balanceAmount: {
    ...theme.fonts.title,
    fontWeight: 'bold',
  },
  modulesContainer: {
    padding: theme.spacing.large,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing.medium,
    marginHorizontal: theme.spacing.small,
  },
  moduleCard: {
    width: '48%',
    height: 100,
    borderRadius: theme.components.card.borderRadius,
    padding: theme.spacing.medium,
    borderRadius: 10,
    marginBottom: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.medium,
    ...theme.shadows.medium,
  },
  icon: {
    marginBottom: theme.spacing.small,
  },
  moduleTitle: {
    ...theme.fonts.title,
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    ...theme.components.card,
    marginTop: theme.spacing.large,
  },
  footerText: {
    ...theme.fonts.small,
    textAlign: 'center',
  },
});

export default HomeComponent;
