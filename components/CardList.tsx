import { Container, GridContainer, Row } from "./layout"
import React, { useEffect } from "react"

const CardList: React.FC<{ children: JSX.Element[] | undefined }> = (props) => {
    const [isChromium, setIsChromium] = React.useState(true)
    useEffect(() => {
        if (!("chrome" in window)) {
            setIsChromium(false)
        }
    }, [])
    if (isChromium) {
        return (
            <div className="card-container-columns">
                <div>
                    {props.children?.map((child, index) =>
                        <div key={index} className="card-container">
                            {child}
                        </div>)}
                </div>

            </div>
        )
    }
    // fallback to grid
    return (
        <Container css={{ maxW: "1200px" }}>
            <GridContainer gap={2} justify="center">
                {props.children?.map((child, index) =>
                    <div key={index} >
                        {child}
                    </div>
                )}
            </GridContainer>
        </Container>
    )

}
export default CardList