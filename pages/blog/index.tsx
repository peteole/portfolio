import { GetStaticProps, NextPage } from "next/types"
import Head from 'next/head'
import { Badge, Card, Col, Container, Row, Text } from "@nextui-org/react"
import CardList from "../../components/CardList"
import { useRouter } from 'next/router'
import Link from "next/link"

export type BlogPost = {
    title: string,
    date?: string,
    content: string,
}

type BlogProps = {
    posts: BlogPost[]
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
    const posts = await loadBlogPosts()
    return { props: { posts } }
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
    posts.reverse()
    const router = useRouter()
    return (
        <Container className="cv-body">
            <Head>
                <title>Blog</title>
            </Head>
            <CardList>
                {posts.map((post, i) => {
                    const firstHashIndex = post.content.indexOf("#")
                    let contentPreview = ""
                    if (firstHashIndex >= 0) {
                        contentPreview = post.content.slice(firstHashIndex)
                        contentPreview = contentPreview.slice(contentPreview.indexOf("\n"))

                    } else {
                        contentPreview = post.content
                    }
                    contentPreview = contentPreview.replace(/[^a-zA-Z \n]/g, "").slice(0, 50)
                    return (
                        <Card key={i} className='cv-card' isHoverable>
                            <Card.Header>
                                <Row justify="space-between">
                                    <Text h3>{post.title}</Text>
                                    {post.date && <Badge color="primary">{post.date}</Badge>}
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Text style={{ overflowWrap: "normal", width: "80%", overflow: "hidden" }}>
                                    {contentPreview}...
                                </Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link href={"/blog/" + i}>Read post</Link>
                            </Card.Footer>
                        </Card>)
                })}
            </CardList>
        </Container>
    )
}

export default Blog

import resume, { ResumeSchema } from "../../util/resume"

let _posts: BlogPost[]|null = null
export async function loadBlogPosts():Promise<BlogPost[]>{
    if(_posts) return _posts
    const posts=resume.publications?.filter(p=>p.type==="blog"&&p.url)
    if(!posts) return []
    const urls = posts.map(p=>p.url||"")
    const postContents = await Promise.all(urls.map(async (url) => {
        const res = await fetch(url)
        return res.text()
    }))
    _posts= postContents.map((content,i)=>{
        const baseUrl = urls[i].replace("index.md","")
        //content = content.replace(/!\[.*\]\((.*)\)/g,`![image](${baseUrl}$1)`)
        // replace relative links with absolute links
        content = content.replace(/\[(.*)\]\((([a-z]|[A_Z]|[0-9]|\.|\/)*)\)/g,`[$1](${baseUrl}$2)`)
        console.log(content)
        return {
            content:content,
            date:posts[i].releaseDate||null,
            title: posts[i].name||content.split("\n")[0].replace("# ","")
        }
    })
    return _posts
}