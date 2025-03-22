// Copyright (c) Microsoft.
// Licensed under the MIT license.

import React, {FC} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import {AuthContext} from '../AuthContext';
import {UserContext} from '../UserContext';
import {StackParamList} from '../App';
import {GraphManager} from '../graph/GraphManager';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import {theme} from '../theme';

const Drawer = createDrawerNavigator();

type CustomDrawerContentProps = DrawerContentComponentProps & {
  userName: string;
  userEmail: string;
  userPhoto: ImageSourcePropType;
  signOut: () => void;
};

type DrawerMenuProps = StackScreenProps<StackParamList, 'Main'>;

const CustomDrawerContent: FC<CustomDrawerContentProps> = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={props.userPhoto}
          resizeMode='cover'
          style={styles.profilePhoto}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{props.userName}</Text>
          <Text style={styles.userEmail}>{props.userEmail}</Text>
        </View>
      </View>
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
        <DrawerItem 
          label='Cerrar sesión' 
          onPress={props.signOut} 
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default class DrawerMenuContent extends React.Component<DrawerMenuProps> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  state = {
    userLoading: true,
    userFirstName: 'Adele',
    userFullName: 'Adele Vance',
    userEmail: 'adelev@contoso.com',
    userTimeZone: 'UTC',
    userPhoto: require('../images/no-profile-pic.png'),
  };

  _signOut = async () => {
    this.context.signOut();
  };

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false,
      animationEnabled: false,
    });

    try {
      const user: MicrosoftGraph.User = await GraphManager.getUserAsync();

      this.setState({
        userLoading: false,
        userFirstName: user.givenName!,
        userFullName: user.displayName!,
        userEmail: user.mail! || user.userPrincipalName!,
        userTimeZone: user.mailboxSettings?.timeZone!,
      });
    } catch (error) {
      Alert.alert(
        'Error getting user',
        JSON.stringify(error),
        [
          {
            text: 'OK',
          },
        ],
      );
    }
  }

  render() {
    const userLoaded = !this.state.userLoading;

    return (
      <UserContext.Provider value={this.state}>
        <Drawer.Navigator 
          drawerContent={(props) => (
            <CustomDrawerContent 
              {...props} 
              userName={this.state.userFullName} 
              userEmail={this.state.userEmail} 
              userPhoto={this.state.userPhoto} 
              signOut={this._signOut}
            />
          )}
        >
          <Drawer.Screen 
            name='Home' 
            component={HomeScreen}
            options={{
              drawerLabel: 'Bienvenido',
              drawerLabelStyle: styles.drawerLabel,
            }}
          />
          {userLoaded && (
            <Drawer.Screen 
              name='Data' 
              component={DataScreen}
              options={{
                drawerLabel: 'Mi perfil',
                drawerLabelStyle: styles.drawerLabel,
              }}
            />
          )}
        </Drawer.Navigator>
      </UserContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.medium,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#999',
    fontSize: 14,
  },
  drawerItems: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
  },
  drawerItem: {
    marginVertical: theme.spacing.small,
  },
  drawerItemLabel: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  drawerLabel: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
