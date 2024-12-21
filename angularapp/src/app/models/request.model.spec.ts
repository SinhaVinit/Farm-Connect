import { Request } from './request.model';

describe('Request Model', () => {

  fit('frontend_request_model_should_create_an_instance', () => {
    // Create a sample Request object
    const request: Request = {
      requestType: 'Medicine',
      quantity: 10,
      status: 'Pending',
      requestDate: '2023-06-25T00:00:00Z'
    };

    // Assertion to check if request is truthy (not null or undefined)
    expect(request).toBeTruthy();

    // Assertions to verify specific properties of the request object
    expect(request.requestType).toBe('Medicine');

    expect(request.quantity).toBe(10);
    expect(request.status).toBe('Pending');
  });

});
