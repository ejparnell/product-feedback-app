import styles from './Roadmap.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackProvider';
import { useState, useEffect } from 'react';
import { ProductRequest } from '../constants/types';
import CardHeader from '../ui/Card/CardHeader';
import VotePill from '../ui/Card/VotePill';
import CommentPill from '../ui/Card/CommentPill';
import useWindowSize from '../hooks/useWindowSize';

type FilteredFeedback = {
    [key in 'planned' | 'in-progress' | 'live']: ProductRequest[];
};

const Roadmap = () => {
    const navigate = useNavigate();
    const { feedback } = useFeedback();
    const { width } = useWindowSize();
    const [filter, setFilter] = useState({ value: 'planned', label: 'Planned' });
    const [filteredFeedback, setFilteredFeedback] = useState<FilteredFeedback>({
        planned: [],
        'in-progress': [],
        live: [],
    });

    useEffect(() => {
        const plannedFeedback = feedback.filter((item) => item.status.value === 'planned');
        const inProgressFeedback = feedback.filter((item) => item.status.value === 'in-progress');
        const liveFeedback = feedback.filter((item) => item.status.value === 'live');

        setFilteredFeedback({
            planned: plannedFeedback,
            'in-progress': inProgressFeedback,
            live: liveFeedback,
        });
    }, [feedback, filter]);

    return (
        <div className={styles.roadmap}>
            <header className={styles['roadmap__header']}>
                <div>
                    <Link className={`${styles['roadmap__link--back']} ${styles['roadmap__link']}`} to='/feedback'>
                        <span className={styles['roadmap__icon']}>
                            <img src='/assets/shared/icon-arrow-left.svg' alt='Back Arrow' />
                        </span>
                        Go Back
                    </Link>
                    <p>Roadmap</p>
                </div>

                <div className={styles['roadmap__new-btn']} onClick={() => navigate('/feedback/new')}>
                    + Add Feedback
                </div>
            </header>

            <section className={styles.roadmap__content}>
                {/* Roadmap Filters */}
                {width < 768 && (
                    <div className={styles.roadmap__filters}>
                        {[
                            { value: 'planned', label: 'Planned' },
                            { value: 'in-progress', label: 'In Progress' },
                            { value: 'live', label: 'Live' },
                        ].map((status) => (
                            <div
                                onClick={() => setFilter(status)}
                                key={status.label}
                                className={`${styles.roadmap__filter} ${
                                    filter.value === status.value ? styles['roadmap__filter--selected'] : undefined
                                }`}
                            >
                                {status.label}{' '}
                                {`(${filteredFeedback[status.value as keyof FilteredFeedback].length || 0})`}
                            </div>
                        ))}
                    </div>
                )}

                {/* Roadmap List */}
                {width < 768 && (
                    <div>
                        <h1 className={styles.roadmap__title}>
                            {filter.label} {`(${filteredFeedback[filter.value as keyof FilteredFeedback].length || 0})`}
                        </h1>
                        <p className={styles.roadmap__subtitle}>Features currently being developed</p>

                        <div className={styles.roadmap__list}>
                            {filteredFeedback[filter.value as keyof FilteredFeedback].length > 0 ? (
                                filteredFeedback[filter.value as keyof FilteredFeedback].map((item) => (
                                    <div
                                        style={{
                                            borderTop: `5px solid ${
                                                item.status.value === 'planned'
                                                    ? '#F49F85'
                                                    : item.status.value === 'in-progress'
                                                    ? '#AD1FEA'
                                                    : '#62BCFA'
                                            }`,
                                        }}
                                        className={styles['roadmap__feedback-card']}
                                    >
                                        <div className={styles['roadmap__feedback-card-header']}>
                                            <span
                                                className={`${styles.roadmap__indicator} ${
                                                    styles[`roadmap__indicator--${item.status.value}`]
                                                }`}
                                            ></span>
                                            <p>{item.status.label}</p>
                                        </div>
                                        <div>
                                            <CardHeader feedback={item} />
                                            <div className={styles['roadmap__feedback-card-details']}>
                                                <VotePill feedback={item} />
                                                <CommentPill feedback={item} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.roadmap__text}>No feedback available</p>
                            )}
                        </div>
                    </div>
                )}

                {width >= 768 && (
                    <>
                        {/* Planned */}
                        <div className={styles.roadmap__columns}>
                            <h2 className={styles.roadmap__title}>
                                Planned {`(${filteredFeedback.planned.length || 0})`}
                            </h2>
                            <p className={styles.roadmap__subtitle}>Features requested by the community</p>

                            <div className={styles.roadmap__column}>
                                {filteredFeedback.planned.length > 0 ? (
                                    filteredFeedback.planned.map((item) => (
                                        <div
                                            style={{ borderTop: `5px solid #F49F85` }}
                                            className={styles['roadmap__feedback-card']}
                                        >
                                            <div className={styles['roadmap__feedback-card-header']}>
                                                <span
                                                    className={`${styles.roadmap__indicator} ${
                                                        styles[`roadmap__indicator--${item.status.value}`]
                                                    }`}
                                                ></span>
                                                <p>{item.status.label}</p>
                                            </div>
                                            <div>
                                                <CardHeader feedback={item} />
                                                <div className={styles['roadmap__feedback-card-details']}>
                                                    <VotePill feedback={item} />
                                                    <CommentPill feedback={item} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.roadmap__text}>No feedback available</p>
                                )}
                            </div>
                        </div>

                        {/* In Progress */}
                        <div className={styles.roadmap__columns}>
                            <h2 className={styles.roadmap__title}>
                                In Progress {`(${filteredFeedback['in-progress'].length || 0})`}
                            </h2>
                            <p className={styles.roadmap__subtitle}>Features currently being developed</p>

                            <div className={styles.roadmap__column}>
                                {filteredFeedback['in-progress'].length > 0 ? (
                                    filteredFeedback['in-progress'].map((item) => (
                                        <div
                                            style={{ borderTop: `5px solid #AD1FEA` }}
                                            className={styles['roadmap__feedback-card']}
                                        >
                                            <div className={styles['roadmap__feedback-card-header']}>
                                                <span
                                                    className={`${styles.roadmap__indicator} ${
                                                        styles[`roadmap__indicator--${item.status.value}`]
                                                    }`}
                                                ></span>
                                                <p>{item.status.label}</p>
                                            </div>
                                            <div>
                                                <CardHeader feedback={item} />
                                                <div className={styles['roadmap__feedback-card-details']}>
                                                    <VotePill feedback={item} />
                                                    <CommentPill feedback={item} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.roadmap__text}>No feedback available</p>
                                )}
                            </div>
                        </div>

                        {/* Live */}
                        <div className={styles.roadmap__columns}>
                            <h2 className={styles.roadmap__title}>Live {`(${filteredFeedback.live.length || 0})`}</h2>
                            <p className={styles.roadmap__subtitle}>Released features</p>

                            <div className={styles.roadmap__column}>
                                {filteredFeedback.live.length > 0 ? (
                                    filteredFeedback.live.map((item) => (
                                        <div
                                            style={{ borderTop: `5px solid #62BCFA` }}
                                            className={styles['roadmap__feedback-card']}
                                        >
                                            <div className={styles['roadmap__feedback-card-header']}>
                                                <span
                                                    className={`${styles.roadmap__indicator} ${
                                                        styles[`roadmap__indicator--${item.status.value}`]
                                                    }`}
                                                ></span>
                                                <p>{item.status.label}</p>
                                            </div>
                                            <div>
                                                <CardHeader feedback={item} />
                                                <div className={styles['roadmap__feedback-card-details']}>
                                                    <VotePill feedback={item} />
                                                    <CommentPill feedback={item} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.roadmap__text}>No feedback available</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default Roadmap;
