import React from 'react';
import {render} from '@testing-library/react-native';
import UserDetail from '../src/screen/userDetail';

describe('UserDetail Component', () => {
  it('should display the correct user details', () => {
    // Prepare the mock route params
    const mockRoute = {
      params: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'Admin',
      },
    };

    // Render the component with the mock route params
    const {getByText} = render(<UserDetail route={mockRoute} />);

    // Check if the text "User Name", "User Email", and "User Role" are correctly displayed
    expect(getByText('User Name: John Doe')).toBeTruthy();
    expect(getByText('User Email: johndoe@example.com')).toBeTruthy();
    expect(getByText('User Role: Admin')).toBeTruthy();
  });
});
