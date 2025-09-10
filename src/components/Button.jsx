const Default = ({children, style, ...props}) => {
    return (
        <button {...props} style={{fontSize:"1rem", backgroundColor: "var(--blue)", color:"white", width:"100%", padding:".75rem 1rem", border:"none", borderRadius:".5rem", ...style}}>
            {children}
        </button>
    )
}

const Submit = ({children, disabled, style, ...props}) => {
    return (
        <button {...props} disabled={disabled} style={{fontSize:"1rem", backgroundColor: disabled ? "var(--lightblue)" : "var(--blue)", color:"white", width:"100%", padding:".75rem 1rem", border:"none", borderRadius:".5rem", ...style}}>
            {children}
        </button>
    )
}

const Cancel = ({children, ...props}) => {
    return (
        <button {...props} style={{fontSize:"1rem", backgroundColor: "var(--cian)", color:"white", width:"100%", padding:".75rem 1rem", border:"none", borderRadius:".5rem"}}>
            {children}
        </button>
    )
}

const optionSelectedStyle = {
    backgroundColor: "var(--blue)",
    color: "white",
}
const optionUnselectedStyle = {
    backgroundColor: "white",
    color: "var(--blue)",
}

const Option = ({children, selected, ...props}) => {
    return (
        <button {...props} style={{...(selected ? optionSelectedStyle : optionUnselectedStyle) , fontSize:".875rem", fontWeight:200, width:"100%", padding:".5rem 1rem", border:"2px solid var(--blue)", borderRadius:".5rem"}}>
            {children}
        </button>
    )
}

const Button = {
    Default,
    Submit,
    Option,
    Cancel
}

export default Button