import { Col, Container, Text } from "@nextui-org/react"
import { NextPage } from "next"
import Link from "next/link"

const CV: NextPage = () => {
    return <Container>
        <Col><Text>
            <a href="/resume.pdf">Download PDF</a>
        </Text>
            <iframe width="100%" height="600px" src='/resume.pdf' />
        </Col>
    </Container>

}
export default CV