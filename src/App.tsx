import './App.scss'
import About from './components/About'
import Experience from './components/Experience'
import Likes from './components/Likes'
import Profile from './components/Profile'
import Spotify from './components/Spotify'
import Tech from './components/Tech'

function App() {

  return (
    <>
      <Profile />

      <main className='main-layout'>
        <section className='left'>
          <About />
          <Tech />
        </section>

        <aside className='right'>
          <Experience />
          <Spotify />
          <Likes />
        </aside>
      </main>
    </>
  )
}

export default App
