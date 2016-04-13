interface ReactLazyloadProps extends React.Props<ReactLazyloadClass> {

}
interface ReactLazyloadClass extends React.ComponentClass<ReactLazyloadProps> {
}

declare class ReactLazyload extends React.Component<ReactLazyloadProps, any> {

}

declare class __ReactLazyload {
    createLazyLoad(): ReactLazyload
}
declare module 'react-lazyload' {
    export = __ReactLazyload;
}