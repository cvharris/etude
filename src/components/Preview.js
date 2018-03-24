import React from 'react'

export default function Preview({ renderedText }) {

  return (
    <div className="card" dangerouslySetInnerHTML={{ __html: renderedText }}></div>
  )
};