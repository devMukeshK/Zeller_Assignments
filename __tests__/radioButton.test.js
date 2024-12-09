import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RadioButton from '../src/component/RadioButton';

describe('RadioButton', () => {
  it('renders the radio button with the label', () => {
    const {getByText} = render(
      <RadioButton label="Option 1" isSelected={false} onPress={() => {}} />,
    );
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('shows inner circle when selected', () => {
    const {getByTestId} = render(
      <RadioButton label="Option 1" isSelected={true} onPress={() => {}} />,
    );
    const innerCircle = getByTestId('inner-circle');
    expect(innerCircle).toBeTruthy();
  });

  it('does not show inner circle when not selected', () => {
    const {queryByTestId} = render(
      <RadioButton label="Option 1" isSelected={false} onPress={() => {}} />,
    );
    const innerCircle = queryByTestId('inner-circle');
    expect(innerCircle).toBeNull();
  });

  it('calls onPress when clicked and not selected', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <RadioButton label="Option 1" isSelected={false} onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Option 1'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when already selected', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <RadioButton label="Option 1" isSelected={true} onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Option 1'));
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });
});
