import { GetStaticPaths, GetStaticProps, NextPage } from "next/types"
import Head from 'next/head'
import resume, { ResumeSchema } from "../../util/resume"
import { Badge, Card, Col, Container, Row, Text } from "@nextui-org/react"
import { loadBlogPosts } from "./blogPosts"
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { BlogPost } from "."


export const getStaticProps: GetStaticProps<BlogPost> = async (context) => {
    const index = context.params?.["blog_index"]?.toString() || ""
    const posts = await loadBlogPosts()
    const post = posts[parseInt(index)]
    return {
        props: post
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await loadBlogPosts()
    return {
        paths: posts.map((v, i) => ({ params: { blog_index: i.toString() } })),
        fallback: false,
    }
}

const BlogPostPage: NextPage<BlogPost> = (props) => {
    return (
        <Container className="cv-body" style={{ maxWidth: 800 }}>
            <Head>
                <title>Blog - {props.title}</title>
            </Head>
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}>
                {props.content}
            </ReactMarkdown>
        </Container>
    )
}

export default BlogPostPage