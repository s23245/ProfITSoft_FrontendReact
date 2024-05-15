import { FETCH_HEROES, DELETE_HERO } from '../actions/hero';

const initialState = {
  list: [],
  totalPages: 0,
};


export default function heroEntityReducer(state = initialState, action) {
  switch (action.type)
  {
    case FETCH_HEROES:
      return {
        ...state,
        list: action.payload.list,
        totalPages: action.payload.totalPages,
      };
    case DELETE_HERO:
      return state.filter(hero => hero.id !== action.payload);
    default:
      return state;
  }
}