import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RadioButton from '../../component/RadioButton';
import {useQuery, gql} from '@apollo/client';
import {styles, radioButtonContainer} from './style';
import CommonText from '../../assets/constant';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserType {
  id: number;
  label: string;
}

interface NavigationProps {
  navigate: (screen: string, params: object) => void;
}

interface AppProps {
  navigation: NavigationProps;
}

export const GET_USER = gql`
  query ListZellerCustomers {
    listZellerCustomers {
      items {
        id
        name
        email
        role
      }
    }
  }
`;

const App: React.FC<AppProps> = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState<number>(1);

  const {data} = useQuery<{listZellerCustomers: {items: User[]}}>(GET_USER);

  const userType: UserType[] = [
    {id: 1, label: 'Admin'},
    {id: 2, label: 'Manager'},
  ];

  const getUserType = userType.filter(data => data.id === selectedOption);
  const userDetails =
    data?.listZellerCustomers.items.filter(
      user => user.role === getUserType[0]?.label,
    ) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.userTypeHeading}>{CommonText.userType}</Text>
      {userType.map(option => (
        <View
          key={option.id}
          style={radioButtonContainer(selectedOption, option.id)}>
          <RadioButton
            key={option.id}
            label={option.label}
            isSelected={selectedOption === option.id}
            onPress={() => setSelectedOption(option.id)}
          />
        </View>
      ))}
      <View style={styles.line} />
      <Text style={styles.roleHeading}>
        {getUserType[0]?.label} {CommonText.user}
      </Text>
      {userDetails?.map(user => (
        <TouchableOpacity
          key={user.id}
          onPress={() => navigation.navigate('UserDetail', user)}
          style={styles.userButtonContainer}>
          <View style={styles.usernameFirstLetterContainer}>
            <Text style={styles.usernameFirstLetterText}>
              {user.name.slice(0, 1)}
            </Text>
          </View>
          <View style={styles.userNameWithRoleContainer}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userRole}>{user?.role}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {userDetails.length ? (
        <View style={styles.line} />
      ) : (
        <Text>
          {getUserType[0]?.label}
          {CommonText.userNotAvailable}
        </Text>
      )}
    </View>
  );
};

export default App;
