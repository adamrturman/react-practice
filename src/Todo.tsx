import { type ChangeEvent, type FormEvent, Fragment, useState } from 'react';
import TodoListItem from './TodoListItem';

export interface TodoItem {
  text: string;
  isCompleted: boolean;
  id: string
}

export default function Todo() {
  const [currentTodo, setCurrentTodo] = useState('');
  const [list, setList] = useState<Array<TodoItem>>([])

  const handleAddTodo = (text: string) => {
    const todoToAdd: TodoItem = {
      text,
      isCompleted: false,
      id: crypto.randomUUID(),
    }
    const updatedList = [...list, todoToAdd];

    setList(updatedList);
    setCurrentTodo('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddTodo(currentTodo);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo(e.target.value);
  };

  const handleDelete = (item: TodoItem) => {
    const updatedList = list.filter(todo => todo.id !== item.id);

    setList(updatedList);
  }

  const handleToggleComplete = (item: TodoItem) => {
    const updatedTodos = list.map(todo => {
      if (todo.id === item.id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      }
      return todo;
    });

    setList(updatedTodos);
  }

  const handleSave = (item: TodoItem, updatedText: string) => {
    const updatedTodos = list.map(todo => {
      if (todo.id === item.id) {
        return {
          ...todo,
          text: updatedText,
        }
      }
      return todo;
    });

    setList(updatedTodos);
  }

  const displayedList = list.map(item => {
    return (
      <Fragment key={item.id}>
        <TodoListItem item={item} handleToggleComplete={handleToggleComplete} handleDelete={handleDelete} handleSave={handleSave} />
      </Fragment>
    )
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={currentTodo}/>
        <button>Add todo</button>
      </form>
      <ul>
        {displayedList}
      </ul>
    </>
  )
}
