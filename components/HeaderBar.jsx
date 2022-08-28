import styles from './headerbar.module.css'

export default function HeaderBar({ roomName }) { 
    return (
        <div className={styles.header}>{ roomName }</div>
    )
}