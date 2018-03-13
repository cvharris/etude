import React from 'react';

export default function CardFront({ renderedText }) {

  return (
    <div className="card">
      <div>{renderedText}</div>
    </div>
  )
};