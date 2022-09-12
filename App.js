import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

const [amount, setAmount] = useState('');
const [rates, setRates] = useState([]);
const [selectedValue, setSelectedValue] = useState('');
const [quo, setQuo] = useState('');

 // kun äppi käynnistyy, haetaan kurssit pickerille
 useEffect ( () => { 
  getRates(); 
 }, [])

const getRates = () => {
  const url = `http://api.exchangeratesapi.io/latest?access_key=cbb19a85e3e50c092199b688366f1597`
  fetch(url)
  .then ( response => response.json() )
  .then ( responseJson => setRates(responseJson.rates) )
  .catch((error) => {
    Alert.alert('Error', error);
  });
}

const getConversion = () => {
  for (const [code, rate] of Object.entries(rates)) {
  if (code === selectedValue) {
  setQuo( amount / rate ); // tässä voi olla perässä .toFixed(5)
  }
  } }

  // mapissa on argumentti index joka automaattisesti kasvattaa keyta yhdellä alkaen nollasta eli käytä sitä jatkossa

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Image style={{  width:150, height:200 }}
        source={require('./moneybag.jpg')}  />
        <Text style={{ fontSize:24 }} > 
          {Math.round(quo * 100) / 100} € </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={{width:100, borderColor:'gray', borderWidth:1}} 
        keyboardType='numeric'
        value={amount}
        onChangeText={setAmount}
        />
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => 
          setSelectedValue(itemValue) 
        } > 
        {(Object.entries(rates)).map (entry => { 
          return (  
          <Picker.Item key={entry[0]} label={entry[0]} value={entry[0]} /> 
          ) })}
      </Picker>
        <Button title="convert"
        onPress = {getConversion} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 2,
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
