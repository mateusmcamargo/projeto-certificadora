import './button.css';

const Default = ({children, style, ...props}) => {
    return (
        <button className='button default' {...props}>
            {children}
        </button>
    )
}

const Submit = ({children, disabled, style, ...props}) => {
    return (
        <button className='button submit' {...props}>
            {children}
        </button>
    )
}

const Cancel = ({children, ...props}) => {
    return (
        <button className='button cancel' {...props}>
            {children}
        </button>
    )
}

const Option = ({children, selected, ...props}) => {
    return (
        <button className='button option' {...props}>
            {children}
        </button>
    )
}

const Button = {
    Default,
    Submit,
    Option,
    Cancel
}

export default Button