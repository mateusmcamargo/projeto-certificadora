import React from 'react'
import Text from './Font/Text'


const Purchase = ({title, category, price}) => {
  return (
    <article style={{backgroundColor:"var(--verylightgrey)", display:"flex", flexWrap:'wrap', justifyContent:"space-between", gap:"1.5rem", alignItems:"center", padding:"1rem"}}>
      <div>
        <h3>{title}</h3>
        <Text.Default>{category}</Text.Default>
      </div>
      <p>R$ {price.toFixed(2)}</p>
    </article>
  )
}

export default Purchase