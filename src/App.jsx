import { useState, useEffect } from 'react'
import { TodoProvider } from './context'
import { TodoForm, TodoItem } from './components'


function App() {

  const [todos,setTodos] = useState([])
  // state should have all the todos

  const addTodo = (todo) => {
      setTodos((prev) => [{id:Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id,todo) => {
    //loop and find the id of the todo to be updated

    setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id) === id ? todo: prevTodo))

  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev)=> prev.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }


useEffect(() => {
  try {
    const storedTodos = localStorage.getItem("todos");
    const parsedTodos = storedTodos ? JSON.parse(storedTodos) : []; // Default to empty array if no valid todos
    setTodos(parsedTodos);
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    setTodos([]); // Fallback to empty array if parsing fails
  }
}, []);


  //
  useEffect(() => {

    localStorage.setItem("todos",JSON.stringify(todos))
    
  }, [todos])

  return (
  <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
<div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                     <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                      {todos.map((todo) => (
                        <div key={todo.id} className='w-full'> 
                          <TodoItem todo={todo}/>
                        </div>
                      ))}
                 
                    </div>
                </div>
            </div>
            </TodoProvider>
  )
}

export default App
