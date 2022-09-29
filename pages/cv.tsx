import { Col, Container, Text } from "@nextui-org/react"
import { NextPage } from "next"

const CV: NextPage = () => {
    return <Container className="cv-body">
        <Col><Text>
            <a href="/resume.pdf">Download PDF</a>
        </Text>
            <iframe width="100%" height="1000px" src='/resume.pdf' />
        </Col>
    </Container>

}
export default CV