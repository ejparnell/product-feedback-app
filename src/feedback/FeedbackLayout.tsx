import { Outlet } from 'react-router';
import NavMenu from '../ui/NavMenu';
import styles from './FeedbackLayout.module.css';

const FeedbackLayout = () => {
    return (
        <div className={styles.feedback__container}>
            <div className={styles.sidebar}>
                <NavMenu />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default FeedbackLayout;