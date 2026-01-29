import { type ChangeEvent, useEffect, useState } from 'react';
import { List, type ListRowProps } from 'react-virtualized';

export default function BigList() {
  const [count, setCount] = useState('3');
  const [list, setList] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`https://meowfacts.herokuapp.com/?count=${count}`);
        const responseData = await response.json();
        setList(responseData.data);
      } catch (error) {
        console.error('Failed to fetch list:', error);
      }
    };

    fetchList();
  }, [count]);

  const rowRenderer = ({ index, key, style }: ListRowProps) => (
    <div
      key={key}
      style={{
        ...style,
        overflow: 'hidden',
        padding: '8px',
        boxSizing: 'border-box',
      }}
    >
      {list[index]}
    </div>
  );

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length !== 0 && !isNaN(Number(e.target.value))) {
      setCount(e.target.value);
    }
  }

  return (
    <>
    <input value={count} onChange={handleCountChange} />
    <List
      width={1000}
      height={500}
      rowCount={list.length}
      rowHeight={80}
      rowRenderer={rowRenderer}
    />
    </>
  );
}
