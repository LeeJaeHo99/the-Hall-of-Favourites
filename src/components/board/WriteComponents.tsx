import Image from "next/image";

interface LabelPropsType<T> {
    id: string;
    title: string;
    value: string;
    onChange: (e: React.ChangeEvent<T>) => void;
    placeHolder: string;
    length: number;
}

type InputLabelPropsType = LabelPropsType<HTMLInputElement> & { type: string };
type TextAreaLabelPropsType = LabelPropsType<HTMLTextAreaElement>;

export function InputLabel({ id, title, value, onChange, placeHolder, length, type }: InputLabelPropsType) {
    return (
        <label htmlFor={`${id}`} className="blur-box">
            <div className="title-wrap">
                <span>{title}</span>
            </div>
            <input
                value={value}
                onChange={onChange}
                type={type}
                id={`${id}`}
                maxLength={length}
                placeholder={placeHolder}
            />
        </label>
    );
}

export function TextAreaLabel({ id, title, value, onChange, placeHolder, length }: TextAreaLabelPropsType) {
    return (
        <label htmlFor={`${id}`} className="blur-box">
            <div className="title-wrap">
                <span>{title}</span>
            </div>
            <textarea
                value={value}
                onChange={onChange}
                id={`${id}`}
                maxLength={length}
                placeholder={placeHolder}
            ></textarea>
        </label>
    );
}

export function SubmitBtn() {
    return (
        <div>
            <button type="submit" className="submit-btn">
                <Image
                    src={"/icons/write.png"}
                    width={16}
                    height={16}
                    alt="글쓰기 아이콘"
                />
                <span>작성</span>
            </button>
        </div>
    );
}