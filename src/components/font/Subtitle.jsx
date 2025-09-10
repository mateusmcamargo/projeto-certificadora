const Subtitle = ({children, ...props}) => {
  return (
    <h2 {...props} className="subtitle" style={{ 
        fontSize: "1.5rem",
        fontWeight: 600
    }}>{children}</h2>
  )
}

export default Subtitle;