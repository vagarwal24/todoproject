import logo from './logo.svg';
import './App.css';
import Header from "./MyComponents/Header";
import {Todos} from "./MyComponents/Todos";
import {Footer} from "./MyComponents/Footer";
import {Addtodo} from "./MyComponents/Addtodo";
import {About} from "./MyComponents/About";
import React, { useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) =>{
    console.log("I am ondelete of todo", todo);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);
    setTodo(todos.filter((e)=>{
      return e!==todo;
  }));
     localStorage.setItem("todos", JSON.stringify(todos))
  }
  const addTodo = (title, desc)=>{
    console.log("I am adding this todo", title, desc)
    let sno;
    if (todos.length==0) {
      sno=0;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodo([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodo] = useState([initTodo]);
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
      
      }, [todos])
  
  return (
    <>
    <Router>
     <Header title="MyTodosList" searchBar={true}/>
       <Routes>
          <Route exact path="/" render={()=>{
            return(
            <>
              <Addtodo addTodo={addTodo}/>
             <Todos todos={todos} onDelete={onDelete}/>
             </>)
           }}>
           </Route>
           <Route exact path="/about" element={<About/>}/>
           
        </Routes>

   

     <Footer/>
    </Router> 
     
     </>
  );
}

export default App;
