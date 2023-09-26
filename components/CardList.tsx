'use client';
import { Container, Grid, Row } from "@nextui-org/react"
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
            <Grid.Container gap={2} justify="center">
                {props.children?.map((child, index) =>
                    <Grid key={index} >
                        {child}
                    </Grid>
                )}
            </Grid.Container>
        </Container>
    )

}
export default CardList