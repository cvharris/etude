import React from 'react'

export default function Editor({ rawText, handleUpdate }) {
  return (
    <textarea className="card" value={rawText} onChange={(e) => handleUpdate(e.target.value)}></textarea>
  )
}