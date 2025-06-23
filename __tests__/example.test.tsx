import { render, screen } from "@testing-library/react";

// 간단한 컴포넌트 예제
function Greeting({ name }: { name: string }) {
    return <h1>안녕하세요, {name}님!</h1>;
}

describe("Greeting 컴포넌트", () => {
    it("이름과 함께 인사말을 렌더링해야 한다", () => {
        render(<Greeting name="홍길동" />);

        expect(screen.getByText("안녕하세요, 홍길동님!")).toBeInTheDocument();
    });

    it("다른 이름으로도 렌더링되어야 한다", () => {
        render(<Greeting name="김철수" />);

        expect(screen.getByText("안녕하세요, 김철수님!")).toBeInTheDocument();
    });
});

// 간단한 함수 테스트
function add(a: number, b: number): number {
    return a + b;
}

describe("add 함수", () => {
    it("두 숫자를 더해야 한다", () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });
});
