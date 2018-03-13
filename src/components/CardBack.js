import React from 'react'

export default function CardBack({ rawText, handleUpdate }) {
  return (
    <div className="card">
      <textarea value={rawText} onChange={(e) => handleUpdate(e.target.value)}></textarea>
    </div>
  )
}