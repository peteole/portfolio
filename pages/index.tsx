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
                    <Badge color="primary" >{v.startDate}-{v.endDate}</Badge>
                    <Text h3>{v.institution}</Text>
                  </Col>
                </Card.Header>
                <Card.Body>
                  <Text>Score: {v.score}</Text>
                  {v.courses&&<Text size="small"><Text h4>Courses</Text>{v.courses.map((c,i)=><Badge key={i}>{c}</Badge>)}</Text>}
                </Card.Body>
                {v.url && <Card.Footer><Link href={v.url}>Learn more</Link></Card.Footer>}
              </Card>
            </Grid>))}
        </Grid.Container>
      </Container>
    </div>
  )
}

export default Home
