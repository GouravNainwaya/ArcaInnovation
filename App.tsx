// App.tsx
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import AddEmployee from './src/screens/AddEmployee';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#150518'}}>
      <Navigation />
      {/* <AddEmployee /> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
