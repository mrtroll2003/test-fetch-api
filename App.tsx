import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text, Button } from 'react-native';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [universitiesData, setUniversitiesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch university data from API
    fetchUniversityData();
  }, []);

  const fetchUniversityData = async () => {
    try {
      const response = await fetch('http://universities.hipolabs.com/search?country=United%20States'); // Replace with your API endpoint URL
      const data = await response.json();
      setUniversitiesData(data);
    } catch (error) {
      console.error('Error fetching university data:', error);
    }
  };

  const handleSearch = () => {
    const filtered = universitiesData.filter(university =>
      university.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by university name"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Button title="Search" onPress={handleSearch} />
      <ScrollView>
      {filteredData.map(university => (
        <View key={university.name} style={styles.resultBox}>
          <Text style={styles.nameText}>Name: {university.name}</Text>
          <Text style={styles.websiteText}>Website: {university.web_pages[0]}</Text>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  websiteText: {
    fontSize: 14,
  },
});



export default App;