import Logger from "@crodrigos/logger-ts";
import App from "./app";
import ExampleApp from "./example-app";
import { CubeApp } from "./the-cube/the-cube";

const appRegistry: App[] = [
    ExampleApp,
    CubeApp
];

export default appRegistry;