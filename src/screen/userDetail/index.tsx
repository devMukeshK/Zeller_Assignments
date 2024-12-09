import {View, Text} from 'react-native';
import React from 'react';
import Styles from './style';

type RouteParams = {
  name?: string;
  email?: string;
  role?: string;
};

type UserDetailProps = {
  route: {
    params: RouteParams;
  };
};

const UserDetail: React.FC<UserDetailProps> = ({
  route: {
    params: {email = '', name = '', role = ''},
  },
}) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>User Name: {name}</Text>
      <Text style={Styles.text}>User Email: {email}</Text>
      <Text style={Styles.text}>User Role: {role}</Text>
    </View>
  );
};

export default UserDetail;
