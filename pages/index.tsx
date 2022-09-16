import { Badge, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ResumeSchema } from "../util/jsonresume"
import resume from "../util/resume.json"

export const getStaticProps: GetStaticProps<{ jsonResume: ResumeSchema }> = () => {
  return {
    props: {
      jsonResume: resume
    }
  }
}

const Home: NextPage<{ jsonResume: ResumeSchema }> = ({ jsonResume }) => {

  return (
    <div >
      <Container>
        <h1>Hi, I am {jsonResume.basics?.name}</h1>
        <Text>{jsonResume.basics?.summary}</Text>

        <Text h2>Education</Text>
        <Grid.Container gap={2} justify="center">
          {jsonResume.education?.map((v, i) => (
            <Grid key={i}>
              <Card isHoverable css={{ width: "400px" }}>
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
                <Card isHoverable css={{ width: "400px" }}>
                  <Card.Header>
                    <Col>
                      <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                      <Text h3>{v.name}</Text>
                      <Badge>{v.position}</Badge>
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

      </Container>
    </div>
  )
}

export default Home
