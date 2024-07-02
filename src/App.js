// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;





import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import './App.css';
 
const App = () => { 
  const [todos, setTodos] = useState([]); 
  const [text, setText] = useState(''); 
 
  useEffect(() => { 
    axios.get('https://mern-backend-7eqc.onrender.com/todos') 
      .then(response => setTodos(response.data)) 
      .catch(error => console.error('Error fetching data: ', error)); 
  }, []); 
 
  const addTodo = () => { 
    if (text) { 
      axios.post('https://mern-backend-7eqc.onrender.com/todos', { text }) 
        .then(response => setTodos([...todos, response.data])) 
        .catch(error => console.error('Error adding todo: ', error)); 
      setText(''); 
    } 
  }; 
 
  const deleteTodo = (id) => { 
    axios.delete(`https://mern-backend-7eqc.onrender.com/todos/${id}`) 
      .then(response => setTodos(todos.filter(todo => todo._id !== id))) 
      .catch(error => console.error('Error deleting todo: ', error)); 
  }; 
 
  return ( 
    <div className="App"> 
      <h1>To-Do List</h1> 
      <input  
        type="text"  
        value={text}  
 
        onChange={(e) => setText(e.target.value)}  
        placeholder="Add a new task"  
      /> 
      <button onClick={addTodo}>Add</button> 
      <ul> 
        {todos.map(todo => ( 
          <li key={todo._id}> 
            {todo.text} 
            <button onClick={() => deleteTodo(todo._id)}>Delete</button> 
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
}; 
 
export default App;
