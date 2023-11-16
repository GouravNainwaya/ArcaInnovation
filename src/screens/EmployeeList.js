import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import EmployeeProfile from '../components/EmployeeProfile';
import axios from 'axios';

const EmployeeList = ({ navigation }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Make API call
    axios
      .get('https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d')
      .then(response => {
        setApiData(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {isLoading ? (
        // Show the loader while data is being fetched
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <View style={{flex: 1, padding: 10}}>
        <FlatList
          data={apiData}
          keyExtractor={employee => employee.id.toString()}
          renderItem={({ item ,index}) => {
            const manager = apiData.find(items => items?.parentId === item?.parentId,);
            return (
              <EmployeeProfile employee={{...item, manager: manager?.name}} index={index} wholeData={apiData} onViewSubordinates={() => {}} navigation={navigation} />
            )
          }}
        />
        <Button title="Add Employee" onPress={() => navigation.navigate("AddEmployee", {setApiData, apiData})} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmployeeList;
