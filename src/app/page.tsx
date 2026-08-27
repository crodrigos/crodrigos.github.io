import { OSContainer } from "../components/os-engine/os-desktop-container";
import { OSManagerProvider } from "../components/os-engine/os-manager";

export default function Home() {
	return (
		<OSManagerProvider>
			<OSContainer/>
		</OSManagerProvider>
	);
}
