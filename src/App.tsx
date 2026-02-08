import './App.scss'
import About from './components/About'
import Experience from './components/Experience'
import Likes from './components/Likes'
import Profile from './components/Profile'
import Project from './components/Project'
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
          <Project />
        </section>

        <aside className='right'>
          <Experience />
          <Spotify />
          <Likes />
        </aside>

        {/* div that is 50/50 width */}
        {/* div for 100% width  */}
      </main>
    </>
  )
}

export default App
