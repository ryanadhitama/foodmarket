/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet
} from 'react-native';

export type DropdownProps = {
  placeholder?: string;
  value?: string;
  label?: string;
  onToggle: () => void;
  style?: StyleProp<ViewStyle>;
};

const Dropdown = ({ label, placeholder, value, onToggle }: DropdownProps) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.input}>
      <TouchableWithoutFeedback onPress={onToggle}>
        <View>{value ? <Text>{value}</Text> : <Text>{placeholder}</Text>}</View>
      </TouchableWithoutFeedback>
    </View>
  </>
);

export default Dropdown;

const styles = StyleSheet.create({
  label: { marginBottom: 5, fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202' },
  input: { borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 10 }
});
