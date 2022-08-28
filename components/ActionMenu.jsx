import { useState } from 'react'
import styles from './actionmenu.module.css'

const MODE_CHOOSE_ACTION = 1;
const MODE_CHOOSE_TARGET = 2;

function ActionButton({ caption, disabled, cb, data }) {
    return (
        <button
            disabled={disabled}
            className={disabled ? styles.actionButtonDisabled : styles.actionButton}
            onClick={() => cb(data)}
        >
            {caption}
        </button>
    )
}

function ChosenAction({ visible, caption, undoCb }) {
    if(visible) {
        return (
            <div>
                <h3>{caption} { undoCb ? <button onClick={undoCb}>⏎</button>  : "" }</h3>
            </div> 
        );
    }
    return null;
}


export default function ActionMenu({ actions, onChangeAction }) { 
    const [mode, setMode] = useState(MODE_CHOOSE_ACTION)
    const [actionId, setActionId] = useState(null);

    const isChooseTargetMode = mode === MODE_CHOOSE_TARGET;

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <ChosenAction 
                        visible={isChooseTargetMode}
                        caption={isChooseTargetMode && actions[actionId].name}
                        undoCb={() => {
                            setMode(MODE_CHOOSE_ACTION);
                        }}
                />
                {
                    (mode === MODE_CHOOSE_ACTION && 
                        Object.entries(actions)
                                .map(a => 
                                        <ActionButton 
                                                key={a[0]}
                                                caption={a[1].name}
                                                disabled={a[1].objects.length === 0}
                                                data={a}
                                                cb={ data => {
                                                    setMode(MODE_CHOOSE_TARGET);
                                                    setActionId(data[0])
                                                }}
                                        />)
                    ) || (mode === MODE_CHOOSE_TARGET &&
                        actions[actionId].objects
                                .map(o => 
                                        <ActionButton 
                                                key={o.id}
                                                caption={o.name}
                                                disabled={false}
                                                data={o}
                                                cb={ data => {
                                                    setMode(MODE_CHOOSE_ACTION);
                                                    onChangeAction(actionId, data.id);
                                                }}
                                        />)
                    )
                }
            </div>
        </div>
    )
}