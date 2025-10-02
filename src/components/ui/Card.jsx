const Card = ({children, style, ...props}) => {
  return (
    <article {...props} style={{maxWidth: '600px', margin: '1rem', padding: '1rem', border:"1px solid var(--border-color)", ...style}}>
        {children}
    </article>
  )
}

export default Card