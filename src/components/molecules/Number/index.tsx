import React from 'react';
import { Text } from 'react-native';
import { numberWithCommas } from '../../../utils';

const Number = ({ number, style }: any) => {
  return <Text style={style}>{numberWithCommas(number)}</Text>;
};

export default Number;
