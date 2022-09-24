import { Badge, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ResumeSchema } from "../util/jsonresume"
import resume from "../util/resume.json"
import cv from "../util/cv"


export const getStaticProps: GetStaticProps<{ jsonResume: typeof cv }> = () => {
  return {
    props: {
      jsonResume: cv
    }
  }
}
const Contact: NextPage<{ jsonResume: typeof cv }> = ({ jsonResume }) => {

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