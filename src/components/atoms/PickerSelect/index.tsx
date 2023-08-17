/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Modal, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export type PickerSelectProps<T> = {
  visible?: boolean;
  onHide?: (value: boolean) => void;
  onChange: (value: T) => void;
  value?: T;
  options: { label: string; value: string | number }[];
};

// eslint-disable-next-line @typescript-eslint/comma-dangle
const PickerSelect = <T,>({
  visible = false,
  onHide = () => {
    return;
  },
  value,
  options,
  onChange
}: PickerSelectProps<T>) => (
  <Modal visible={visible} animationType="slide" transparent>
    <TouchableOpacity
      activeOpacity={1}
      style={{ height: '100%' }}
      onPress={() => {
        onHide(false);
      }}
    />

    <SafeAreaView
      style={{
        height: '25%',
        marginTop: 'auto'
      }}
    >
      <View style={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#dddddd' }}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => {
            onChange(itemValue);
          }}
        >
          {options.map((opt, index) => (
            <Picker.Item {...opt} key={index} />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  </Modal>
);

export default PickerSelect;
