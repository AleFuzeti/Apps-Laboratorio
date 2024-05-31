import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenseScreen = ({ navigation, route }) => {
  const { addExpense } = route.params;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido.');
      return;
    }
    if (!category) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }
    const expense = { amount: parsedAmount.toFixed(2), description, category, date: new Date().toISOString() };
    addExpense(expense);
    navigation.goBack();
  };

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await AsyncStorage.getItem('categories');
      if (categoriesData) {
        setCategories(JSON.parse(categoriesData));
      }
    };
    loadCategories();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput
          placeholder="Valor"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Picker
          selectedValue={category}
          onValueChange={itemValue => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Categoria" value="" />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
        <Button title="Adicionar Despesa" onPress={handleAddExpense} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
});

export default AddExpenseScreen;
