import Inner from "@/components/ui/Inner";

interface ErrorMessagePropsType{
    text: string;
}

export default function ErrorMessage({ text }: ErrorMessagePropsType) {
    return (
        <div className="error-message sub-page">
            <Inner>
                <div className="blur-box">
                    <div>🚨 {text} 🚨</div>
                </div>
            </Inner>
        </div>
    );
}
