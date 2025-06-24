import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import Category from "@/components/ui/Category";

function TestCategory() {
    const [category, setCategory] = useState(true);

    const clickLeft = () => setCategory(true);
    const clickRight = () => setCategory(false);

    return (
        <Category
            category={category}
            clickLeft={clickLeft}
            clickRight={clickRight}
            leftText="최신순"
            rightText="인기순"
        />
    );
}

describe("Category 컴포넌트", () => {
    it("leftText, rightText 클릭에 따라 selected 클래스가 변경되어야 함", () => {
        render(<TestCategory />);

        const left = screen.getByText("최신순");
        const right = screen.getByText("인기순");

        // 초기 상태
        // category = true
        // 최신순에 selected
        expect(left).toHaveClass("selected");
        expect(right).not.toHaveClass("selected");

        // right 클릭 후
        // category = false
        // 인기순에 selected
        fireEvent.click(right);
        expect(left).not.toHaveClass("selected");
        expect(right).toHaveClass("selected");

        // 다시 left 클릭 후
        // category = true
        // 최신순에 selected
        fireEvent.click(left);
        expect(left).toHaveClass("selected");
        expect(right).not.toHaveClass("selected");
    });
});