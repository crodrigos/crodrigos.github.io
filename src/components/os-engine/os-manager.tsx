"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
	App,
	RegistryID,
	RunningApp,
	RegistryID as RunningID,
} from "./apps/app";
import Logger from "@crodrigos/logger-ts";
import appRegistry from "./apps/app-registry";

export interface OSManagerContextProps {
	apps: App[];
	activeApps: RunningApp[];
	openApp: (id: RunningID) => void;
	closeApp: (id: RunningID) => void;
	isAppOpen: (id: RunningID) => boolean;
}

export const OSManagerContext = createContext<
	OSManagerContextProps | undefined
>(undefined);

export const OSManagerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Registry of apps
	const [apps, setApps] = useState<App[]>(appRegistry);
	const [activeApps, setActiveApps] = useState<RunningApp[]>([]);

	/**
	 *
	 * @param registryId
	 */
	const openApp = (registryId: RegistryID) => {
		// Check if app with id exits
		if (isAppOpen(registryId)) {
			Logger.Warn(`App ${registryId} is already open`);
			//return;
		}

		apps.forEach((app) => {
			if (app.registryId === registryId) {
				let newApp = {
					app: app,
					runningId: crypto.randomUUID(),
				};
				setActiveApps((prev) => prev.concat(newApp));
				console.log(newApp);
				Logger.Success(`Open ${app.title}`);
			}
		});
	};

	/**
	 *
	 * @param id
	 */
	const closeApp = (id: RunningID) => {
		if (!activeApps.some((app) => app.runningId === id)) {
			Logger.Warn(`App with id ${id} does not exist`);
			return;
		}

		setActiveApps(activeApps.filter((app) => app.runningId !== id));

		Logger.Success(`Closing ${id}`);
	};

	function openByDefault() {
		Logger.Log("Openning apps on startup");
		apps.forEach((v) => {
			if (v.openByDefault) {
				Logger.Log(`\t${v.registryId}`);
				openApp(v.registryId);
			}
		});
	}

	function logAvailableApps() {
		Logger.Log(`Available apps: ${apps.length}`);
		apps.forEach((v) => Logger.Log(v.title));
	}

	const isAppOpen = (id: RegistryID) => {
		return activeApps.some((app) => app.app.registryId === id);
	};

	useEffect(() => {
		logAvailableApps();
		openByDefault();
	}, []);

	let ctx: OSManagerContextProps = {
		apps: apps,
		activeApps: activeApps,
		openApp: openApp,
		closeApp: closeApp,
		isAppOpen: isAppOpen,
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
