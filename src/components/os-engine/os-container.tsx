"use client";

import React from "react";
import { OSNavbar } from "./os-navbar";
import { OSWindow } from "./os-window";
import { useOSManagerContext } from "./os-manager";
import ExampleApp from "./apps/example-app";

import "./styles.css";

export const OSContainer: React.FC = () => {

	const osContext = useOSManagerContext();

	return (
		<div className="bg-[#008080] h-lvh flex flex-col">
			<div className="flex-1">
				<OSWindow app={ExampleApp} />

				{osContext?.activeApps.map((app) => {
					return <OSWindow key={app.id} app={app} />;
				})}
			</div>
			<OSNavbar />
		</div>
	);
};
