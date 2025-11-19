import Text from './Font/Text'
import CloseSVG from './ui/CloseSVG'


export function Purchase({id, qtd, selected, title, category, price, onSelect, onClose, data}) {
  const date = data?.toDate();
  return (
    <article style={{backgroundColor:"var(--verylightgrey)", display:"flex", justifyContent:"space-between", gap:"1rem", alignItems:"flex-start", padding:"1rem"}}>
      <div>
        <h4>{title}</h4>
        <Text.Default>{category}</Text.Default>
        {date && <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>}
      </div>
      <div>
        <p>R$ {price.toFixed(2)}</p>
        <p style={{fontSize:".875rem", color:"grey"}}>Qtd: {qtd}</p>
      </div>
      <div style={{display:"flex", alignItems:"center", gap:".5rem"}}>
        {
          onSelect &&
          <input checked={selected} type="checkbox" name="d" onChange={(e) => onSelect(e.target.checked)}/>
        }
        {
          onClose &&
          <CloseSVG onClick={onClose}/>
        }
      </div>
   </article>
  );
}