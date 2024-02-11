import { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main className='flex items-center justify-center w-full'>
      <div className={clsx(styles.mainWrapper, 'max-w-screen-lg')}>
        {children}
      </div>
    </main>
  )
}
