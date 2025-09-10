import { useState } from "react"

const Input = ({...props}) => {
    return (
        <input {...props} style={{
            display:"block",
            width:"100%",
            fontSize:"0.875rem",
            lineHeight:"1.25rem",
            padding:"0.5rem 0.75rem",
            marginTop:".5rem",
            backgroundColor:"var(--verylightgrey)",
            border:"1px solid hsl(215 20% 92%)",
        }}/>
    )
}

export default Input