import Head from 'next/head'
import { useEffect, useMemo, useRef, useState } from 'react'
import ActionMenu from '../components/ActionMenu.jsx';
import GameOutput from '../components/GameOutput.jsx';
import HeaderBar from '../components/HeaderBar.jsx'
import { BerraEngine } from '../public/berrajs/BerraEngine.js';
import { CoffeeGame } from '../public/coffee/CoffeeGame.js';
import styles from '../styles/Main.module.css'

export default function Main() {
  const [initializing, setInitializing] = useState(true);
  const [title, setTitle] = useState(null);
  const [actions, setActions] = useState([]);
  const [msg, setMsg] = useState("");
  const [roomName, setRoomName] = useState("");
  const [selectedAction, setSelectedAction] = useState({});

  const currentMsg = useRef("");    // Keeps reference to text as last logged in GameOutput 
	const gameSession = useRef(null); // The bridge between the Berra.js Engine and React

  // Initalize callback that will handle all incoming messages from the engine
  useEffect(() => {
    const engine = new BerraEngine();

    // Necessary during debugging Next.js apps (it can refresh twice)
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
      } else if(msg.event === 'updateRoomName') {
        setRoomName(msg.value);
      } else {
        throw "Unimplemented output handler action: " + msg.event;
      }
    }

    engine.subscribeOutputHandler(reactOutputHandler);

    const game = new CoffeeGame();

    gameSession.current = engine.start(game);

    setTitle(game.title);
    setInitializing(false);

    return () => { 
      engine.unsubscribeOutputHandler(reactOutputHandler);
    }
  }, []);

  // selectedAction will be filled with action id and object ids, when the user has selected an action 
  // in the ActionMenu component.
  useEffect(() => {
    if(selectedAction && Object.keys(selectedAction).length > 0 && gameSession.current) {
      gameSession.current.action(selectedAction);
      setSelectedAction(null);
    }
  }, [selectedAction])

  if(initializing) {
    return "Loading, please wait...";
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <HeaderBar roomName={roomName} />
        <div className={styles.row}>
          <div className={styles.output}>
            <GameOutput msg={msg} />
          </div>
          <div className={styles.actions}>
            <ActionMenu
                actions={actions}
                onChangeAction={(actionId, objectId) => { 
                  const action = { "action": actionId, "objectIds": [objectId]};
                  setSelectedAction(action)
                }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
