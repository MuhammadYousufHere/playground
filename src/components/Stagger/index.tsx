import { motion } from 'framer-motion'
import { IconType } from 'react-icons/lib'
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from 'react-icons/fa'
import { SiTailwindcss, SiTypescript, SiRedux } from 'react-icons/si'

interface SkillCardProps {
  id: number
  name: string
  title: string
}

export const skill_fullstack = [
  {
    id: 1,
    name: 'html',
    title: 'Html 5',
  },
  {
    id: 2,
    name: 'css',
    title: 'Css',
  },
  {
    id: 3,
    name: 'javascript',
    title: 'Javascript',
  },
  {
    id: 4,
    name: 'tailwind',
    title: 'Tailwind Css',
  },
  {
    id: 5,
    name: 'react',
    title: 'React',
  },
  {
    id: 6,
    name: 'redux',
    title: 'Redux',
  },
  {
    id: 7,
    name: 'typescript',
    title: 'Typescript',
  },
  {
    id: 8,
    name: 'node',
    title: 'Node js',
  },
]
function Stagger() {
  return (
    <section
      id='skills'
      className='container max-w-4xl mx-auto flex flex-col items-center justify-center'
    >
      {/* <TitleSection> Skills</TitleSection> */}
      <div className='justify-center grid grid-cols-2 gap-6  md:gap-8 md:grid-cols-3 lg:grid-cols-4 z-[20]'>
        {skill_fullstack.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.15, delay: i * 0.1 }}
          >
            <SkillCard
              id={skill.id!}
              name={skill.name!}
              title={skill.title!}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
const getIconForSkill = (skillName: string): IconType | null => {
  switch (skillName) {
    case 'html':
      return FaHtml5
    case 'css':
      return FaCss3
    case 'javascript':
      return FaJs
    case 'react':
      return FaReact
    case 'tailwind':
      return SiTailwindcss
    case 'redux':
      return SiRedux
    case 'typescript':
      return SiTypescript
    case 'node':
      return FaNodeJs
    default:
      return null
  }
}
const SkillCard: React.FC<SkillCardProps> = ({ name, title }) => {
  const IconComponent = getIconForSkill(name!)

  if (!IconComponent) {
    // Handle case where the skill name doesn't match any known icon
    return null
  }

  return (
    <article className='green-pink-gradient w-36 md:w-48 p-[1px] rounded-xl shadow-card z-[20]'>
      <div>
        <div className='bg-tertiary rounded-xl py-5 px-12 w-[144px] min-h-[144px] md:w-[192px] md:min-h-[192px] flex justify-evenly items-center flex-col'>
          <IconComponent
            size={40}
            fill='#00e5e5'
          />

          <h3 className='text-white text-sm md:text-lg font-bold text-center'>
            {title}
          </h3>
        </div>
      </div>
    </article>
  )
}

export default Stagger
