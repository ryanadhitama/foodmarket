import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, Gap, Header, PickerSelect, TextInput } from '../../components';
import { API_HOST } from '../../config';
import { setLoading } from '../../redux/action/global';
import { getData, showMessage, storeData, useForm } from '../../utils';

const EditProfile = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [cityVisible, setCityVisible] = useState(false);
  const [form, setForm, setForms] = useForm({
    name: '',
    email: '',
    address: '',
    city: '',
    houseNumber: '',
    phoneNumber: ''
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then((res) => {
        setForms({
          name: res?.name,
          email: res?.email,
          address: res?.address,
          houseNumber: res?.houseNumber,
          phoneNumber: res?.phoneNumber,
          city: res?.city
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const onSubmit = async () => {
    dispatch(setLoading(true));
    let resultObj: any = {};
    Object.keys(form).map((obj) => {
      if (form[obj]) {
        resultObj[obj] = form[obj];
      }
    });
    getData('token').then((resToken) => {
      Axios.post(`${API_HOST.url}/user`, resultObj, {
        headers: {
          Authorization: resToken.value
        }
      })
        .then((res) => {
          showMessage('Update Success', 'success');
          storeData('userProfile', res.data.data).then(() => {
            navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
          });
          dispatch(setLoading(false));
        })
        .catch((err) => {
          showMessage(
            `${err?.response?.data?.message} on Update Profile API` ||
              'Terjadi kesalahan di API Update Profile',
            'error'
          );
          dispatch(setLoading(false));
        });
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <SafeAreaView style={styles.page}>
        <Header
          title="Edit Profile"
          subTitle="Update your profile"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Full Name"
            placeholder="Type your full name"
            value={form.name}
            onChangeText={(value: string) => setForm('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value={form.email}
            onChangeText={(value: string) => setForm('email', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value={form.address}
            onChangeText={(value: string) => setForm('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="House Number"
            placeholder="Type your house number"
            value={form.houseNumber}
            onChangeText={(value: string) => setForm('houseNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Phone Number"
            placeholder="Type your phone number"
            value={form.phoneNumber}
            onChangeText={(value: string) => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <Dropdown
            label="City"
            placeholder="City"
            value={form.city}
            onToggle={() => setCityVisible(!cityVisible)}
          />
          <PickerSelect
            visible={cityVisible}
            onHide={() => setCityVisible(false)}
            options={[
              {
                label: 'Bandung',
                value: 'Bandung'
              },
              {
                label: 'Bali',
                value: 'Bali'
              }
            ]}
            value={form.city}
            onChange={(value) => {
              setForm('city', value);
            }}
          />
          <Gap height={24} />
          <Button text="Update" onPress={onSubmit} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  page: { flex: 1 },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1
  }
});
