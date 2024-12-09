import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';

const RadioButton = ({label, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.radioContainer}
      disabled={isSelected}
      onPress={onPress}>
      <View style={styles.outerCircle}>
        {isSelected && (
          <View testID="inner-circle" style={styles.innerCircle} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
