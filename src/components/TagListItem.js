import React from 'react';

export default function TagListItem({ tag, key }) {
  return (
    <div className="tag">
      <div className="tag-name">{tag.name}</div>
    </div>
  )
}