import { Container, Text } from '@nextui-org/react'
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
const Contact: NextPage<{ jsonResume: ResumeSchema }> = ({ jsonResume }) => {

  return (
    <Container css={{ textAlign: "center" }}>

      <Head>
        <title>{jsonResume.basics?.name} - Contact</title>
      </Head>
      {jsonResume.basics && <>
        <Text> {jsonResume.basics?.name}</Text>

        {jsonResume.basics.email && <Text> <Link href={"mailto:" + jsonResume.basics.email}>{jsonResume.basics?.email}</Link></Text>}
        {jsonResume.basics.url && <Text><Link href={jsonResume.basics.url}>{jsonResume.basics?.url}</Link></Text>}
        {jsonResume.basics.phone && <Text>{jsonResume.basics?.phone}</Text>}
        {jsonResume.basics.profiles?.map((v, i) => <Text key={i}>{v.network}: <Link href={v.url || ""}>{v.username}</Link></Text>)}
      </>}
    </Container>
  )
}
export default Contact