import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

const Number = ({ number, type, style }: any) => {
  // if (type === 'decimal') {
  //   return (
  //     <NumberFormat
  //       value={number}
  //       displayType="text"
  //       renderText={(value: string) => <Text style={style}>{value}</Text>}
  //       decimalSeparator="."
  //       decimalScale={1}
  //       fixedDecimalScale
  //     />
  //   );
  // }
  return <Text style={style}>{number}</Text>;
  return (
    <NumberFormat
      value={number}
      thousandSeparator="."
      displayType="text"
      prefix="IDR "
      renderText={(value: string) => <Text style={style}>{value}</Text>}
      decimalSeparator=","
    />
  );
};

export default Number;
