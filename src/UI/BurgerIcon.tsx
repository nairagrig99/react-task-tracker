// BurgerIcon.tsx
import React from "react";

type Props = {
    width?: number;
    height?: number;
    color?: string;
    handleMenu:()=> void
};

const BurgerIcon: React.FC<Props> = ({ width = 24, height = 24, color = "#000" ,handleMenu }) => (
    <svg
        onClick={handleMenu}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

export default BurgerIcon;
