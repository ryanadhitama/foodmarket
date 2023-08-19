import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileTabSection } from '../../components';
import { getData, showMessage, storeData } from '../../utils';
import * as ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import { API_HOST } from '../../config';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/action';

const Profile = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    profile_photo_url: ''
  });
  useEffect(() => {
    navigation.addListener('focus', () => {
      updateUserProfile();
    });
  }, [navigation]);

  const updateUserProfile = () => {
    getData('userProfile').then((res) => {
      setUserProfile(res);
    });
  };

  const updatePhoto = () => {
    ImagePicker.launchImageLibrary(
      {
        quality: 1,
        maxWidth: 200,
        maxHeight: 200,
        mediaType: 'photo'
      },
      async (response: any) => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo', 'error');
        } else {
          dispatch(setLoading(true));
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName
          };

          const photoForUpload = new FormData();
          photoForUpload.append('file', dataImage);
          getData('token').then((resToken) => {
            Axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
              headers: {
                Authorization: resToken.value,
                'Content-Type': 'multipart/form-data'
              }
            })
              .then((res: any) => {
                getData('userProfile').then((resUser) => {
                  showMessage('Update Photo Berhasil', 'success');
                  resUser.profile_photo_url = res.data.data[0];
                  storeData('userProfile', resUser).then(() => {
                    updateUserProfile();
                  });
                  dispatch(setLoading(false));
                });
              })
              .catch((err: any) => {
                showMessage(
                  `${err?.response?.data?.message} on Update Photo API` ||
                    'Terjadi kesalahan di API Update Photo',
                  'error'
                );
                dispatch(setLoading(false));
              });
          });
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.profileDetail}>
        <View style={styles.photo}>
          <TouchableOpacity onPress={updatePhoto}>
            {userProfile.profile_photo_url ? (
              <View style={styles.borderPhoto}>
                <Image
                  source={{
                    uri: userProfile.profile_photo_url
                  }}
                  style={styles.photoContainer}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <View style={styles.content}>
        <ProfileTabSection />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { flex: 1, marginTop: 24 },
  profileDetail: { backgroundColor: 'white', paddingBottom: 26 },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    textAlign: 'center'
  },
  email: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center'
  },
  photo: { alignItems: 'center', marginTop: 26, marginBottom: 16 },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24
  }
});
