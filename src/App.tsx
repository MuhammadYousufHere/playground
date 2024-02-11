import GradHero from './components/GradientHero'
import { Hero } from './components/Hero'
import Layout from './components/Layout'
import Stagger from './components/Stagger'
import StaggeredText from './components/Stagger/Text'

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
      <StaggeredText text='hello there' />
    </>
    // <GradHero />
  )
}

export default App
