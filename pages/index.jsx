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
  const [msg, setMsg] = useState("");
  const currentMsg = useRef("");
	const gameSession = useRef(null);

  useEffect(() => {
    const engine = new BerraEngine();

    // Necessary during debugging 
    currentMsg.current = "";

    function reactOutputHandler(msg) {
      if(msg.event === 'printLine') {
        currentMsg.current = currentMsg.current + msg.value + "<br>&nbsp;<br>";
        setMsg(currentMsg.current);
      } else if(msg.event === 'print') {
        currentMsg.current = currentMsg.current + msg.value;
        setMsg(currentMsg.current);
      } else if(msg.event === 'printBold') {
        currentMsg.current = currentMsg.current + "<b>" + msg.value + "</b>";
        setMsg(currentMsg.current);
      } else if(msg.event === 'updateActions') {
        setActions(msg.value);
      } else {
        throw "Unimplemented output handler action: " + msg.event;
      }
    }

    engine.subscribeOutputHandler(reactOutputHandler);

    const game = new CoffeeGame();

    gameSession.current = engine.start(game);

    setTitle(game.title);
    setInitializing(false);

    return () => engine.unsubscribeOutputHandler(reactOutputHandler);
  }, []);

  return (
    initializing ?
     "Loading, please wait..."
     : <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <HeaderBar title={title} />
        <div className={styles.row}>
          <div className={styles.output} dangerouslySetInnerHTML={{ __html: msg }}>
          </div>
          <div className={styles.actions}>
            <ActionMenu actions={actions} />
          </div>
        </div>
      </main>
    </div>
  )
}
