

export type TAppId = string;
export interface App {
    id: TAppId,
    title: string,
    component: React.ReactNode,

    icon?: ImageBitmap,
    active?: boolean,
    openByDefault?: boolean
}

export default App;