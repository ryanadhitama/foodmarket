import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Gap, Header, TextInput } from '../../components';
import { showMessage, useForm } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';

const SignUp = ({ navigation }: any) => {
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: ''
  });
  const [photo, setPhoto] = useState<any>('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch({ type: 'SET_REGISTER', value: form });
    navigation.navigate('SignUpAddress');
  };

  const addPhoto = () => {
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
          const source = { uri: response.assets[0].uri };

          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName
          };

          setPhoto(source);
          dispatch({ type: 'SET_PHOTO', value: dataImage });
          dispatch({ type: 'SET_UPLOAD_STATUS', value: true });
        }
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <SafeAreaView style={styles.page}>
        <Header title="Sign Up" subTitle="Register and eat" onBack={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.photo}>
            <TouchableOpacity onPress={addPhoto}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  <View style={styles.photoContainer}>
                    <Text style={styles.addPhoto}>Add Photo</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
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
            label="Password"
            placeholder="Type your password"
            value={form.password}
            onChangeText={(value: string) => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={24} />
          <Button text="Continue" onPress={onSubmit} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  page: { flex: 1 },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center'
  }
});
