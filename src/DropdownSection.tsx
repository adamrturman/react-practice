import { type ChangeEvent, Fragment, memo, useState } from 'react';

interface Props {
  header: string;
  subtitles: Array<string>;
  handleAddEntry: (entry: string, header: string) => void;
}

function DropdownSection({header, subtitles, handleAddEntry}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingMode, setEditingMode] = useState(false)
  const [updatedEntry, setUpdatedEntry] = useState('');

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }

  const toggleEditingMode = () => {
    setEditingMode((prev) => !prev)
  }

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedEntry(e.target.value)
  }

  const handleSaveClick = () => {
    handleAddEntry(updatedEntry, header)
    setEditingMode(false)
  }

  const mappedSubtitles = subtitles.map(s => (
    <li key={s}>{s}</li>
  ));

  return (
    <Fragment key={header}>
      <div style={{display: 'flex'}}>
      <h3>{header}</h3>
      <button onClick={toggleExpanded}>{isExpanded ? '^' : '⌄'}</button>
      <button onClick={toggleEditingMode}>{editingMode ? 'Close' : 'Add item'}</button>
        {editingMode &&
          <>
          <input value={updatedEntry} onChange={handleUpdate} />
          <button onClick={handleSaveClick}>Save</button>
          </>

        }
      </div>
      {isExpanded && <ul style={{ marginLeft: '5rem' }}>
        {mappedSubtitles}
      </ul>}
    </Fragment>
  )
}

export default memo(DropdownSection)
