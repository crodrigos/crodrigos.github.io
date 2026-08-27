
import { randomUUID } from 'node:crypto'
import { v4 } from "uuid";
import {App} from './app'
import Logger from '@crodrigos/logger-ts';
//import { addAppToRegistry } from './app-registry';

export const ExampleAppComponent : React.FC = () => {
    return <div className='sm:px-10'>
        <h1 className='text-2xl mt-3'>Title 1</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis obcaecati ducimus, illo impedit placeat suscipit libero ad eaque numquam culpa architecto error et dolorem vero harum voluptatem quisquam. Laudantium, ipsa!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ea consequuntur, iusto obcaecati optio numquam dolorem perferendis debitis sed veniam ad tempore magni eligendi impedit ducimus saepe corrupti pariatur eum.</p>
        <h1 className='text-2xl mt-3'>Title 2</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, nihil vitae veniam at, ex minus nostrum accusantium soluta fuga inventore cumque recusandae similique repellat ad maxime, reiciendis sed! Eum, non!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde temporibus repellat, incidunt dignissimos ex eum est, ipsa nemo perferendis vel rem tenetur minima minus, reprehenderit libero veniam dolorem aspernatur neque?</p>
        <h1 className='text-2xl mt-3'>Title 3</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A laborum, deserunt voluptate possimus tenetur aspernatur atque quod corporis adipisci sit accusamus, minus, impedit enim quia amet laudantium nesciunt fugiat voluptates.</p>
    </div>
}

export const ExampleApp: App = {
    registryId: v4(),
    title: "Example App",
    component: <ExampleAppComponent />,
}

export default ExampleApp;