import { memo } from 'react';

interface ListItemProps {
  name: string;
  onClick: () => void;
}


const MemoizedListItem = memo(function ListItem({name, onClick}: ListItemProps) {
  console.log('rendering list item')
  return (
    <li onClick={onClick}>{name}</li>
  );
})

export default MemoizedListItem
