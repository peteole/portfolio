// pages/_app.js
import * as React from "react";
import {  Navbar, NextUIProvider, NavbarContent, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const pages = [{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: "Skills", path: "/skills" }, { name: "CV", path: "/cv" }, { name: "Contact", path: "/contact" },{name: "Blog", path: "/blog"}]
  const router = useRouter()
  console.log(router.pathname)
  return <>
    <NextUIProvider>
      <Navbar isBordered>
        <NavbarContent>
          {pages.map((v, i) => (
            <Link key={i} href={v.path}>{v.name}</Link>
          ))}
        </NavbarContent>

      </Navbar>
      <Component {...pageProps} />
    </NextUIProvider>
  </>
}
export default MyApp;