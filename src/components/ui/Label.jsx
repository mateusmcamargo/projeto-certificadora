import React from 'react'

const Label = ({children, style, ...props}) => {
  return (
    <label {...props} style={{ display:"block", fontSize:".875rem", lineHeight:"1", fontWeight:"500",...style}}>
        {children}
    </label>
  )
}

export default Label