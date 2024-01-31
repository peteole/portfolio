
import { NextPage } from "next"
import { Col, Container, Row, Text } from "../components/layout"

const CV: NextPage = () => {
    return <Container className="cv-body">
        <Col><Text>
            <a href="/resume.pdf">Download PDF</a>
        </Text>
            <iframe width="100%" height="2000px" src='/resume.pdf' />
        </Col>
    </Container>

}
export default CV