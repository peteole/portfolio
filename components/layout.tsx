
export const Row:React.FC<any>=(props)=>{
    return <div className="row">{props.children}</div>;
}

export const Col:React.FC<any>=(props)=>{
    return <div className="col">{props.children}</div>;
}

export const Container:React.FC<any>=(props)=>{
    return <div className="container">{props.children}</div>;
}

export const GridContainer:React.FC<any>=(props)=>{
    return <div className="grid-container">{props.children}</div>;
}

export const GridElement:React.FC<any>=(props)=>{
    return <div className="grid-element">{props.children}</div>;
}
export const Text:React.FC<any>=(props)=>{
    return <div className="text">{props.children}</div>;
}