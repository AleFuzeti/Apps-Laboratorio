import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoriesScreen = ({ navigation, addCategory, deleteCategory, categoriesVersion }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => { // carregar categorias
    const loadCategories = async () => {
      const categoriesData = await AsyncStorage.getItem('categories');
      if (categoriesData) {
        setCategories(JSON.parse(categoriesData));
      }
    };
    loadCategories();
  }, [categoriesVersion]);

  const handleDeleteCategory = (category) => { // apagar categoria
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza de que deseja excluir a categoria "${category}" e todas as despesas associadas?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteCategory(category) },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => ( // renderizar item
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <Button title="Deletar" onPress={() => handleDeleteCategory(item)} />
    </View>
  );

  return (  // retornar FlatList com categorias
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
      <Button title="Adicionar Categoria" onPress={() => navigation.navigate('AddCategory', { addCategory })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  itemText: {
    fontSize: 18,
  },
});

export default CategoriesScreen;
