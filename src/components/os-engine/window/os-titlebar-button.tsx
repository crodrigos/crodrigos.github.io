export interface OSTitleBarButtonProps {
	type?: "close" | "minimize";
	onClick?: () => void;
}

export const OSTitleBarButton: React.FC<OSTitleBarButtonProps> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className="os-button shadow z-50 text-sm select-none hover:brightness-85 active:brightness-70"
		>
			X
		</button>
	);
};
