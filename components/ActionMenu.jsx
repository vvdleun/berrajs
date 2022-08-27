import styles from './actionmenu.module.css'

export default function ActionMenu({ actions }) { 
    return (
        <div className={styles.actions}>
            { actions.walk.name }
        </div>
    )
}