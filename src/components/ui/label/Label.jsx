import './label.css';

export function Label({children, style, ...props}) {
return (
    <label {...props}>
        {children}
    </label>
)
}