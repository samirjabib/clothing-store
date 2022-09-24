import  { CATEGORIES_ACTION_TYPES , Category} from './categories.types'

import { CategoryAction } from './categories.action';


export type CategoriesState = {
  readonly categories : Category[];
  readonly isLoading : boolean;
  readonly error : Error |null;
}

export const CATEGORIES_INITIAL_STATE : CategoriesState = {
  categories: [],
  isLoading:true,
  error:null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction
) => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: action.payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: action };
    default:
      return state;
  }
};