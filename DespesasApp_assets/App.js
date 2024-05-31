import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import AddExpenseScreen from './components/AddExpenseScreen';
import ExpenseListScreen from './components/ExpenseListScreen';
import ReportScreen from './components/ReportScreen';
import CategoriesScreen from './components/CategoriesScreen';
import AddCategoryScreen from './components/AddCategoryScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ExpenseStack = ({ expenses, addExpense, deleteExpense, addCategory, deleteExpensesByCategory }) => (
  <Stack.Navigator>
    <Stack.Screen name="ExpenseList">
      {(props) => <ExpenseListScreen {...props} expenses={expenses} addExpense={addExpense} deleteExpense={deleteExpense} />}
    </Stack.Screen>
    <Stack.Screen name="AddExpense">
      {(props) => <AddExpenseScreen {...props} addExpense={addExpense} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const CategoriesStack = ({ addCategory, deleteCategory, categoriesVersion }) => (
  <Stack.Navigator>
    <Stack.Screen name="CategoryList">
      {(props) => <CategoriesScreen {...props} addCategory={addCategory} deleteCategory={deleteCategory} categoriesVersion={categoriesVersion} />}
    </Stack.Screen>
    <Stack.Screen name="AddCategory">
      {(props) => <AddCategoryScreen {...props} addCategory={addCategory} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesVersion, setCategoriesVersion] = useState(0);

  const loadCategories = async () => {
    const categoriesData = await AsyncStorage.getItem('categories');
    if (categoriesData) {
      const parsedCategories = JSON.parse(categoriesData);
      setCategories(parsedCategories);
      return parsedCategories;
    }
    return [];
  };

  const loadExpenses = async () => {
    const expensesData = await AsyncStorage.getItem('expenses');
    if (expensesData) {
      let parsedExpenses = JSON.parse(expensesData);
      const validCategories = await loadCategories();
      parsedExpenses = parsedExpenses.filter(expense => validCategories.includes(expense.category));
      setExpenses(parsedExpenses);
      await AsyncStorage.setItem('expenses', JSON.stringify(parsedExpenses));
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [categoriesVersion]);

  const addExpense = async (expense) => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  const deleteExpense = async (date) => {
    const newExpenses = expenses.filter(expense => expense.date !== date);
    setExpenses(newExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  const deleteExpensesByCategory = async (category) => {
    const newExpenses = expenses.filter(expense => expense.category !== category);
    setExpenses(newExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  const addCategory = async (category) => {
    const newCategories = [...categories, category];
    await AsyncStorage.setItem('categories', JSON.stringify(newCategories));
    setCategories(newCategories);
    setCategoriesVersion(categoriesVersion + 1);
  };

  const deleteCategory = async (categoryToDelete) => {
    const filteredCategories = categories.filter(category => category !== categoryToDelete);
    await AsyncStorage.setItem('categories', JSON.stringify(filteredCategories));
    setCategories(filteredCategories);
    setCategoriesVersion(categoriesVersion + 1);
    await deleteExpensesByCategory(categoryToDelete);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Expenses') {
                iconName = focused ? 'cash' : 'cash';
              } else if (route.name === 'Reports') {
                iconName = focused ? 'analytics' : 'analytics-outline';
              } else if (route.name === 'Categories') {
                iconName = focused ? 'pricetag' : 'pricetags-outline';
              } else {
                iconName = 'default-icon'; // Valor padrão caso nenhum dos casos acima seja satisfeito
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue', // Cor dos ícones ativos
            inactiveTintColor: 'gray', // Cor dos ícones inativos
          }}
        >
          <Tab.Screen name="Expenses">
            {() => <ExpenseStack expenses={expenses} addExpense={addExpense} deleteExpense={deleteExpense} addCategory={addCategory} deleteExpensesByCategory={deleteExpensesByCategory} />}
          </Tab.Screen>
          <Tab.Screen name="Reports">
            {() => <ReportScreen expenses={expenses} />}
          </Tab.Screen>
          <Tab.Screen name="Categories">
            {() => <CategoriesStack addCategory={addCategory} deleteCategory={deleteCategory} categoriesVersion={categoriesVersion} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </TouchableWithoutFeedback>
  );
};

export default App;
