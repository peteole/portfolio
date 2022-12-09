
import { BlogPost } from "."
import resume, { ResumeSchema } from "../../util/resume"

export async function loadBlogPosts():Promise<BlogPost[]>{
    //const urls=["https://raw.githubusercontent.com/peteole/blog/main/openfoam_gmsh_2d_aerofoil/index.md"]
    const posts=resume.publications?.filter(p=>p.type==="blog"&&p.url)
    if(!posts) return []
    const urls = posts.map(p=>p.url||"")
    const postContents = await Promise.all(urls.map(async (url) => {
        const res = await fetch(url)
        return res.text()
    }))
    return postContents.map((content,i)=>{
        const baseUrl = urls[i].replace("index.md","")
        //content = content.replace(/!\[.*\]\((.*)\)/g,`![image](${baseUrl}$1)`)
        // replace relative links with absolute links
        content = content.replace(/\[(.*)\]\((.*)\)/g,`[$1](${baseUrl}$2)`)
        return {
            content:content,
            date:posts[i].releaseDate||null,
            title: content.split("\n")[0].replace("# ","")
        }
    })
}