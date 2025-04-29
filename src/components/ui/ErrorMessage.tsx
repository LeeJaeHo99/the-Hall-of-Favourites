import { ErrorMessageProps } from "../../types/types";
import Inner from "@/components/ui/Inner";

export default function ErrorMessage({ text }: ErrorMessageProps) {
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
