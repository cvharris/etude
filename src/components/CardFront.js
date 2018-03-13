import React from 'react';

export default function CardFront({ renderedText }) {

  return (
    <div className="card">
      <div dangerouslySetInnerHTML={{ __html: renderedText }}></div>
    </div>
  )
};