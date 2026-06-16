

export type AppIdType = string;
export interface App {
    id: AppIdType,
    title: string,
    component: React.ReactNode,

    icon?: ImageBitmap, // #FIXME: 
    openByDefault?: boolean
}

export default App;