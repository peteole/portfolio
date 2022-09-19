import { Badge, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ResumeSchema } from "../util/jsonresume"
import resume from "../util/resume.json"

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
            <Grid.Container gap={2} justify="center">
                {jsonResume.skills?.map((v, i) => (
                    <Grid key={"s" + i}>
                        <Card isHoverable>
                            <Card.Body css={{ textAlign: "center" }}>
                                <Badge color="primary">{v.level}</Badge>
                                <Text h3>{v.name}</Text>
                            </Card.Body>
                        </Card>
                    </Grid>))}

                {jsonResume.languages?.map((v, i) => (
                    <Grid key={"l" + i}>
                        <Card isHoverable>
                            <Card.Body css={{ textAlign: "center" }}>
                                <Badge color="primary">{v.fluency}</Badge>
                                <Text h3>{v.language}</Text>
                            </Card.Body>
                        </Card>
                    </Grid>))}
            </Grid.Container>


        </Container>
    )
}
export default Skills