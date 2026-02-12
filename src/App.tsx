import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import MinimalLayout from './layouts/MinimalLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' element={<Home />} />
        </Route>
          
        <Route element={<MinimalLayout/>}>
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
