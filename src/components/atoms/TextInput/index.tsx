import React from 'react';
import { StyleSheet, Text, View, TextInput as TextInputRN } from 'react-native';

const TextInput = ({ label, placeholder, ...restProps }: any) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInputRN
        autoCapitalize="none"
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: { marginBottom: 5, fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202' },
  input: { borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 10 }
});
