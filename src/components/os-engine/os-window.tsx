import { useEffect, useRef, useState } from "react";
import { OSTitleBarButton } from "./os-titlebar-button";

interface OSWindowsProps {
	children: React.ReactNode;
    title?: string
}

export const OSWindow: React.FC<OSWindowsProps> = (props) => {
	const windowRef = useRef<HTMLDivElement>(null);

	const [isDragging, setIsDragging] = useState(false);

	const frameId = useRef(0);

	const lastRef = useRef({ x: 0, y: 0 });
	const dragRef = useRef({ x: 0, y: 0 });

	const handleMouseDrag = (e: MouseEvent) => {
		if (!isDragging) return;

		const delta = {
			x: lastRef.current.x - e.pageX,
			y: lastRef.current.y - e.pageY,
		};

		lastRef.current = {
			x: e.pageX,
			y: e.pageY,
		};

		dragRef.current.x -= delta.x;
		dragRef.current.y -= delta.y;

		cancelAnimationFrame(frameId.current);
		frameId.current = requestAnimationFrame(() => {
			windowRef.current!.style.transform = `translate3d(${dragRef.current.x}px, ${dragRef.current.y}px, 0)`;
		});
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		setIsDragging(true);
		lastRef.current = {
			x: e.pageX,
			y: e.pageY,
		};
	};

	const handleMouseUp = (e: MouseEvent) => {
		setIsDragging(false);
	};

	useEffect(() => {
		document.addEventListener("mousemove", handleMouseDrag);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseDrag);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging]);

	return (
		<div
			ref={windowRef}
			className="absolute min-w-2xs min-h-40 w-lg oscomp flex flex-col"
		>
			<nav
				onMouseDown={handleMouseDown}
				className="bg-[#000082] h-7 select-none mb-0.5 flex flex-column items-center justify-around"
			>
				<div className="flex-1/2 flex items-center justify-start pl-1">
                    {props.title?props.title:" "}
                </div>
				<div className="flex-1/2 flex items-center justify-end pr-1">
                    <OSTitleBarButton/>
                </div>
			</nav>
			<div className="flex-1 bg-white text-black">
                {props.children}
            </div>
		</div>
	);
};
