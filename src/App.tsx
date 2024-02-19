import { Cursor } from './assets/Cursor'
import UseCase from './common/UseCase'
import { FeaturedArticle } from './components/Article'
import Services from './components/Banner'
import GradHero from './components/GradientHero'
import { Hero } from './components/Hero'
import Layout from './components/Layout'
import { MovingImg } from './components/MovingImg'
import ParallaxComponent from './components/Parallax'
import ParallaxSuper from './components/Parallax/Parallax2'
import { RetroGrid } from './components/RetroGrid'
import Section from './components/Section'
import { ShimmerButton } from './components/ShimmerButton'
import Sidebar from './components/Sidebar'
import { Spotlight } from './components/Sportlights'
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
        <h1 className='text-zinc-900 dark:text-white font-extrabold text-5xl md:text-6xl xl:text-7xl'>
          <span className='gradient-text inline-block'>22 % Faster</span>
        </h1>
      </section>
      <ParallaxSuper />

      <section
        id='Services'
        className='min-h-screen bg-infinite-60'
      ></section>
      <Section />
      <MovingImg
        img='/mountains.png'
        link='/'
        title='mountain'
      />
      <Cursor
        color='dodgerblue'
        x={2}
        y={4}
      />
      <FeaturedArticle
        img='/mountains.png'
        summary={'lorem aspe'}
        time={'23 march'}
        link='/'
        title='mountain'
      />
      <RetroGrid />
      <ShimmerButton>Hire pro</ShimmerButton>
      <ShimmerButton
        className='relative w-full sm:w-max flex items-center justify-center transition-all hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)_inset]'
        background='radial-gradient(ellipse 80% 70% at 50% 120%, #b28ce2, #892fda)'
      >
        <span className='relative whitespace-pre text-center text-base font-semibold leading-none tracking-tight text-white z-10'>
          Get Started
        </span>
      </ShimmerButton>
      <Services />
      <Spotlight>d</Spotlight>
    </>
    // <GradHero />
  )
}

export default App
