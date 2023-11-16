import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import EmployeeProfile from '../components/EmployeeProfile';

const EmployeeSingleView = ({navigation, route}) => {
  const {wholeData, selectedCard, index} = route?.params;

  console.log('selectedCard', index);

  const manager = wholeData.find(
    item => item?.parentId === selectedCard?.parentId,
  );

  const subordinates = wholeData.slice(index);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <EmployeeProfile
        employee={{...selectedCard, manager: manager?.name, subordinates}}
        onViewSubordinates={() => {}}
        navigation={navigation}
        navigateOff={true}
      />
    </View>
  );
};

export default EmployeeSingleView;

const styles = StyleSheet.create({});
