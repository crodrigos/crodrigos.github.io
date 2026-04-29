

export type TAppId = string;
export interface App {
    id: TAppId,
    icon?: ImageBitmap,
    title: string,
    component: React.ReactNode
}

export default App;