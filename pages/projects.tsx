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
const Projects: NextPage<{ jsonResume: ResumeSchema }> = ({ jsonResume }) => {

  return (
    <Container css={{ textAlign: "center" }}>
      <Head>
        <title>{jsonResume.basics?.name} - Projects</title>
      </Head>
      <Grid.Container gap={2} justify="center">
        {jsonResume.projects?.map((v, i) => (
          <Grid key={i}>
            <Card isHoverable css={{ width: "400px" }}>
              <Card.Header>
                <Col>
                  <Row>
                    <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                    {v.entity && <Badge color="primary">{v.entity}</Badge>}
                    {v.roles?.map((r, i) => <Badge key={i} color="primary">{r}</Badge>)}
                  </Row>
                  <Text h3>{v.name}</Text>
                </Col>
              </Card.Header>
              <Card.Body>
                <Text>{v.description}</Text>
                {v.highlights && <Container >
                  <Text h4>Highlights</Text>
                  {v.highlights.map((c, i) => <Text key={i}>- {c}</Text>)}
                </Container>}
                {v.keywords && <Container ><Text h4>Technologies</Text>{v.keywords.map((c, i) => <Badge key={i}>{c}</Badge>)}</Container>}
              </Card.Body>
              {v.url && <Card.Footer><Link href={v.url}>Learn more</Link></Card.Footer>}
            </Card>
          </Grid>))}
      </Grid.Container>
      {jsonResume.publications && <Grid.Container gap={2}>
        <Text h2>Publications</Text>
        {jsonResume.publications.map((v, i) => (
          <Grid key={i}>
            <Card isHoverable css={{ width: "400px" }}>
              <Card.Header>
                <Col>
                  <Row>
                    <Badge color="primary" >{v.releaseDate}</Badge>
                    <Badge color="primary" >{v.publisher}</Badge>
                  </Row>
                  <Text h3>{v.name}</Text>
                </Col>
              </Card.Header>
              <Card.Body>
                <Text>{v.summary}</Text>
                {v.url && <Link href={v.url}>Learn more</Link>}
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>}
    </Container>
  )
}

export default Projects