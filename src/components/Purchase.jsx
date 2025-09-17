import Text from './Font/Text'
import CloseSVG from './ui/CloseSVG'
import EditSVG from './ui/EditSVG'


const Purchase = ({id, qtd, selected, title, category, price, onSelect, onClose}) => {

  return (
    <article style={{backgroundColor:"var(--verylightgrey)", display:"flex", flexWrap:'wrap', justifyContent:"space-between", gap:"1rem", alignItems:"flex-start", padding:"1rem"}}>
      <div>
        <h4>{title}</h4>
        <Text.Default>{category}</Text.Default>
      </div>
      <div>
        <p>R$ {price.toFixed(2)}</p>
        <p style={{fontSize:".875rem", color:"grey"}}>Qtd: {qtd}</p>
      </div>
      <div style={{display:"flex", alignItems:"center", gap:".5rem"}}>
        <input checked={selected} type="checkbox" name="d" onChange={(e) => onSelect(e.target.checked)}/>
        <EditSVG/>
        <CloseSVG onClick={onClose}/>
      </div>
   </article>
  )
}

export default Purchase