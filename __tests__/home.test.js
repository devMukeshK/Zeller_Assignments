import React from 'react';
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import Home, {GET_USER} from '../src/screen/home';
import CommonText from '../src/assets/constant';

const mockData = {
  listZellerCustomers: {
    items: [
      {id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin'},
      {id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager'},
    ],
  },
};

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: mockData,
    },
  },
];
describe('Home Component', () => {
  it('renders the component with data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    // Wait for the data to load and check if user types (Admin, Manager) are rendered
    await waitFor(() => screen.getByText('User Types'));
    expect(screen.getByText('Admin')).toBeTruthy();
    expect(screen.getByText('Manager')).toBeTruthy();
  });

  it('handles radio button interaction and shows correct users', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    // Get the radio button by its label text
    const adminButton = await screen.findByText('Admin');
    fireEvent.press(adminButton);

    // Check if the list displays the correct user (John Doe)
    await waitFor(() => screen.getByText('John Doe'));
    const Admin = screen.getAllByText(/Admin/i);
    console.log('MUKKK', Admin);
    expect(Admin[0]).toBeTruthy();

    expect(screen.getByText('John Doe')).toBeTruthy();

    // Select the "Manager" role
    const managerButton = await screen.findByText('Manager');
    fireEvent.press(managerButton);

    // Check if the list displays the correct user (Jane Smith)
    await waitFor(() => screen.getByText('Jane Smith'));

    expect(screen.getByText('Jane Smith')).toBeTruthy();
    const Manager = screen.getAllByText(/Manager/i);
    expect(Manager[0]).toBeTruthy();
  });

  it('navigates to user details on user button press', async () => {
    const mockNavigate = jest.fn();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home navigation={{navigate: mockNavigate}} />
      </MockedProvider>,
    );

    // Wait for users to load
    const userButton = await screen.findByText('John Doe');

    // Simulate user button press
    fireEvent.press(userButton);

    // Verify navigation was triggered with correct arguments
    expect(mockNavigate).toHaveBeenCalledWith('UserDetail', {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    });
  });

  it('displays "user not available" if no users match the selected role', async () => {
    const mocksNoData = [
      {
        request: {
          query: GET_USER,
        },
        result: {
          data: {
            listZellerCustomers: {
              items: [],
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocksNoData} addTypename={false}>
        <Home navigation={{navigate: jest.fn()}} />
      </MockedProvider>,
    );
    expect(screen.getAllByText(/Admin/i)).toBeTruthy();
    expect(screen.getAllByText(/User Not Available/i)).toBeTruthy();

    const managerButton = await screen.findByText('Manager');
    act(() => {
      fireEvent.press(managerButton);
    });

    expect(screen.getAllByText(/Manager/i)).toBeTruthy();
    expect(screen.getAllByText(/User Not Available/i)).toBeTruthy();
  });
});
