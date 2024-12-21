import { User } from './user.model';

describe('User Model', () => {

  fit('frontend_user_model_should_create_an_instance', () => {
    // Create a sample User object without optional fields
    const user: User = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
      mobileNumber: '1234567890',
      userRole: 'Supplier'
    };

    // Assertion to check if user is truthy (not null or undefined)
    expect(user).toBeTruthy();

    // Assertions to verify specific properties of the user object
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
  });

});
