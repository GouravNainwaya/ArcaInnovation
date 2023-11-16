// App.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Card} from '@rneui/themed';

const EmployeeProfile = ({employee, onViewSubordinates, navigation, wholeData, navigateOff,index}) => {
  const {name, email, phone, manager, subordinates, backgroundColor} = employee;

  // console.log("employee", JSON.stringify(employee, null, 2));

  const getTextColor = backgroundColor => {
    const hexColor = backgroundColor.replace(/^#/, '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return backgroundColor == 'white' || backgroundColor == 'yellow'
      ? 'black'
      : 'white';
  };

  const renderSubordinates = () => {
    return (
      <View>
        <Text style={[styles.sectionTitle, {color: getTextColor(backgroundColor)}]}>Subordinates:</Text>
        <FlatList
          data={subordinates}
          keyExtractor={subordinate => subordinate.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onViewSubordinates(item)}>
              <Text
                style={[
                  styles.subordinate,
                  {color: getTextColor(backgroundColor)},
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <Card  containerStyle={[styles.cardContainer, {backgroundColor}]}>
      <TouchableOpacity onPress={navigateOff  ? () => {} :() => navigation.navigate("EmployeeSingleView", {wholeData, selectedCard: employee, index})} style={styles.cardContent}>
        <Text style={[styles.name, {color: getTextColor(backgroundColor)}]}>
          {name}
        </Text>
        <Text style={[styles.details, {color: getTextColor(backgroundColor)}]}>
          {email}
        </Text>
        <Text style={[styles.details, {color: getTextColor(backgroundColor)}]}>
          {phone}
        </Text>
        <Text style={[styles.manager, {color: getTextColor(backgroundColor)}]}>
          Manager: {manager}
        </Text>

        {manager && (
          <TouchableOpacity onPress={() => onViewSubordinates({name: manager})}>
            <Text style={[styles.subordinate, {color: getTextColor(backgroundColor)}]}>Reporting Manager: {manager}</Text>
          </TouchableOpacity>
        )}

        {subordinates && renderSubordinates()}
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderColor: 1,
    borderColor: 'white',
  },
  cardContent: {
    padding: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff',
  },
  manager: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ffffff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#ffffff',
  },
  subordinate: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
    color: '#ffffff',
  },
  toggleButton: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#ffffff',
  },
  listView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  listViewText: {
    fontSize: 18,
    color: 'black',
  },
});

export default EmployeeProfile;
