import React from 'react';

export default function Preview({ renderedText }) {

  return (
    <div dangerouslySetInnerHTML={{ __html: renderedText }}></div>
  )
};