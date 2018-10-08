import {
  NEW_GIFT,
  CLEAR_GIFT,
  SHOW_GIFT
} from './constants';
import jsonp from '../../../utils/jsonp';
import { ServiceHost } from '../../../utils/pipeline';

export const newGift = (content, isHead) => dispatch => dispatch({
  type: NEW_GIFT,
  data: content,
  isHead
});

export const clearGift = () => dispatch => dispatch({
  type: CLEAR_GIFT
});

export const showGift = () => dispatch => dispatch({
  type: SHOW_GIFT
});
