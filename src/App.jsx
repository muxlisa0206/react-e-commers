import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LikePage from './pages/LikePage'
import CardPage from './pages/CardPage'
import SinglePage from './pages/SinglePage'
import Products from './pages/Products'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='like' element={<LikePage/>}/>
          <Route path='card' element={<CardPage/>}/>
          <Route path='products/:id' element={<SinglePage/>}/>
          <Route path='products' element={<Products/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App