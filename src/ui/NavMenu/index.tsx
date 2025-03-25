import { useState } from 'react';
import { NavLink } from 'react-router';

import { minTabletWidth } from '../../constants/screen-size-constants';
import useWindowSize from '../../hooks/useWindowSize';
import { pillFilters } from '../../constants/filters';
import PillFilter from '../PillFilter';
import { getRoadmapBreakdown } from '../../api/feedback';
import styles from './NavMenu.module.css';

const NavMenu = () => {
    const { width } = useWindowSize();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');

    return (
        <nav className={styles.nav}>
            {/* Header */}
            <div className={styles.nav__header}>
                <div>
                    <h2 className={styles.nav__title}>Frontend Mentor</h2>
                    <h3 className={styles.nav__subtitle}>Feedback Board</h3>
                </div>

                {width < minTabletWidth ?
                    isDrawerOpen ?
                        // Mobile only
                        <img
                            src='/assets/shared/mobile/icon-hamburger.svg'
                            alt='Hamburger Menu'
                            onClick={() => setIsDrawerOpen(prev => !prev)}
                        /> :
                        <img
                            src='/assets/shared/mobile/icon-close.svg'
                            alt='Close Menu'
                            onClick={() => setIsDrawerOpen(prev => !prev)}
                        /> :
                    undefined
                }
            </div>

            {/* Overlay - On mobile */}
            {width < minTabletWidth && isDrawerOpen &&
                <div className={styles.nav__overlay} />
            }

            {/* Drawer - On mobile */}
            {(width >= minTabletWidth || isDrawerOpen) &&
                <div className={styles.nav__drawer}>
                    {/* Pill filters */}
                    <div className={styles.nav__filters}>
                        {pillFilters.map((filter, index) => (
                            <PillFilter
                                key={index}
                                filter={filter}
                                onFilterChange={setSelectedFilter}
                                selectedFilter={selectedFilter}
                            />
                        ))}
                    </div>

                    {/* Roadmap details */}
                    <div className={styles.roadmap}>
                        <div className={styles.roadmap__header}>
                            <p className={styles.roadmap__title}>Roadmap</p>
                            <NavLink className={styles.roadmap__subtitle} to='/roadmap'>View</NavLink>
                        </div>
                        <div>
                            {[
                                { name: 'planned', color: '#F49F85' },
                                { name: 'inProgress', color: '#AD1FEA' },
                                { name: 'live', color: '#62BCFA' }
                            ].map((status, index) => (
                                <div className={styles.roadmap__item} key={index}>
                                    <div style={{ backgroundColor: status.color }} className={styles['roadmap__item-icon']} />
                                    <p className={styles.roadmap__text}>{status.name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}</p>
                                    <p className={styles.roadmap__count}>
                                        {getRoadmapBreakdown()[status.name as keyof ReturnType<typeof getRoadmapBreakdown>]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </nav>
    );
};

export default NavMenu;