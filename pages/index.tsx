import { Badge, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
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
    <div className="cv-body">
      <Head>
        <title>{jsonResume.basics?.name}</title>
      </Head>
      {jsonResume.basics && <>
        <h1>Hi, I am {jsonResume.basics?.name}</h1>
        {jsonResume.basics.summary && <p>{jsonResume.basics?.summary}</p>}
      </>}

      <h2>Education</h2>
      <CardList>
        {jsonResume.education?.map((v, i) => (
          <Card key={i} isHoverable className='cv-card'>
            <CardHeader>
              <div>
                <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                <h3>{v.institution}</h3>
                <h3>{v.area} ({v.studyType})</h3>
              </div>
            </CardHeader>
            <CardBody>
              {v.score && <p>Score: {v.score}</p>}
              {v.courses && <div ><p>Courses</p>{v.courses.map((c, i) => <Badge key={i}>{c}</Badge>)}</div>}
            </CardBody>
            {v.url && <CardFooter><Link href={v.url}>Learn more</Link></CardFooter>}
          </Card>))}
      </CardList>

      {jsonResume.work && <>
        <h2>Experience</h2>
        <CardList>
          {jsonResume.work.map((v, i) => <>
            <Card key={i} isHoverable className='cv-card'>
              <CardHeader>
                <div>
                  <div className="row">
                    <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                    <Badge color="primary">{v.position}</Badge>
                  </div>
                  <h3>{v.name}</h3>
                </div>
              </CardHeader>
              <CardBody>
                <p>{v.summary}</p>
                <p>{v.description}</p>
                {v.highlights && <div >
                  <p>Highlights</p>
                  {v.highlights.map((c, i) => <p key={i}>- {c}</p>)}
                </div>}
              </CardBody>
              {v.url && <CardFooter><Link href={v.url}>Learn more</Link></CardFooter>}
            </Card>
          </>)}
        </CardList>
      </>}
      {jsonResume.volunteer && <>
        <h2>Volunteering</h2>
        <CardList>
          {jsonResume.volunteer.map((v, i) => <>
            <Card key={i} isHoverable className='cv-card'>
              <CardHeader>
                <div>
                  <div className="row">
                    <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                    <Badge color="primary">{v.position}</Badge></div>
                  <h3>{v.organization}</h3>
                </div>
              </CardHeader>
              <CardBody>
                <p>{v.summary}</p>
                {v.highlights && <div >
                  <p>Highlights</p>
                  {v.highlights.map((c, i) => <p key={i}>- {c}</p>)}
                </div>}
              </CardBody>
              {v.url && <CardFooter><Link href={v.url}>Learn more</Link></CardFooter>}
            </Card>
          </>)}
        </CardList>
      </>}
      {jsonResume.awards && <>
        <h2>Awards</h2>
        <CardList >
          {jsonResume.awards.map((v, i) => <>
            <Card key={i} isHoverable className='cv-card'>
              <CardHeader>
                <div>
                  <div className="row">
                    <Badge color="primary" >{v.date}</Badge>
                    <Badge color="primary">{v.awarder}</Badge>
                  </div>
                  <h3>{v.title}</h3>
                </div>
              </CardHeader>
              <CardBody>
                <p>{v.summary}</p>
              </CardBody>
              {typeof v['url'] == "string" && <CardFooter><Link href={v['url']}>Learn more</Link></CardFooter>}
            </Card>
          </>)}
        </CardList>
      </>}

    </div>
  )
}

export default Home
