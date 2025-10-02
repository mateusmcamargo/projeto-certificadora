const Title = ({children, ...props}) => {
  return (
    <h1 {...props} className="title" style={{
    fontSize:"1.875rem",
    fontWeight:700,
    lineHeight:"2.25rem"}}>{children}</h1>
  )
}

export default Title