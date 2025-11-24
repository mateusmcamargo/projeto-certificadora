import './purchase.scss';
import Font from '../font/Font';

const truncateString = (str, num) => {
    if (!str) return '';
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
};

export function Purchase({ id, qtd, selected, name, category, price, onSelect, onClose, data, actions}) {
const date = data?.toDate();

    const truncateName     = truncateString(name, 20);
    const truncateCategory = truncateString(category, 10);

    return (
        <article className="purchase">
            <div className="purchase info">
                <h4>{truncateName}</h4>
                <Font.Text className='category'>{truncateCategory}</Font.Text>
                {date && (
                    <p>
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    </p>
                )}
            </div>

            <div className="purchase price">
                <p>R${price}</p>
                <p className="qtd">Qtd: {qtd}</p>
            </div>

            {actions && (
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
            )}
        </article>
    );
}
