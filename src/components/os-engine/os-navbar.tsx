import { TAppId } from "./apps/app";
import { useOSManagerContext } from "./os-manager";

export const OSNavbar: React.FC = () => {
	const osContext = useOSManagerContext();

	return (
		<div className="h-12 os-component z-50">
			{osContext?.apps.map((v) => (
				<div
					key={v.id}
					className={`text-black os-component os-button hover:brightness-90 active:brightness-80
                        flex items-center h-full min-w-32 w-fit px-1 
                        ${osContext.isAppOpen(v.id) ? "border-3" : "border-2"}`}
					onClick={() => osContext.openApp(v.id)}
				>
					{v.title}
				</div>
			))}
		</div>
	);
};

export default OSNavbar;
