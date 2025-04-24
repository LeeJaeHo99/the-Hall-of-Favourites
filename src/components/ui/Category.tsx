export default function Category({ category, clickLeft, clickRight, leftText, rightText }) {
    return (
        <div className="category-wrap">
            <p className={`${category && "selected"}`} onClick={clickLeft}>
                {leftText}
            </p>
            <p className={`${category || "selected"}`} onClick={clickRight}>
                {rightText}
            </p>
        </div>
    );
}