import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, TextInput, StyleSheet } from 'react-native';

export default class MyComponent extends Component { // esconde o teclado ao clicar fora do input
  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Digite algo..." />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
