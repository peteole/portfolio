import { Badge, Card, Col, Container, Row, Text } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import CardList from '../components/CardList'
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
    <Container className="cv-body">
      <Head>
        <title>{jsonResume.basics?.name}</title>
      </Head>
      {jsonResume.basics && <>
        <h1>Hi, I am {jsonResume.basics?.name}</h1>
        {jsonResume.basics.summary && <Text>{jsonResume.basics?.summary}</Text>}
      </>}

      <Text h2>Education</Text>
      <CardList>
        {jsonResume.education?.map((v, i) => (
          <Card key={i} isHoverable className='cv-card'>
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
          </Card>))}
      </CardList>

      {jsonResume.work && <>
        <Text h2>Experience</Text>
        <CardList>
          {jsonResume.work.map((v, i) => <>
            <Card key={i} isHoverable className='cv-card'>
              <Card.Header>
                <Col>
                  <Row>
                    <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                    <Badge color="primary">{v.position}</Badge>
                  </Row>
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
          </>)}
        </CardList>
      </>}
      {jsonResume.volunteer && <>
        <Text h2>Volunteering</Text>
        <CardList>
          {jsonResume.volunteer.map((v, i) => <>
            <Card key={i} isHoverable className='cv-card'>
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
          </>)}
        </CardList>
      </>}
      {jsonResume.awards && <>
        <Text h2>Awards</Text>
        <CardList >
          {jsonResume.awards.map((v, i) => <>
            <Card key={i} isHoverable className='cv-card'>
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
          </>)}
        </CardList>
      </>}

    </Container>
  )
}

export default Home
