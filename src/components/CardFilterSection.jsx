import React from 'react'
import Button from './ui/Button'

export function CardFilterSection({profile, cardFilter, setCardFilter}) {

    return (
        <div>
            {
                profile.cards &&
                <ul style={{display:'flex', gap:'0.5rem', flexWrap:'wrap', listStyle:'none'}}>
                    <li>
                        <Button.Option selected={cardFilter == ""} onClick={() => setCardFilter("")}>Nenhum</Button.Option>
                    </li>
                    {
                        profile.cards.map((c) => (
                            <li key={c.id}>
                                <Button.Option selected={cardFilter == c.id} onClick={() => setCardFilter(c.id)}>{c.title}</Button.Option>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
  );
}