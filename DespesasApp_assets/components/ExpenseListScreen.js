import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

const ExpenseListScreen = ({ navigation, expenses, addExpense, deleteExpense }) => {

  const renderItem = ({ item }) => ( // renderizar item
    <View style={styles.item}>
      <Text onPress={() => showAlert(item.description)}>{truncateDescription(item.description)}</Text>
      <Text>{item.amount}</Text>
      <Text>{item.category}</Text>
      <Button title="Deletar" onPress={() => deleteExpense(item.date)} />
    </View>
  );

  const showAlert = (description) => { // mostrar alerta com descrição completa
    Alert.alert(
      'Descrição Completa',
      description,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  };

  const truncateDescription = (description) => { // descrição reduzida pra caber na tela
    return description.length > 15 ? `${description.substring(0, 15)}...` : description;
  };

  return (  
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={item => item.date}
      />
      <Button
        title="Adicionar Despesa"
        onPress={() => navigation.navigate('AddExpense', { addExpense })}
      />
    </View>
  );
};

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ExpenseListScreen;
