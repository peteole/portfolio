import { GetStaticProps, NextPage } from "next/types"
import Head from 'next/head'
import { Badge, Card, Col, Container, Row, Text } from "@nextui-org/react"
import CardList from "../../components/CardList"
import { loadBlogPosts } from "./blogPosts"
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
                                    {post.date&&<Badge color="primary">{post.date}</Badge>}
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