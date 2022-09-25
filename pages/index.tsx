import { Badge, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import resume, { ResumeSchema } from "../util/resume"

export const getStaticProps: GetStaticProps<{ jsonResume: ResumeSchema }> = () => {
  return {
    props: {
      jsonResume: resume
    }
  }
}

const Home: NextPage<{ jsonResume: ResumeSchema }> = ({ jsonResume }) => {

  return (
    <Container css={{ textAlign: "center" }}>
      <Head>
        <title>{jsonResume.basics?.name}</title>
      </Head>
      {jsonResume.basics && <>
        <h1>Hi, I am {jsonResume.basics?.name}</h1>
        {jsonResume.basics.summary && <Text>{jsonResume.basics?.summary}</Text>}
      </>}

      <Text h2>Education</Text>
      <Grid.Container gap={2} justify="center">
        {jsonResume.education?.map((v, i) => (
          <Grid key={i}>
            <Card isHoverable className='cv-card'>
              <Card.Header>
                <Col>
                  <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                  <Text h3>{v.institution}</Text>
                </Col>
              </Card.Header>
              <Card.Body>
                <Text>Score: {v.score}</Text>
                {v.courses && <Container ><Text h4>Courses</Text>{v.courses.map((c, i) => <Badge key={i}>{c}</Badge>)}</Container>}
              </Card.Body>
              {v.url && <Card.Footer><Link href={v.url}>Learn more</Link></Card.Footer>}
            </Card>
          </Grid>))}
      </Grid.Container>

      {jsonResume.work && <>
        <Text h2>Experience</Text>
        <Grid.Container gap={2} justify="center">
          {jsonResume.work.map((v, i) => <>
            <Grid key={i}>
              <Card isHoverable className='cv-card'>
                <Card.Header>
                  <Col>
                    <Row>
                      <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                      <Badge color="primary">{v.position}</Badge></Row>
                    <Text h3>{v.name}</Text>
                  </Col>
                </Card.Header>
                <Card.Body>
                  <Text>{v.summary}</Text>
                  <Text>{v.description}</Text>
                  {v.highlights && <Container >
                    <Text h4>Highlights</Text>
                    {v.highlights.map((c, i) => <Text key={i}>- {c}</Text>)}
                  </Container>}
                </Card.Body>
                {v.url && <Card.Footer><Link href={v.url}>Learn more</Link></Card.Footer>}
              </Card>
            </Grid>
          </>)}
        </Grid.Container>
      </>}
      {jsonResume.volunteer && <>
        <Text h2>Volunteering</Text>
        <Grid.Container gap={2} justify="center">
          {jsonResume.volunteer.map((v, i) => <>
            <Grid key={i}>
              <Card isHoverable className='cv-card'>
                <Card.Header>
                  <Col>
                    <Row>
                      <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                      <Badge color="primary">{v.position}</Badge></Row>
                    <Text h3>{v.organization}</Text>
                  </Col>
                </Card.Header>
                <Card.Body>
                  <Text>{v.summary}</Text>
                  {v.highlights && <Container >
                    <Text h4>Highlights</Text>
                    {v.highlights.map((c, i) => <Text key={i}>- {c}</Text>)}
                  </Container>}
                </Card.Body>
                {v.url && <Card.Footer><Link href={v.url}>Learn more</Link></Card.Footer>}
              </Card>
            </Grid>
          </>)}
        </Grid.Container>
      </>}
      {jsonResume.awards && <>
        <Text h2>Awards</Text>
        <Grid.Container gap={2} justify="center">
          {jsonResume.awards.map((v, i) => <>
            <Grid key={i}>
              <Card isHoverable className='cv-card'>
                <Card.Header>
                  <Col>
                    <Row>
                      <Badge color="primary" >{v.date}</Badge>
                      <Badge color="primary">{v.awarder}</Badge>
                    </Row>
                    <Text h3>{v.title}</Text>
                  </Col>
                </Card.Header>
                <Card.Body>
                  <Text>{v.summary}</Text>
                </Card.Body>
                {typeof v['url'] == "string" && <Card.Footer><Link href={v['url']}>Learn more</Link></Card.Footer>}
              </Card>
            </Grid>
          </>)}
        </Grid.Container>
      </>}

    </Container>
  )
}

export default Home
