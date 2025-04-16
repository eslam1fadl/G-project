import React from 'react'
import Header from './Header'
import Ask from './Ask '
import Book from './Book'
import { Helmet } from "react-helmet-async"
export default function Home() {

  
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Header />
      <Ask />
      <Book />

    </>
  )

}
