import { Card, Grid } from '@nextui-org/react'
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
const Projects: NextPage<{ jsonResume: ResumeSchema }> = ({ jsonResume }) => {

    return (
      <div >
        <Grid.Container gap={2} justify="center">
          <Grid xs={4}>
            {jsonResume.projects?.map((v, i) => (
              <Card key={i} isHoverable>
                <Card.Header>{v.name}</Card.Header>
                <Card.Body>{v.description}</Card.Body>
              </Card>))}
          </Grid>
        </Grid.Container>
      </div>
    )
  }
  
  export default Projects