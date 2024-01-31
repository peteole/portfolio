import { Badge, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ResumeSchema } from "../util/resume"
import resume from "../util/resume.json"
import { Col, Container, Row, Text, GridContainer, GridElement } from "../components/layout"

export const getStaticProps: GetStaticProps<{ jsonResume: ResumeSchema }> = () => {
    return {
        props: {
            jsonResume: resume
        }
    }
}


const Skills: NextPage<{ jsonResume: ResumeSchema }> = ({ jsonResume }) => {

    return (
        <Container css={{ textAlign: "center" }}>
            <Head>
                <title>{jsonResume.basics?.name} - Skills</title>
            </Head>
            <GridContainer gap={2} justify="center">
                {jsonResume.skills?.map((v, i) => (
                    <GridElement key={"s" + i} >
                        <Card isHoverable className='cv-card'>
                            <CardBody style={{ textAlign: "center" }}>
                                <Row>
                                    <Badge color="primary">{v.level}</Badge>
                                    {v.keywords?.map((k, i) => <Badge color="primary" key={i}>{k}</Badge>)}
                                </Row>
                                <Text h3>{v.name}</Text>
                            </CardBody>
                        </Card>
                    </GridElement>))}

                {jsonResume.languages?.map((v, i) => (
                    <GridContainer key={"l" + i}>
                        <Card isHoverable className='cv-card'>
                            <CardBody style={{ textAlign: "center" }}>
                                <Badge color="primary">{v.fluency}</Badge>
                                <Text h3>{v.language}</Text>
                            </CardBody>
                        </Card>
                    </GridContainer>))}
            </GridContainer>
            <GridContainer gap={2} justify="center">
                {jsonResume.certificates?.map((v, i) => (
                    <GridElement key={"c" + i}>
                        <Card isHoverable>
                            <CardHeader>
                                <Col>
                                    <Row align='center'>
                                        <Badge color="primary" >{v.date}</Badge>
                                        <Badge color="primary" >{v.issuer}</Badge>
                                    </Row>
                                    <Text h3>{v.name}</Text>
                                </Col>
                            </CardHeader>
                            <CardBody style={{ textAlign: "center" }}>
                                <Text>{v.issuer}</Text>
                            </CardBody>
                            {v.url && <CardFooter><Link href={v.url}>Learn more</Link></CardFooter>}
                        </Card>
                    </GridElement>))}
            </GridContainer>

        </Container>
    )
}
export default Skills