import styles from './gameoutput.module.css'

export default function GameOutput({ msg }) { 
    return (
        <div className={styles.output} dangerouslySetInnerHTML={{ __html: msg }}>
        </div>
    )
}