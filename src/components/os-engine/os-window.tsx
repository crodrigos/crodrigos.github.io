import { useEffect, useRef, useState } from "react";

interface OSWindowsProps {
	children: React.ReactNode;
}

export const OSWindow: React.FC<OSWindowsProps> = (props) => {
	const position = useRef({ x: 12, y: 12 });
	const navRef = useRef<HTMLElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleMouseDrag = (e: React.MouseEvent<HTMLElement>) => {
		if (!isDragging) return;

        position.current.x += e.movementX;
		position.current.y += e.movementY;

		if (navRef.current?.parentElement) {
			navRef.current.parentElement.style.left = `${position.current.x}px`;
			navRef.current.parentElement.style.top = `${position.current.y}px`;
		}
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		setIsDragging(true);
        console.log(isDragging);
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
		setIsDragging(false);
        console.log(isDragging);
	};

	return (
		<div
			className="absolute min-w-2xs min-h-40 w-lg oscomp"
			style={{ left: position.current.x, top: position.current.y }}
		>
			<nav
				ref={navRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseDrag}
				className="bg-[#000082] h-8 select-none"
			>
                {isDragging?<p>BOMBOCLAT</p>:<></>}
            </nav>
			{props.children}
		</div>
	);
};
