"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { App, TAppId } from "./apps/app";
import Logger from "@crodrigos/logger-ts";
import appRegistry from "./apps/app-registry";

export interface OSManagerContextProps {
	apps: App[];
	activeApps: App[];
	openApp: (id: TAppId) => void;
	closeApp: (id: TAppId) => void;
    isAppOpen: (id:TAppId) => boolean;
}

export const OSManagerContext = createContext<
	OSManagerContextProps | undefined
>(undefined);

export const OSManagerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Registry of apps
	const [apps, setApps] = useState<App[]>(appRegistry);
	const [activeApps, setActiveApps] = useState<App[]>([]);

	/**
	 *
	 * @param id
	 */
	const openApp = (id: TAppId) => {

		// Check if app with id exits
        if (isAppOpen(id)) {
            Logger.Error(`App ${id} is already open`)
            return;
        };

		apps.forEach((v) => {
			if (v.id === id) {
                setActiveApps(activeApps.concat(v));
                console.log(activeApps);
                
                //v.active = true;
            }
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

    function openByDefault() {
        Logger.Log("Openning apps on startup")
        apps.forEach(v => {
            if (v.openByDefault) {
                Logger.Log(`\t${v.id}`)
                openApp(v.id)
            }
        })
    }

    function logAvailableApps() {
        Logger.Log(`Available apps: ${apps.length}`)
        apps.forEach(v => Logger.Log(v.title))
    }

    const isAppOpen = (id: TAppId) => {
        activeApps.forEach((v) => {
            if (id===v.id) return true
        })
        return false
    }

    useEffect(() => {
        logAvailableApps();
        openByDefault();
    }, [])

	let ctx: OSManagerContextProps = {
		apps: apps,
		activeApps: activeApps,
		openApp: openApp,
		closeApp: closeApp,
        isAppOpen: isAppOpen
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
