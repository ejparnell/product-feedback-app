import { Link } from 'react-router-dom';
import { ProductRequest } from '../../../constants/types';
import styles from './CardHeader.module.css';

interface Props {
    feedback: ProductRequest;
}

const CardHeader = ({ feedback }: Props) => {
    const formattedDescription =
        feedback.description.length > 100 ? `${feedback.description.slice(0, 100)}...` : feedback.description;
    const formattedCategory = feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1);

    return (
        <Link className={styles['card-header__link']} to={`/feedback/${feedback.id}`}>
            <h2 className={`${styles['card-header__text']} ${styles['card-header__text--title']}`}>{feedback.title}</h2>
            <p className={`${styles['card-header__text']} ${styles['card-header__text--description']}`}>
                {formattedDescription}
            </p>
            <p className={`${styles['card-header__text']} ${styles['card-header__text--category']}`}>
                {formattedCategory}
            </p>
        </Link>
    );
};

export default CardHeader;
