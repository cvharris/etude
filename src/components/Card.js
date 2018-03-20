import React from 'react'
import Editor from './Editor'
import Preview from './Preview'

export default function Card({ rawText, handleUpdate, renderedText }) {
  return (
    <div className="side-by-side">
      <div className="card">
        <Editor rawText={rawText} handleUpdate={handleUpdate} />
      </div>
      <div className="card">
        <Preview renderedText={renderedText} />
      </div>
    </div>
  )
}