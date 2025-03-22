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

const DataScreen = ({navigation}: {navigation: any}) => {
  const {userLoading, userFirstName, userFullName, userEmail, userTimeZone, userPhoto} = 
    React.useContext(UserContext);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={userPhoto}
          style={styles.profileImage}
        />
      </View>

      {/* Data Sections */}
      <View style={styles.dataContainer}>
        <View style={styles.dataSection}>
          <Text style={styles.dataLabel}>Nombre completo:</Text>
          <Text style={styles.dataValue}>{userFullName}</Text>
        </View>
        <View style={styles.dataSection}>
          <Text style={styles.dataLabel}>Nombre:</Text>
          <Text style={styles.dataValue}>{userFirstName}</Text>
        </View>
        <View style={styles.dataSection}>
          <Text style={styles.dataLabel}>Email:</Text>
          <Text style={styles.dataValue}>{userEmail}</Text>
        </View>
        <View style={styles.dataSection}>
          <Text style={styles.dataLabel}>Zona horaria:</Text>
          <Text style={styles.dataValue}>{userTimeZone}</Text>
        </View>
      </View>

      {/* Back Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, theme.components.button]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  headerTitle: {
    ...theme.fonts.heading,
    textAlign: 'center',
    marginBottom: theme.spacing.small,
  },
  profileContainer: {
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.medium,
  },
  dataContainer: {
    padding: theme.spacing.large,
  },
  dataSection: {
    marginBottom: theme.spacing.medium,
  },
  dataLabel: {
    ...theme.fonts.subtitle,
    marginBottom: theme.spacing.small,
  },
  dataValue: {
    ...theme.fonts.body,
  },
  buttonContainer: {
    padding: theme.spacing.large,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.medium,
    borderRadius: theme.components.button.borderRadius,
  },
  buttonText: {
    ...theme.fonts.title,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
});

export default DataScreen;
