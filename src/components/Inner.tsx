export default function Inner({ children, direction = 'center'}) {
    return <div className={`inner ${direction}`}>{children}</div>;
}