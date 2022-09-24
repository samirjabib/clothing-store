import {CATEGORIES_ACTION_TYPES , Category, CategoryItem} from './categories.types';

import { createAction, Action, ActionWithPayload } from '../../utils/reducer/reducer.utils';




export type fetchCategoriesStart = 
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type fetchCategoriesSuccess = 
   ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type fetchCategoriesFailed = 
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED>


export type CategoryAction = 
  |fetchCategoriesStart 
  |fetchCategoriesSuccess 
  |fetchCategoriesFailed;




export const fetchCategoriesStart = (): fetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray: Category[]): fetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error : Error): fetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

