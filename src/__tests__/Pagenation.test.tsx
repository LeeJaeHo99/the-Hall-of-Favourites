import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Pagination from "@/components/board/Pagination";

function TestPagination() {
    const [pagination, setPagination] = useState(0);

    // const plusPagination = () => {
    //     if (pagination + 1 === 10) return;
    //     setPagination(pagination + 1);
    // };
    // const minusPagination = () => {
    //     if (pagination === 0) return;
    //     setPagination(pagination - 1);
    // };

    return (
        <Pagination
            data={[]}
            pagination={pagination}
            setPagination={setPagination}
        />
    );
}

describe("Pagination 컴포넌트", () => {
    it("pagination 버튼이 정상적으로 작동한다.", () => {
        render(<TestPagination />);

        const plusButton = screen.getByRole("button", { name: "+" });
        const minusButton = screen.getByRole("button", { name: "-" });

        userEvent.click(plusButton);
        expect(screen.getByText("1")).toBeInTheDocument();

        userEvent.click(minusButton);
        expect(screen.getByText("0")).toBeInTheDocument();
    });
});