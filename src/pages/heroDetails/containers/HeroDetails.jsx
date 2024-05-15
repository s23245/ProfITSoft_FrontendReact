import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHero, updateHero, createHero } from '../actions/hero';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import TextField from '../../../components/TextField';
import { Box } from "@mui/material";
import Typography from "../../../components/Typography";
import Create from "@mui/icons-material/Create";
import Undo from "@mui/icons-material/Undo";

function HeroDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hero = useSelector(state => state.heroEntity.current);
    const [editMode, setEditMode] = useState(id === 'new');
    const [formFields, setFormFields] = useState({
        heroClassName: '',
        heroLevel: '',
        manaAmount: '',
        abilities: '',
        heroMainElement: '',
        heroTeamId: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id && id !== 'new') {
            dispatch(fetchHero(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (hero && id !== 'new') {
            setFormFields(hero);
        }
    }, [hero, id]);

    const handleChange = (name) => (event) => {
        const { value } = event.target;
        setFormFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const validateFields = () => {

        const newErrors = {};

        if (!formFields.heroClassName || !formFields.heroClassName.trim() || formFields.heroClassName.length < 10) {
            newErrors.heroClassName = 'Hero class name must be at least 10 characters long';
        }
        if (!formFields.heroLevel || formFields.heroLevel < 1 || formFields.heroLevel > 100)
        {
            newErrors.heroLevel = 'Hero level must be between 1 and 100';
        }
        if (!formFields.manaAmount || formFields.manaAmount < 0)
        {
            newErrors.manaAmount = 'Mana amount must be a positive number';
        }
        if (!formFields.abilities || !formFields.abilities.trim() || formFields.abilities.length < 10)
        {
            newErrors.abilities = 'Abilities must be at least 10 characters long';
        }
        if (!formFields.heroMainElement || !formFields.heroMainElement.trim() || formFields.heroMainElement.length < 4)
        {
            newErrors.heroMainElement = 'Main element must be at least 5 characters long';
        }
        if(!formFields.heroTeamId || formFields.heroTeamId < 0)
        {
            newErrors.heroTeamId = 'Team ID must be a positive number';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (validateFields()) {
            if (id === 'new') {
                await dispatch(createHero(formFields));
                navigate('/heroList');
            } else {
                await dispatch(updateHero(id, formFields));
                setEditMode(false);
            }
        } else {
               alert('Please change the fields that are not valid!');
        }
    };

    const handleCancel = () => {
        if (id === 'new') {
            navigate('/heroList');
        } else {
            setFormFields(hero);
            setEditMode(false);
        }
    };

    return (
        <Box sx={{ m: 2 }}>
            {editMode ? (
                <>
                    <TextField
                        value={formFields.heroClassName || ''}
                        onChange={handleChange('heroClassName')}
                        label="Hero Class Name"
                        error={!!errors.heroClassName}
                        helperText={errors.heroClassName}
                    />
                    <TextField
                        value={formFields.heroLevel || ''}
                        onChange={handleChange("heroLevel")}
                        label="Hero Level"
                        type="number"
                        error={!!errors.heroLevel}
                        helperText={errors.heroLevel}
                    />
                    <TextField
                        value={formFields.manaAmount || ''}
                        onChange={handleChange("manaAmount")}
                        label="Mana Amount"
                        type="number"
                        error={!!errors.manaAmount}
                        helperText={errors.manaAmount}
                    />
                    <TextField
                        value={formFields.abilities || ''}
                        onChange={handleChange("abilities")}
                        label="Abilities"
                        error={!!errors.abilities}
                        helperText={errors.abilities}
                    />
                    <TextField
                        value={formFields.heroMainElement || ''}
                        onChange={handleChange("heroMainElement")}
                        label="Hero Main Element"
                        error={!!errors.heroMainElement}
                        helperText={errors.heroMainElement}
                    />
                    <TextField
                        value={formFields.heroTeamId || ''}
                        onChange={handleChange("heroTeamId")}
                        label="Hero Team ID"
                        type="number"
                        error={!!errors.heroTeamId}
                        helperText={errors.heroTeamId}
                    />
                    <div>
                        <Button onClick={handleSave}>{id === 'new' ? 'Create' : 'Save'}</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                </>
            ) : (
                <>
                    <Typography variant="h3" align="center">Hero class name: {formFields.heroClassName}</Typography>
                    <Typography variant="h5" align="center">Level: {formFields.heroLevel}</Typography>
                    <Typography variant="h5" align="center">Mana Amount: {formFields.manaAmount}</Typography>
                    <Typography variant="h5" align="center">Abilities: {formFields.abilities}</Typography>
                    <Typography variant="h5" align="center">Main Element: {formFields.heroMainElement}</Typography>
                    <Typography variant="h5" align="center">Team ID: {formFields.heroTeamId}</Typography>
                    <IconButton onClick={() => setEditMode(true)}>
                        <Create />
                    </IconButton>
                </>
            )}
            <IconButton onClick={() => navigate('/heroList')}>
                <Undo />
            </IconButton>
        </Box>
    );
}

export default HeroDetails;
