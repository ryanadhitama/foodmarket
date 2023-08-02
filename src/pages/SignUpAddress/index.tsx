import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dropdown, Gap, Header, PickerSelect, TextInput } from '../../components';
import { useForm } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpAddress = ({ navigation }: any) => {
  const [form, setForm] = useForm({
    phoneNumber: '',
    address: '',
    houseNumber: '',
    city: 'Bandung'
  });

  const [cityVisible, setCityVisible] = useState(false);

  const onSubmit = () => {
    // navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    navigation.navigate('SuccessSignup');
  };
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <SafeAreaView style={styles.page}>
        <Header
          title="Address"
          subTitle="Make sure it's valid"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Phone No."
            placeholder="Type your phone number"
            value={form.phoneNumber}
            onChangeText={(value: string) => setForm('phoneNumber', value)}
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
            label="House No."
            placeholder="Type your house number"
            value={form.houseNumber}
            onChangeText={(value: string) => setForm('houseNumber', value)}
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
          <Button text="Sign Up Now" onPress={onSubmit} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpAddress;

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
