import UseCase from './common/UseCase'
import { FeaturedArticle } from './components/Article'
import Services from './components/Banner'
import GradHero from './components/GradientHero'
import { Hero } from './components/Hero'
import Layout from './components/Layout'
import { MovingImg } from './components/MovingImg'
import ParallaxComponent from './components/Parallax'
import ParallaxSuper from './components/Parallax/Parallax2'
import Sidebar from './components/Sidebar'
import Stagger from './components/Stagger'
import StaggeredText from './components/Stagger/Text'
import { ParallaxProvider } from 'react-scroll-parallax'

function App() {
  return (
    <>
      {/* <Layout>
        <Hero
          headline={
            <>
              FullStack <br /> Engineer
            </>
          }
        ></Hero>
        <Stagger />
      </Layout> */}
      <Sidebar />
      <section id='Homepage'>
        <StaggeredText text='hello there' />
        <ParallaxProvider>
          <ParallaxComponent />
        </ParallaxProvider>
        <UseCase />
      </section>
      <ParallaxSuper />
      <section
        id='Services'
        className='min-h-screen bg-infinite-60'
      ></section>
      <MovingImg
        img='/mountains.png'
        link='/'
        title='mountain'
      />
      <FeaturedArticle
        img='/mountains.png'
        summary={'lorem aspe'}
        time={'23 march'}
        link='/'
        title='mountain'
      />
      <Services />
    </>
    // <GradHero />
  )
}

export default App
