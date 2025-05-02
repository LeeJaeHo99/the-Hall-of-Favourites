interface ErrorMessagePropsType{
    text: string;
}

export default function ErrorMessage({ text }: ErrorMessagePropsType) {
    return (
        <div className="error-message">
                <div className="blur-box">
                    <div>🚨 {text} 🚨</div>
                </div>
        </div>
    );
}
