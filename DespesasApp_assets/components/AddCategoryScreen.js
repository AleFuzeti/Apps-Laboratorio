import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const AddCategoryScreen = ({ navigation, addCategory }) => {
  const [category, setCategory] = useState('');

  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() => {
          navigation.goBack();
          addCategory(category); 
        }}
        title="Salvar"
      />
    ),
  });

  return ( 
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
      <View style={styles.container}>
        <TextInput
          placeholder="Categoria"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />
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
});

export default AddCategoryScreen;
