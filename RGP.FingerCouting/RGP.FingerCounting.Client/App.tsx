
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import React from 'react';
import Routes from './src/app/UI/Routes/Routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import { AuthProvider } from './src/app/Contexts/AuthContext';




const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    // <PaperProvider theme={theme}>
    //   <NavigationContainer>
    //     <AuthProvider>
    //             <Routes />
    //     </AuthProvider>
    // </NavigationContainer>
    // </PaperProvider>

    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
    
  );
}

export default App;

