// Copyright (c) Microsoft.
// Licensed under the MIT license.

import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: TextStyle;
    title: TextStyle;
    subtitle: TextStyle;
    body: TextStyle;
    small: TextStyle;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  shadows: {
    small: ViewStyle;
    medium: ViewStyle;
  };
  components: {
    card: ViewStyle;
    button: ViewStyle;
  };
}

const colors = {
  primary: '#000',
  secondary: '#fff',
  accent: '#FF6B6B',
  background: '#F5F6FA',
  text: '#000',
  textSecondary: '#666',
};

const fonts = {
  heading: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.secondary,
  },
  title: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  body: {
    fontSize: 14,
    color: colors.text,
  },
  small: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.68,
    elevation: 5,
  },
};

export const theme: Theme = {
  colors,
  fonts,
  spacing,
  shadows,
  components: {
    card: {
      backgroundColor: colors.secondary,
      borderRadius: 10,
      padding: spacing.medium,
      margin: spacing.medium,
      ...shadows.medium,
    },
    button: {
      padding: spacing.medium,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};
