
import { randomUUID } from 'node:crypto'
import { v4 } from "uuid";
import App from './app'
import Logger from '@crodrigos/logger-ts';

export const ExampleAppComponent : React.FC = () => {
    return <div>
        Hallo!!!
    </div>
}

export const ExampleApp: App = {
    id: v4(),
    title: "Example App",
    component: <ExampleAppComponent />,
}

Logger.Log(`${ExampleApp.title} ${ExampleApp.id}`);


export default ExampleApp;