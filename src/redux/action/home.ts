import { showMessage } from '../../utils';
import Axios from 'axios';
import { API_HOST } from '../../config';

export const getFoodData = () => (dispatch?: any) => {
  Axios.get(`${API_HOST.url}/food`)
    .then((res: any) => {
      dispatch({ type: 'SET_FOOD', value: res.data.data.data });
    })
    .catch((err: any) => {
      showMessage(
        `${err?.response?.data?.message} on Food API` || 'Terjadi kesalahan di API Food',
        'error'
      );
    });
};

export const getFoodDataByTypes = (types: string) => (dispatch: any) => {
  Axios.get(`${API_HOST.url}/food?types=${types}`)
    .then((res) => {
      if (types === 'new_food') {
        dispatch({ type: 'SET_NEW_TASTE', value: res.data.data.data });
      }
      if (types === 'popular') {
        dispatch({ type: 'SET_POPULAR', value: res.data.data.data });
      }
      if (types === 'recommended') {
        dispatch({ type: 'SET_RECOMMENDED', value: res.data.data.data });
      }
    })
    .catch((err) => {
      showMessage(
        `${err?.response?.data?.message} on Food By Type API` ||
          'Terjadi kesalahan di API Food By Type',
        'error'
      );
    });
};
