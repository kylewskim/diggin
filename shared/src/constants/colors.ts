export const colors = {
  gray: {
    0: '#FFFFFF',
    25: '#F9F9F9',
    50: '#F4F4F4',
    100: '#E9E9E9',
    150: '#DDDDDD',
    200: '#D2D2D2',
    300: '#BCBCBC',
    400: '#A5A5A5',
    500: '#8F8F8F',
    600: '#727272',
    700: '#565656',
    800: '#393939',
    850: '#2B2B2B',
    900: '#1D1D1D',
    950: '#0E0E0E',
    1000: '#000000',
  },
  fill: {
    primary: {
      light: '#0E0E0E', // gray-950
      dark: '#F4F4F4',  // gray-50
    },
    secondary: {
      light: '#FFFFFF', // gray-0
      dark: '#E9E9E9',  // gray-100
    },
    disabled: {
      light: '#E9E9E9', // gray-100
      dark: '#1D1D1D',  // gray-900
    },
    onsurface: {
      light: '#F4F4F4', // gray-50
      dark: '#1D1D1D',  // gray-900
    },
    dim50: {
      light: '#00000080', // black 50% opacity
      dark: '#FFFFFF80',  // white 50% opacity
    },
    hover: {
      primary: {
        light: '#393939', // gray-50
        dark: '#FFFFFF',  // gray-850
      },
      secondary: {
        light: '#F4F4F4', // gray-50
        dark: '#2B2B2B',  // gray-850
      }
    },
    selected: {
      secondary: {
        light: '#DDDDDD', // gray-200
        dark: 'FFFFFF',  // gray-850
      }
    },
    error: '#FF5151',
  },
  line: {
    primary: {
      light: '#1D1D1D', // gray-900
      dark: '#E9E9E9',  // gray-100
    },
    secondary: {
      light: '#727272', // gray-600
      dark: '#A5A5A5',  // gray-400
    },
    tertiary: {
      light: '#D2D2D2', // gray-200
      dark: '#393939',  // gray-800
    },
    disabled: {
      light: '#D2D2D2', // gray-200
      dark: '#D2D2D2',  // gray-200
    },
  },
  text: {
    primary: {
      light: '#0E0E0E', // gray-950
      dark: '#F4F4F4',  // gray-50
    },
    secondary: {
      light: '#565656', // gray-700
      dark: '#A5A5A5',  // gray-400
    },
    tertiary: {
      light: '#BCBCBC', // gray-300
      dark: '#727272',  // gray-600
    },
    disabled: {
      light: '#A5A5A5', // gray-400
      dark: '#727272',  // gray-600
    },
    inverted: {
      light: '#FFFFFF', // gray-0
      dark: '#0E0E0E',  // gray-950
    },
    error: '#FF5151',
  },
  icon: {
    primary: {
      light: '#1D1D1D', // gray-900
      dark: '#F4F4F4',  // gray-50
    },
    secondary: {
      light: '#565656', // gray-700
      dark: '#A5A5A5',  // gray-400
    },
    tertiary: {
      light: '#BCBCBC', // gray-300
      dark: '#727272',  // gray-600
    },
    disabled: {
      light: '#D2D2D2', // gray-200
      dark: '#A5A5A5',  // gray-400
    },
    inverted: {
      light: '#FFFFFF', // gray-0
      dark: '#0E0E0E',  // gray-950
    },
  },
  surface: {
    bg: {
      light: '#FFFFFF', // gray-0
      dark: '#0E0E0E',  // gray-950
    },
  },
} as const

export type ColorToken = typeof colors

// Tailwind 설정에서 사용할 수 있는 형태로 색상을 변환하는 함수
export function getTailwindColors() {
  return {
    gray: colors.gray,
    fill: colors.fill,
    line: colors.line,
    text: colors.text,
    icon: colors.icon,
    surface: colors.surface,
  }
} 
 
 
 
 
 