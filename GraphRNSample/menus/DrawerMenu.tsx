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
import UserContextScreen from '../screens/UserContextScreen';

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
      <View style={styles.profileView}>
        <Image
          source={props.userPhoto}
          resizeMode='contain'
          style={styles.profilePhoto}
        />
        <Text style={styles.profileUserName}>{props.userName}</Text>
        <Text style={styles.profileEmail}>{props.userEmail}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label='Sign Out' onPress={props.signOut} />
    </DrawerContentScrollView>
  );
};

export default class DrawerMenuContent extends React.Component<DrawerMenuProps> {
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  state = {
    // TEMPORARY
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
        {cancelable: false},
      );
    }
  }

  render() {
    const userLoaded = !this.state.userLoading;

    return (
      <UserContext.Provider value={this.state}>
        <Drawer.Navigator
          initialRouteName='Home'
          screenOptions={{
            drawerType: 'front',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#276b80',
            },
            headerTintColor: 'white',
          }}
          drawerContent={props => (
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
            options={{drawerLabel: 'Home', headerTitle: 'Welcome'}}
          />
          {userLoaded && (
            <Drawer.Screen
              name='UserContext'
              component={UserContextScreen}
              options={{drawerLabel: 'Datos'}}
            />
          )}
        </Drawer.Navigator>
      </UserContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    backgroundColor: '#276b80',
    padding: 16,
  },
  profilePhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileUserName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: 'white',
  },
});
