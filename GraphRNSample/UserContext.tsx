// Copyright (c) Microsoft.
// Licensed under the MIT license.

import * as React from 'react';
import {ImageSourcePropType} from 'react-native';

export type UserContextType = {
  userLoading: boolean;
  userFirstName: string;
  userFullName: string;
  userEmail: string;
  userTimeZone: string;
  userPhoto: ImageSourcePropType;
};

export const UserContext = React.createContext<UserContextType>({
  userLoading: true,
  userFirstName: '',
  userFullName: '',
  userEmail: '',
  userTimeZone: '',
  userPhoto: require('./images/no-profile-pic.png'),
});
