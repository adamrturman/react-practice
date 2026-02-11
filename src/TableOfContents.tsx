import { useCallback, useEffect, useState } from 'react';
import DropdownSection from './DropdownSection';

const CONTENTS: Record<string, Array<string>> = {
  'About': ['Summary', 'Resume', 'CV'],
  'Work': ['Example 1', 'Example 2', 'Example 3'],
  'Contact': ['LinkedIn', 'Email', 'Phone', 'Github']
}

const LOCAL_STORAGE_KEY = 'TableOfContents';

export default function TableOfContents() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [contents, setContents] = useState(
    saved ? JSON.parse(saved) : CONTENTS
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contents))
  }, [contents]);


  //  don't recreate this function or it will trigger rerenders
  //  of all sections when a new entry is added to a single section
  const handleAddEntry = useCallback((entry: string, header: string) => {
    setContents((prev) => {
      if (!prev[header].includes(entry)) {
        return {
          ...prev,
          [header]: [...prev[header], entry]
        }
      } else {
        return prev
      }
    })
  }, []);

  const handleReset = () => {
    setContents(CONTENTS)
  }

  const displayedContents = Object.entries(contents).map(([header, subtitles]) => {
    return (
      <DropdownSection key={header} header={header} subtitles={subtitles} handleAddEntry={handleAddEntry} />
    );
  });

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      {displayedContents}
    </>
  );
}
