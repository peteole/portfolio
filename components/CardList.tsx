import { Container, Row } from "@nextui-org/react"
import React from "react"

const CardList: React.FC<{ children: JSX.Element[] | undefined }> = (props) => {
    const [colCount, setColCount] = React.useState(1)
    const handleResize = () => setColCount(Math.min(Math.max(Math.floor(window.innerWidth / 600), 1), 3))
    React.useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    const cols = []
    for (let i = 0; i < colCount; i++) {
        cols.push(props.children?.filter((_, j) => j % colCount === i))
    }
    return <Container>
        <Row justify="center">
            {cols.map((col, i) => <div key={i}>{col}</div>)}
        </Row>
    </Container>
}
export default CardList