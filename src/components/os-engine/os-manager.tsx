"use client";

import { createContext, useContext, useRef, useState } from "react";
import { App, TAppId } from "./apps/app";
import Logger from "@crodrigos/logger-ts";

export interface OSManagerContextProps {
	apps: App[];
	activeApps: App[];
	openApp: (id: TAppId) => void;
	closeApp: (id: TAppId) => void;
}

export const OSManagerContext = createContext<
	OSManagerContextProps | undefined
>(undefined);

export const OSManagerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Registry of apps
	const [apps, setApps] = useState<App[]>([]);
	const [activeApps, setActiveApps] = useState<App[]>([]);

	/**
	 *
	 * @param id
	 */
	const openApp = (id: TAppId) => {
		// Check if app with id exits
		apps.forEach((v) => {
			if (v.id === id) setActiveApps(activeApps.concat(v));
		});
		Logger.Success(`Open ${id}`);
	};

	/**
	 *
	 * @param id
	 */
	const closeApp = (id: TAppId) => {

        if (!activeApps.some(app => app.id === id)) {
            Logger.Error(`App with id ${id} does not exist`)
        }   

		setActiveApps(activeApps.filter((app) => app.id !== id));
        Logger.Success(`Closing ${id}`)
    };

	let ctx: OSManagerContextProps = {
		apps: apps,
		activeApps: activeApps,
		openApp: openApp,
		closeApp: closeApp,
	};

	return <OSManagerContext value={ctx}>{children}</OSManagerContext>;
};

export const useOSManagerContext = () => {
	const context = useContext(OSManagerContext);
	if (!context) {
		Logger.Error("Could not initialize OS Context");
	}
	return context;
};
