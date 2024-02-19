import styles from './section.module.css'

export default function Section() {
  return (
    <div className={styles.section}>
      <div className={styles.card}>
        <div className={styles.overlay} />
        <img
          src='https://cloud-5pdwvchgm-hack-club-bot.vercel.app/05851864a.jpg'
          alt='Summer Creek Hack Club meeting, February 2020'
          className={styles.img}
        />
        <h3 className={styles.heading}>A Network of 400+ Coding Clubs</h3>
        <p className={styles.subs}>
          Join or start a Hack Club and be part of a network of high quality
          coding clubs where you learn to code entirely through building things.
          You can start with no experience and build and ship a project every
          meeting.
        </p>
      </div>
    </div>
  )
}
