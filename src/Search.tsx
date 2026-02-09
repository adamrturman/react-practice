import { type ChangeEvent, use, useEffect, useMemo, useState } from 'react';
import wordsList from './wordList.json';

interface CacheType {
  query: string;
  results: Array<string>;
}

export default function Search() {
  const [term, setTerm] = useState('');
  const [cache, setCache] = useState<CacheType>({ query: '', results: []});
  const [list, setList] = useState<Array<string>>(wordsList);

  const filteredItems = useMemo(() => {
    if (!term.length) {
      setCache({ query: '', results: []})
      return list;
    }

    if (term.startsWith(cache.query)) {
      return cache.results.filter(word => word.startsWith(term))
    } else {
      setCache({ query: term, results: list.filter(word => word.startsWith(term))})
      return list.filter(word => word.startsWith(term))
    }

  }, [term, cache.query, cache.results, list])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  }

  const displayedResults = list.filter(word => word.startsWith(term)).map(w => {
    return (
      <p>{w}</p>
    );
  });

  return (
    <>
      <input value={term} onChange={handleChange} />
      <p>Results :</p>
      {term.length > 0 && displayedResults}
    </>
  );
}
