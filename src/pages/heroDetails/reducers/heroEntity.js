import { FETCH_HERO, DELETE_HERO, CREATE_HERO, UPDATE_HERO } from '../actions/hero';

const initialState = {
  list: [],
  current: null,
};

export default function heroEntityReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HERO:
      return {
        ...state,
        current: action.payload.current,
      };
    case CREATE_HERO:
      return {
        ...state,
        list: [...state.list, action.payload],
        current: action.payload,
      };
    case UPDATE_HERO:
      return {
        ...state,
        list: state.list.map(hero => {
          if (hero.id === action.payload.id) {
            return action.payload;
          }
          return hero;
        }),
        current: action.payload,
      };
    case DELETE_HERO:
      return {
        ...state,
        list: state.list.filter(hero => hero.id !== action.payload),
        current: state.current && state.current.id === action.payload ? null : state.current,
      };
    default:
      return state;
  }
}