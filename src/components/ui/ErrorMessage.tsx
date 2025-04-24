import { ErrorMessageProps } from '../../types/types';

export default function ErrorMessage({text}: ErrorMessageProps){
    return(
        <div>🚨 {text} 🚨</div>
    );
}