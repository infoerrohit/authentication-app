# React Native Authentication App

A React Native app with Login and Signup functionality using React Context API for state management and React Navigation for navigation.

## Features

- **Authentication Context**: Global state management using React Context API

- **Login Screen**: Email and password validation with error handling
- **Signup Screen**: Name, email, and password validation with error handling
- **Home Screen**: Display user information and logout functionality

- **Persistent Authentication**: Uses AsyncStorage to persist login state

- **Password Visibility Toggle**: Eye icon to toggle password visibility

- **Form Validation**: Client-side validation for all input fields
- **Modern UI**: Clean and intuitive design with proper styling
- **Centralized Text Management**: All text content managed from a single constants file
- **Centralized Color Management**: All colors managed from a single constants file for consistent theming
- **Centralized Font Management**: All typography managed from a single constants file for consistent text styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd authentication-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on iOS:

````bash
select i from the listed options(You must have xCode installed)```

5. Run on Android:

```bash
select a from the listed options(You must have xCode installed)
````

## Project Structure

```
src/
├── constants/
│   ├── colorConstants.js       # Centralized color constants
│   ├── fontConstants.js        # Centralized font constants
│   └── textConstants.js        # Centralized text constants
├── contexts/
│   └── AuthContext.js          # Authentication context and state management
└── screens/
    ├── LoginScreen.js          # Login screen with form validation
    ├── SignupScreen.js         # Signup screen with form validation
    └── HomeScreen.js           # Home screen with user info and logout
```

## Authentication Flow

1. **Login**: Users can login with email and password

   - Default test credentials: `test@example.com` / `password123`
   - Form validation for email format and required fields
   - Error handling for invalid credentials

2. **Signup**: Users can create new accounts

   - Name, email, and password fields
   - Password must be at least 6 characters
   - Email format validation
   - Error handling for missing fields

3. **Home**: Authenticated users see their profile
   - Display user name and email
   - Logout functionality with confirmation
   - Persistent login state

## State Management

The app uses React Context API for global state management:

- `user`: Current user information
- `login(email, password)`: Login function
- `signup(name, email, password)`: Signup function
- `logout()`: Logout function
- `loading`: Loading state for initial auth check

## Navigation

Uses React Navigation v6 with Stack Navigator:

- Login Screen (initial route)
- Signup Screen
- Home Screen (protected route)

## Persistence

Authentication state is persisted using AsyncStorage:

- User remains logged in after app restart
- Automatic login check on app launch
- Secure storage of user data

## Form Validation

- **Email**: Valid email format required
- **Password**: Minimum 6 characters for signup
- **Name**: Required for signup
- **Real-time validation**: Errors shown as user types

## UI/UX Features

- **Password Visibility Toggle**: Eye icon to show/hide password
- **Error Messages**: Clear error messages for validation failures
- **Loading States**: Proper loading indicators
- **Responsive Design**: Works on different screen sizes
- **Modern Styling**: Clean, professional appearance

## Testing

To test the app:

1. **Login Flow**:

   - Use test credentials: `test@example.com` / `password123`
   - Try invalid credentials to see error handling

2. **Signup Flow**:

   - Create a new account with valid information
   - Test form validation with invalid data

3. **Persistence**:
   - Login and close the app
   - Reopen to verify you're still logged in

## Dependencies

- `@react-navigation/native`: Navigation library
- `@react-navigation/stack`: Stack navigator
- `@react-native-async-storage/async-storage`: Local storage
- `expo`: Development platform
- `react-native`: React Native framework

## Future Enhancements

- Real API integration
- Password reset functionality
- Biometric authentication
- Social login options
- User profile editing
- Remember me functionality
- Session timeout handling
