import { render, screen } from "@testing-library/react";

// 간단한 컴포넌트 예제
function Greeting({ name, link }: { name: string, link?: string }) {
    return <h1>안녕하세요, {name}님!{link}</h1>;
}

describe("Greeting 컴포넌트", () => {
    test("이름과 함께 인사말을 렌더링해야 한다", () => {
        render(<Greeting name="홍길동" />);
        expect(screen.getByText("안녕하세요, 홍길동님!")).toBeInTheDocument();
    });
    
    test("이름과 링크와 함께 인사말을 렌더링해야 한다", () => {
        render(<Greeting name="홍길동" link="sexsex"/>);
        expect(screen.getByText("안녕하세요, 홍길동님!sexsex")).toBeInTheDocument();
    });
});

// 간단한 함수 테스트
function add(a: number, b: number): number {
    return a + b;
}

describe("add 함수", () => {
    test("두 숫자를 더해야 한다", () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });
});
