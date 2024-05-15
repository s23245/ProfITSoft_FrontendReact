export const FETCH_HEROES = 'heroes/fetchHeroes';
export const DELETE_HERO = 'heroes/deleteHero';

export const fetchHeroes = (page, size, filters) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:8080/api/hero/_list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: page,
                    size: size,
                    heroTeamId: filters.heroTeamId || null,
                    heroTeamName: filters.heroTeamName || null,
                    heroClassName: filters.heroClassName || null
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch heroes');
            }

            const data = await response.json();

            dispatch({
                type: FETCH_HEROES,
                payload: {
                    list: data.list,
                    totalPages: data.totalPages,
                },
            });
        } catch (error) {
            console.error('Failed to fetch heroes:', error);
        }
    };
};

export const deleteHero = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:8080/api/hero/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete hero');
            }

            dispatch({
                type: DELETE_HERO,
                payload: id,
            });
        } catch (error) {
            console.error('Failed to delete hero:', error);
        }
    };
};