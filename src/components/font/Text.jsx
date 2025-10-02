const Default = ({children,...props}) => {
  return (
    <p {...props} style={{
        fontSize:".875rem",
        lineHeight:"1.25rem"
    }}>{children}</p>
  )
}

const Text = {
    Default
}

export default Text