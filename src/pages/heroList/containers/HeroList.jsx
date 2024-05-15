import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import Pagination from '@mui/material/Pagination';
import { fetchHeroes, deleteHero } from '../actions/hero';
import Button from '../../../components/Button';
import Dialog from '../../../components/Dialog';
import Typography from '../../../components/Typography';
import IconButton from '../../../components/IconButton';
import CloseIcon from '../../../components/icons/Close';
import Menu from '../../../components/Menu';
import MenuItem from '../../../components/MenuItem';
import {Box} from "@mui/material";
import Link from "../../../components/Link";

function HeroList() {
    const intl = useIntl();
    const heroes = useSelector(state => state.heroEntity.list);
    const totalPages = useSelector(state => state.heroEntity.totalPages);
    const [page, setPage] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [filter, setFilter] = useState({});

    const [dialogOpen, setDialogOpen] = useState(false);
    const [heroToDelete, setHeroToDelete] = useState(null);

    const [message, setMessage] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pageParam = query.get('page');
        setPage(pageParam !== null ? parseInt(pageParam, 10) : 0);
    }, [location.search]);

    useEffect(() => {
        dispatch(fetchHeroes(page, 5, filter));
    }, [page, filter, dispatch]);

    const handleConfirmDelete = async () => {
        if (heroToDelete) {
            try {
                await dispatch(deleteHero(heroToDelete.heroId));
                setDialogOpen(false);
                setMessage(intl.formatMessage({ id: 'heroDeletedSuccessfully' }));
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                setMessage(intl.formatMessage({ id: 'deleteHeroError' }));
            }
        }
    };

    const handleOpenDialog = (id) => {
        const hero = heroes.find(hero => hero.heroId === id);
        if (hero) {
            setHeroToDelete(hero);
            setDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    const handleFilter = (field) => {
        setFilter(field);
        dispatch(fetchHeroes(page, 5, {...filter, ...field}));
        setMenuOpen(false);
    };

    const handlePageChange = (event, value) => {
        setPage(value - 1);
        navigate(`?page=${value - 1}&filter=${JSON.stringify(filter)}&lang=${intl.locale}`);
    };

    return (
        <Box sx={{ m: 2 }}>

            <Button variant="primary" colorVariant="primary" onClick={() => navigate('/heroDetails/new')}>{intl.formatMessage({ id: 'addHero' })}</Button>
            <Button variant="primary" colorVariant="secondary" onClick={handleOpenMenu}>{intl.formatMessage({ id: 'filter' })}</Button>
            <Menu
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                open={menuOpen}
            >
                <MenuItem onClick={() => handleFilter({ heroTeamId: '1' })}>Filter by Team ID</MenuItem>
                <MenuItem onClick={() => handleFilter({ heroTeamName: 'Team 1' })}>Filter by Team Name</MenuItem>
                <MenuItem onClick={() => handleFilter({ heroClassName: 'Wizard' })}>Filter by Class Name</MenuItem>
            </Menu>

            {message && <Typography >{message}</Typography>}

            {Array.isArray(heroes) && heroes.map(hero => (
                <Box

                    style={{
                        backgroundColor: '#f5f5f5',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '10px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onMouseEnter={() => setShowDeleteButton(hero.heroId)}
                    onMouseLeave={() => setShowDeleteButton(null)}
                >

                    <Link href={`/heroDetails/${hero?.heroId || ''}`}  key={hero?.heroId || ''} >
                        <Typography variant="h3" colors={"primary"}>{hero.heroClassName}</Typography>
                        <Typography>{`${intl.formatMessage({ id: 'level' })}: ${hero.heroLevel}`}</Typography>
                        <Typography>{`${intl.formatMessage({ id: 'mana' })}: ${hero.manaAmount}`}</Typography>
                    </Link>

                    {showDeleteButton === hero.heroId && (
                        <IconButton
                            onClick={() => handleOpenDialog(hero.heroId)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>
            ))}

            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                style={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '10px',
                    marginBottom: '10px',
                }}
            />

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <Typography variant="h5" align={"center"}>
                    {heroToDelete ? intl.formatMessage({ id: 'areYouSure' }) : intl.formatMessage({ id: 'heroDeletedSuccessfully' })}
                </Typography>
                <Button onClick={handleConfirmDelete}>{intl.formatMessage({ id: 'delete' })}</Button>
                <Button onClick={handleCloseDialog}>{intl.formatMessage({ id: 'cancel' })}</Button>
            </Dialog>

        </Box>
    );
}

export default HeroList;