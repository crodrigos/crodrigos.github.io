"use client";

import React from "react";
import { OSNavbar } from "./os-navbar";

import "./styles.css";
import Draggable from "react-draggable";
import { OSWindow } from "./os-window";

export const OSContainer: React.FC = () => {
	return (
		<div className="bg-[#008080] h-lvh flex flex-col">
			<div className="flex-1">
				<OSWindow title="Test Window">
					<textarea name="" id=""></textarea>
				</OSWindow>
			</div>
			<OSNavbar></OSNavbar>
		</div>
	);
};
