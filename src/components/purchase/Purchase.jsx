import './purchase.scss';
import Font from '../font/Font';
import CloseSVG from '../ui/CloseSVG';

export function Purchase({ id, qtd, selected, title, category, price, onSelect, onClose, data }) {
const date = data?.toDate();

    return (
        <article className="purchase">
            <div className="purchase info">
                <h4>{title}</h4>
                <Font.Text className='category'>{category}</Font.Text>
                {date && (
                    <p>
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    </p>
                )}
            </div>

            <div className="purchase price">
                <p>R${price.toFixed(2)}</p>
                <p className="qtd">Qtd: {qtd}</p>
            </div>

            <div className="purchase actions">
                {onSelect && (
                    <input
                        checked={selected}
                        type="checkbox"
                        onChange={(e) => onSelect(e.target.checked)}
                    />
                )}

                {onClose &&
                    <i className='fa-solid fa-xmark' onClick={onClose}></i>
                }
            </div>
        </article>
    );
}
