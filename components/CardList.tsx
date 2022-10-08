import { Container, Row } from "@nextui-org/react"
import React, { useEffect } from "react"

const CardList: React.FC<{ children: JSX.Element[] | undefined }> = (props) => {
    const [isChromium, setIsChromium] = React.useState(true)
    useEffect(() => {
        if (!("chrome" in window)) {
            setIsChromium(false)
        }
    }, [])
    return (
        <div className="card-container-columns">
            <div style={isChromium ? undefined : { display: "unset" }}>
                {props.children?.map((child, index) =>
                    <div key={index} className="card-container">
                        {child}
                    </div>)}
            </div>

        </div>
    )

}
export default CardList