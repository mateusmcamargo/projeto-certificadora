import './font.css';

const Title = ({ children, className = '', ...props }) => {
    return (
        <h1 {...props} className={`title ${className}`}>
            {children}
        </h1>
    );
};

const Subtitle = ({ children, className = '', ...props }) => {
    return (
        <h2 {...props} className={`subtitle ${className}`}>
            {children}
        </h2>
    );
};

const Text = ({ children, className = '', ...props }) => {
    return (
        <p {...props} className={`text ${className}`}>
            {children}
        </p>
    );
};

const Font = {
    Title,
    Subtitle,
    Text,
};

export default Font;