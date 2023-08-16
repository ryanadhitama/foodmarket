import Axios from 'axios';
import { API_HOST } from '../../config';
import { showMessage, storeData } from '../../utils';
import { setLoading } from './global';

export const signInAction = (form: any, navigation: any) => (dispatch: any) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/login`, form)
    .then((res) => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;
      dispatch(setLoading(false));
      storeData('token', { value: token });
      storeData('userProfile', profile);
      navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.data?.message || 'Error login', 'danger');
    });
};

export const signUpAction =
  (dataRegister: any, photoReducer: any, navigation: any) => (dispatch: any) => {
    Axios.post(`${API_HOST.url}/register`, dataRegister)
      .then((res) => {
        const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
        const profile = res.data.data.user;

        storeData('token', { value: token });

        if (photoReducer.isUploadPhoto) {
          const photoForUpload = new FormData();
          photoForUpload.append('file', photoReducer);

          Axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((resUpload) => {
              profile.profile_photo_url = `${API_HOST.storage}/${resUpload.data.data[0]}`;
              storeData('userProfile', profile);
              navigation.reset({ index: 0, routes: [{ name: 'SuccessSignUp' }] });
            })
            .catch((err) => {
              showMessage(err?.response?.message || 'Uplaod photo tidak berhasil', 'danger');
              navigation.reset({ index: 0, routes: [{ name: 'SuccessSignup' }] });
            });
        } else {
          storeData('userProfile', profile);
          navigation.reset({ index: 0, routes: [{ name: 'SuccessSignup' }] });
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.message, 'danger');
      });
  };
