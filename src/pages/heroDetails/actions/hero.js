export const FETCH_HERO = 'heroes/fetchHero';
export const CREATE_HERO = 'heroes/createHero';
export const UPDATE_HERO = 'heroes/updateHero';
export const DELETE_HERO = 'heroes/deleteHero';

export const fetchHero = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:8080/api/hero/${id}`);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error data:', errorData);
                throw new Error('Failed to fetch hero');
            }

            const data = await response.json();

            dispatch({
                type: FETCH_HERO,
                payload: { current: data },
            });
        } catch (error) {
            console.error('Failed to fetch hero:', error);
        }
    };
};

export const createHero = (hero) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:8080/api/hero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hero),
            });

            if (!response.ok) {
                throw new Error('Failed to create hero');
            }

            const data = await response.json();

            dispatch({
                type: CREATE_HERO,
                payload: data,
            });
        } catch (error) {
            console.error('Failed to create hero:', error);
        }
    };
};

export const updateHero = (id, hero) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:8080/api/hero/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hero),
            });

            if (!response.ok) {
                throw new Error('Failed to update hero');
            }

            const data = await response.json();

            dispatch({
                type: UPDATE_HERO,
                payload: data,
            });
        } catch (error) {
            console.error('Failed to update hero:', error);
        }
    };
};