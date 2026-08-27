
export type ID = string

export type RegistryID = ID;
export interface App {
    registryId: RegistryID,
    title: string,
    component: React.ReactNode,

    icon?: ImageBitmap, // #FIXME: 
    openByDefault?: boolean,
    
}

export type RunningID = ID;
export interface RunningApp {
    runningId: RunningID,
    app: App,
}