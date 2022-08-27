import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import ActionMenu from '../components/ActionMenu.jsx';
import HeaderBar from '../components/HeaderBar.jsx'
import { BerraEngine } from '../public/berrajs/BerraEngine.js';
import { CoffeeGame } from '../public/coffee/CoffeeGame.js';
import styles from '../styles/Main.module.css'

export default function Main() {
  const [initializing, setInitializing] = useState(true);
  const [title, setTitle] = useState(null);
  const [actions, setActions] = useState([]);

	const gameSession = useRef(null);

  useEffect(() => {
    const game = new CoffeeGame();
    gameSession.current = BerraEngine.start(game);
    setTitle(game.title);
    setInitializing(false);
  }, []);

  return (
    initializing ?
     "<p>Loading, please wait...</p>"
     : <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <HeaderBar title={title} />
        <div className={styles.row}>
          <div className={styles.output} >
            You are in your house. 
          </div>
          <div className={styles.actions}>
            <ActionMenu actions={[]} />
          </div>
        </div>
      </main>
    </div>
  )
}
