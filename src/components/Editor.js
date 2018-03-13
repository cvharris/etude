import React from 'react'

export default function Editor({ rawText, handleUpdate }) {
  return (
    <textarea value={rawText} onChange={(e) => handleUpdate(e.target.value)}></textarea>
  )
}