import { Container, Row } from "@nextui-org/react"
import React from "react"

const CardList: React.FC<{ children: JSX.Element[] | undefined }> = (props) => {

    const versions = []
    for (const colCount of [1, 2, 3]) {
        const cols = []
        for (let i = 0; i < colCount; i++) {
            cols.push(props.children?.filter((_, j) => j % colCount === i))
        }
        versions.push(cols)
    }
    return <>
        {versions.map((cols, v) => <Row key={v} justify="center" className={"card-container card-container-" + v}>
            {cols.map((col, i) => <div className="card-container-col" key={i}>{col}</div>)}
        </Row>
        )}
    </>
}
export default CardList