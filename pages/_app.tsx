import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Avatar, CssBaseline, Navbar, NextUIProvider } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {
  const pages = [{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: "Skills", path: "/skills" }, { name: "CV", path: "/cv" }, { name: "Contact", path: "/contact" },{name: "Blog", path: "/blog"}]
  const router = useRouter()
  console.log(router.pathname)
  return <>
    <NextUIProvider>
      <Navbar isBordered variant="sticky">
        <Navbar.Content>
          {pages.map((v, i) => (<Navbar.Link as={Link} key={i} isActive={router.pathname === v.path} href={v.path}>{v.name}</Navbar.Link>
          ))}
        </Navbar.Content>

      </Navbar>
      <Component {...pageProps} />
    </NextUIProvider>
  </>
}

export default MyApp
