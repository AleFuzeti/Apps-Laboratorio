import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportScreen = ({ expenses }) => {  
  if (!expenses) {
    return <Text style={styles.errorMessage}>Nenhuma despesa encontrada</Text>;
  }
  const getTotalByCategory = (category) => { // calcular total por categoria
    return expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  };

  const categories = [...new Set(expenses.map(expense => expense.category))];

  return (  // renderizar relatório
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Despesas</Text>
      {categories.map(category => (
        <Text key={category} style={styles.categoryText}>Total {category}: R$ {getTotalByCategory(category)}</Text>
      ))}
      <Text style={styles.totalText}>Total Geral: R$ {expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0)}</Text>
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
    fontWeight: 'bold', 
  },
  categoryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold', 
  },
  errorMessage: {
    fontSize: 16,
    color: 'red', 
    textAlign: 'center',
    marginTop: 20, 
  },
});

export default ReportScreen;
