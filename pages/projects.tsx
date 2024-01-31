import { Badge, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalHeader } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CardList from '../components/CardList'
import resume, { ResumeSchema } from "../util/resume"
import { Col, Container, Row, Text } from "../components/layout"

export const getStaticProps: GetStaticProps<{ jsonResume: ResumeSchema }> = () => {
  return {
    props: {
      jsonResume: resume
    }
  }
}
const Projects: NextPage<{ jsonResume: ResumeSchema }> = ({ jsonResume }) => {
  const router = useRouter();
  const modalId = router.asPath.split('#')[1];
  const [modalProject, setModalProject] = useState(jsonResume.projects?.[-1]);
  useEffect(() => {
    setModalProject(jsonResume.projects?.[parseInt(modalId || "-1")]);
  }, [jsonResume.projects, modalId])

  return (
    <Container className="cv-body">
      <Modal isOpen={modalProject !== undefined} onClose={() => router.push({ hash: "" })} closeButton>
        <ModalHeader>
          <h1>Demo: {modalProject?.name}</h1>
        </ModalHeader>
        <ModalBody>
          <Text>{modalProject?.summary}{modalProject?.description}</Text>
          <iframe src={modalProject?.["demo"]} height="1000px" />
        </ModalBody>
      </Modal>
      <Head>
        <title>{jsonResume.basics?.name} - Projects</title>
      </Head>
      <CardList>
        {jsonResume.projects?.map((v, i) => (
          <Card key={i} isHoverable className='cv-card'>
            <CardHeader>
              <Col>
                <Row>
                  <Badge color="primary" >{v.startDate} to {v.endDate || "now"}</Badge>
                  {v.entity && <Badge color="primary">{v.entity}</Badge>}
                  {v.roles?.map((r, i) => <Badge key={i} color="primary">{r}</Badge>)}
                </Row>
                <Text h3>{v.name}</Text>
              </Col>
            </CardHeader>
            <CardBody>
              <Text>{v.description}</Text>
              {v.highlights && <Container >
                <Text h4>Highlights</Text>
                {v.highlights.map((c, i) => <Text key={i}>- {c}</Text>)}
              </Container>}
              {v.keywords && <Container ><Text h4>Technologies</Text>{v.keywords.map((c, i) => <Badge key={i}>{c}</Badge>)}</Container>}
            </CardBody>
            {(v.url) && <CardFooter><Row justify='space-between'><Link href={v.url}>Learn more</Link>{v["demo"] && <Link href={"/projects#" + i}>Demo</Link>}</Row></CardFooter>}
          </Card>))}
      </CardList>
      {jsonResume.publications?.filter(p=>p.type!=="blog")?.length && <>
        <Text h2>Publications</Text>
        <CardList>
          {jsonResume.publications.map((v, i) => (
            <Card key={i} isHoverable className='cv-card'>
              <CardHeader>
                <Col>
                  <Row>
                    <Badge color="primary" >{v.releaseDate}</Badge>
                    <Badge color="primary" >{v.publisher}</Badge>
                  </Row>
                  <Text h3>{v.name}</Text>
                </Col>
              </CardHeader>
              <CardBody>
                <Text>{v.summary}</Text>
                {v.url && <Link href={v.url}>Learn more</Link>}
              </CardBody>
            </Card>
          ))}
        </CardList></>}
    </Container>
  )
}

export default Projects