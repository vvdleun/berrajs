import styles from './headerbar.module.css'

export default function HeaderBar({ title }) { 
    return (
        <div className={styles.header}>{ title } - Powered by Berra.js</div>
    )
}