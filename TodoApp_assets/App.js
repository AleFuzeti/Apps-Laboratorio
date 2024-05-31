import { View, StyleSheet, ScrollView } from 'react-native';
import React, {Component} from 'react';
import Heading from './Heading';
import Input from './Input';
import Button from './Button';
import TodoList from './TodoList';


let todoIndex = 0


class App extends Component {
 constructor(){
   super()
   this.state = {
     inputValue:'',
     todos:[],
     type: 'All'
   }
   this.submitTodo = this.submitTodo.bind(this)
 }


 inputChange(inputValue){
   console.log(' Input Value: ', inputValue)
   this.setState({inputValue})
 }


 submitTodo () {
   if (this.state.inputValue.match(/^\s*$/)){
     return
   }
   const todo = {
     title: this.state.inputValue,
     todoIndex,
     complete: false
   }
   todoIndex++
   const todos = [...this.state.todos, todo]
   this.setState({ todos, inputValue: ''}, () => {console.log('State: ', this.state)})
 }


 render(){
   const { inputValue, todos } = this.state
   return (
     <View style={styles.container}>
       <ScrollView
         keyboardShouldPersistTaps='always'
         style={styles.content}>
         <Heading />
         <Input
           inputValue={inputValue}
           inputChange={ (text) => this.inputChange(text)} />
         <TodoList todos={todos} />
         <Button submitToDo={this.submitTodo} /> 
       </ScrollView>
     </View>
   )
 }
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
 },
 content: {
   flex: 1,
   paddingTop: 60
 }
})


export default App