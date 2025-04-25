import Image from "next/image";

export function InputLabel({ id, title, value, onChange, placeHolder, length, type }) {
    return (
        <label htmlFor={`${id}`} className="blur-box">
            <span>{title}</span>
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

export function TextAreaLabel({ id, title, value, onChange, placeHolder, length }) {
    return (
        <label htmlFor={`${id}`} className="blur-box">
            <span>{title}</span>
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