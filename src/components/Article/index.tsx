import { motion } from 'framer-motion'

export const FeaturedArticle = ({
  img,
  link,
  summary,
  time,
  title,
}: {
  img: string
  title: string
  time: string
  summary: string
  link: string
}) => {
  return (
    <li className='col-span-1 p-4 bg-light border border-solid border-dark rounded-2xl relative  dark:bg-dark  dark:border-light'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl' />

      <a
        href={link}
        target='_blank'
        className='inline-block cursor-pointer overflow-hidden rounded-lg md:!hidden'
      >
        <motion.img
          src={img}
          alt={title}
          className='h-52'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          sizes='(max-width: 768px) 100vw, (max-width:1200px) 50vw, 50vw'
        />
      </a>
      <a
        href={link}
        target='_blank'
      >
        <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline '>
          {title}
        </h2>
      </a>
      <p className='text-sm mb-2'>{summary}</p>
      <span className='text-primary font-semibol  dark:text-primaryDark'>
        {time}
      </span>
    </li>
  )
}
