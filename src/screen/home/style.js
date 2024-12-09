import {StyleSheet} from 'react-native';

export const radioButtonContainer = (selectedOption, optionId) => ({
  justifyContent: 'center',
  borderRadius: 5,
  paddingHorizontal: 20,
  height: 40,
  width: 'auto',
  backgroundColor: selectedOption === optionId ? '#E3EFFA' : '#ffffff',
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  userTypeHeading: {fontSize: 20, fontWeight: '500', marginBottom: 20},
  line: {height: 1, backgroundColor: '#B2B2B0', marginVertical: 30},
  userButtonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  usernameFirstLetterContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3EFFA',
    borderRadius: 4,
  },
  usernameFirstLetterText: {fontWeight: '500', color: '#0B5AC2'},
  userNameWithRoleContainer: {
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  userName: {fontSize: 14},
  userRole: {fontSize: 12, color: '#B2B2B0'},
  roleHeading: {fontSize: 20, fontWeight: '500', marginBottom: 20},
});
