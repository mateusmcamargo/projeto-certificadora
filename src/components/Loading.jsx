import React from 'react'

export function Loading() {
  return (
    <div className='rotating' style={{position:'absolute',inset:-6, aspectRatio:1, borderInline:"8px solid var(--blue)", borderBlock:"8px solid transparent", borderRadius:"50%"}}></div>
  );
}