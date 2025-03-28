// Copyright (c) Microsoft.
// Licensed under the MIT license.

// Adapted from https://reactnavigation.org/docs/auth-flow
import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';

import {AuthContext} from './AuthContext';
import {AuthManager} from './auth/AuthManager';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';
import DrawerMenuContent from './menus/DrawerMenu';

export type StackParamList = {
  Loading: undefined;
  SignIn: StackScreenProps<StackParamList, 'SignIn'>;
  Main: StackScreenProps<StackParamList, 'Main'>;
};

const Stack = createStackNavigator<StackParamList>();

type Props = {
  _navigation: StackNavigationProp<ParamListBase>;
};

export default function App({_navigation}: Props) {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          };
      }
      return prevState;
    },
    {
      isLoading: true,
      isSignOut: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      // TEMPORARY
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        await AuthManager.signInAsync();
        const token = await AuthManager.getAccessTokenAsync();
        dispatch({type: 'SIGN_IN', token: token});
      },
      signOut: async () => {
        await AuthManager.signOutAsync();
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Loading'>
          {state.isLoading ? (
            <Stack.Screen name='Loading' component={AuthLoadingScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen name='SignIn' component={SignInScreen} />
          ) : (
            <Stack.Screen name='Main' component={DrawerMenuContent} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
