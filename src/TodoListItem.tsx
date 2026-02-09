import type { TodoItem } from './Todo';
import { type ChangeEvent, useState } from 'react';

interface TodoListItemProps {
  item: TodoItem;
  handleToggleComplete: (item: TodoItem) => void;
  handleDelete: (item: TodoItem) => void;
  handleSave: (item: TodoItem, updatedText: string) => void;
}

export default function TodoListItem({ item, handleDelete, handleToggleComplete, handleSave }: TodoListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(item.text);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleUpdatedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(e.target.value);
  }

  const handleSaveClick = () => {
    handleSave(item, updatedText);
    setIsEditing(false);
  }

  return (
    isEditing ?
      <>
        <input value={updatedText} onChange={handleUpdatedChange} />
        <button onClick={handleSaveClick}>Save</button>
      </> :
    <li>
      <p style={{ textDecoration: item.isCompleted ? 'line-through' : '' }}>{item.text}</p>
      <button onClick={() => handleToggleComplete(item)}>Toggle complete</button>
      <button onClick={() => handleDelete(item)}>Delete</button>
      <button onClick={toggleEdit}>Edit</button>
    </li>
  )
}
