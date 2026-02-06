import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import ListItem from './ListItem';
import MemoizedListItem from './ListItem';

export default function ListWithProps() {
  const [count, setCount] = useState(1);
  const [list, setList] = useState<Array<string>>([]);

  const handleCountChange = () => {
    setCount((prev) => prev + 1)
  }

  useEffect(() => {
    const controller = new AbortController();
    const fetchList = async () => {
      try {
        const response = await fetch(`https://meowfacts.herokuapp.com/?count=100`, {
          signal: controller.signal
        });
        const responseData = await response.json();
        setList(responseData.data);
      } catch {
        console.error('Oops')
      }
    }

    fetchList();

    return () => controller.abort()

  }, []);

  //  When count changes, this component reruns and recreates this function, which gets passed down to each
  //  child in the list below, every single one of them is rerendered when the count changes, because
  //  this onClick function is a "new" prop to ListItem
  // const onClick = () => {
  //   console.log('calling onClick')
  // }
  const onClick = useCallback(() => {
    console.log('calling onclick')
  }, [])

  const mappedList = list.map(item => {
    return (
      <MemoizedListItem name={item} onClick={onClick} />
    )
  })

  return (
    <>
      <input onChange={handleCountChange} value={count} />
      {count}
      {mappedList}
    </>
  );
}
