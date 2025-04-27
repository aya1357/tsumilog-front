type Colors = {
  primary: {
    lightest: string
    light: string
    default: string
    dark: string
  }
  secondary: {
    lightest: string
    light: string
    default: string
    dark: string
  }
  accent: {
    lightest: string
    light: string
    default: string
    dark: string
  }
  success: {
    lightest: string
    light: string
    default: string
    dark: string
  }
  warning: {
    lightest: string
    light: string
    default: string
    dark: string
  }
  error: {
    lightest: string
    light: string
    default: string
    dark: string
  }
  neutral: {
    white: string
    lightest: string
    light: string
    medium: string
    dark: string
    darker: string
    darkest: string
    black: string
  }
  background: {
    primary: string
    secondary: string
    card: string
  }
  text: {
    primary: string
    secondary: string
    tertiary: string
    light: string
  }
  trophy: string
}

export const colors: Colors = {
  primary: {
    lightest: '#E6F7F9',
    light: '#A8E0E9',
    default: '#6ECEDA',
    dark: '#4EAEC0'
  },
  secondary: {
    lightest: '#EBF3FE',
    light: '#95B8F6',
    default: '#4A90E2',
    dark: '#3A73B5'
  },
  accent: {
    lightest: '#FFF4E6',
    light: '#FFE0B2',
    default: '#FFB74D',
    dark: '#F57C00'
  },
  success: {
    lightest: '#E8F5E9',
    light: '#C8E6C9',
    default: '#81C784',
    dark: '#4CAF50'
  },
  warning: {
    lightest: '#FFF8E1',
    light: '#FFECB3',
    default: '#FFD54F',
    dark: '#FFC107'
  },
  error: {
    lightest: '#FFEBEE',
    light: '#FFCDD2',
    default: '#E57373',
    dark: '#F44336'
  },
  neutral: {
    white: '#FFFFFF',
    lightest: '#F8F9FA',
    light: '#DEE2E6',
    medium: '#CED4DA',
    dark: '#ADB5BD',
    darker: '#6C757D',
    darkest: '#343A40',
    black: '#212529'
  },
  background: {
    primary: '#E6F7F9',
    secondary: '#F8F9FA',
    card: '#FFFFFF'
  },
  text: {
    primary: '#343A40',
    secondary: '#6C757D',
    tertiary: '#ADB5BD',
    light: '#FFFFFF'
  },
  trophy: '#FFC107'
}

export const darkColors: Colors = {
  ...colors,
  background: {
    primary: colors.neutral.darkest,
    secondary: colors.neutral.darker,
    card: colors.neutral.dark
  },
  text: {
    primary: colors.text.light,
    secondary: colors.text.tertiary,
    tertiary: colors.text.secondary,
    light: colors.text.primary
  }
}
