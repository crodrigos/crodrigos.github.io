import { useEffect, useRef, useState } from "react";
import { OSTitleBarButton } from "./os-titlebar-button";
import {RunningApp} from "../apps/app";
import { useOSManagerContext } from "../os-manager";

interface OSWindowsProps {
	app?: RunningApp;
	active?: boolean;
	onFocus?: () => void;
    size?: {
        width: number, height: number
    }
}

export const OSWindow: React.FC<OSWindowsProps> = (props) => {
    
	const osContext = useOSManagerContext();

	const windowRef = useRef<HTMLDivElement>(null);

	const [isDragging, setIsDragging] = useState(false);

	const dragFrameId = useRef(0);
	const lastDragRef = useRef({ x: 0, y: 0 });
	const currentDragRef = useRef({ x: 0, y: 0 });

    const app = useRef(props.app?.app)

	const handleMouseDrag = (e: MouseEvent) => {
		if (!isDragging) return;

		const delta = {
			x: lastDragRef.current.x - e.pageX,
			y: lastDragRef.current.y - e.pageY,
		};

		lastDragRef.current = {
			x: e.pageX,
			y: e.pageY,
		};

		currentDragRef.current.x -= delta.x;
		currentDragRef.current.y -= delta.y;

		cancelAnimationFrame(dragFrameId.current);
		dragFrameId.current = requestAnimationFrame(() => {
			windowRef.current!.style.transform = `translate3d(${currentDragRef.current.x}px, ${currentDragRef.current.y}px, 0)`;
		});
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		setIsDragging(true);
		lastDragRef.current = {
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
			onFocus={props.onFocus}
			className='os-component absolute min-w-2xs min-h-40 flex flex-col resize overflow-scroll'
		>
			<nav
				onMouseDown={handleMouseDown}
				className={`${props.active ? "bg-[#000082]" : "bg-[#969696]"} h-7 select-none mb-0.5 flex flex-column items-center justify-around`}
			>
				<div className="flex-1/2 flex items-center justify-start pl-1">
					{props.app ? props.app?.app.title : " "}
				</div>
				<div className="flex-1/2 flex items-center justify-end pr-1">
					<OSTitleBarButton
						onClick={
							props.app?.runningId
								? () => osContext?.closeApp(props.app!.runningId)
								: undefined
						}
					/>
				</div>
			</nav>
			<div className="flex-1 bg-white text-black ">
				{props.app?.app.component}
			</div>
		</div>
	);
};
