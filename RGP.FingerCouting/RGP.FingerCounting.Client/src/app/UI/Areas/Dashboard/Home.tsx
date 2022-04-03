
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar, Text, Button} from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { DashboardStackParamsList } from '../../../Screens/DashboardStackParamsList';

type dashboardScreenProp = StackNavigationProp<DashboardStackParamsList, 'Home'>;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  title: {
    fontSize: 24
  },
  info: {
    fontSize: 18
  },
  paragraph: {
    margin: 15
  }
});

const Home = () => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={[{color: colors.text}, styles.title]}>Welcome</Text>
        <Text style={[styles.info]}>This is E.C.L.A.I.R</Text>
        <Text style={[styles.info]}>(Entity Controller Limited at Infra Red) {"\n"}</Text>
        <Text style={[styles.paragraph]}>E.C.L.A.I.R is a great device to smartify any device that you have in your home which usses an infra-red remote</Text>
        <Button
          onPress={() => {}}
          title="Acces your remotes"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      
      </View>
    );
};
  
  export default Home;