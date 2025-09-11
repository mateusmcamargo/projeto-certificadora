import { useEffect, useState } from 'react';
import Text from './Font/Text'
import CloseSVG from './ui/CloseSVG'
import EditSVG from './ui/EditSVG'


const Purchase = ({title, category, price, onSelect, onClose}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onSelect(checked);
  }, [checked]);

  return (
    <article style={{backgroundColor:"var(--verylightgrey)", display:"flex", flexWrap:'wrap', justifyContent:"space-between", gap:"1.5rem", alignItems:"center", padding:"1rem"}}>
      <div>
        <h3>{title}</h3>
        <Text.Default>{category}</Text.Default>
      </div>
      <p>R$ {price.toFixed(2)}</p>
      <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
        <input checked={checked} type="checkbox" name="d" onChange={() => {setChecked(!checked)}}/>
        <EditSVG/>
        <CloseSVG onClick={onClose}/>
      </div>
   </article>
  )
}

export default Purchase