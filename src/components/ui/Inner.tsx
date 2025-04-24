export default function Inner({ children, x = 'center', y = 'row'}) {
    return <div className={`inner ${x} ${y}`}>{children}</div>;
}