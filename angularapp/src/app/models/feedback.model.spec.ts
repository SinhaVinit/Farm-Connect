import { Feedback } from './feedback.model';

describe('Feedback Model', () => {

  fit('frontend_feedback_model_should_create_an_instance', () => {
    // Create a sample Feedback object
    const feedback: Feedback = {
      feedbackText: 'This is a sample feedback.',
      date: new Date('2023-06-25')
    };

    // Assertion to check if feedback is truthy (not null or undefined)
    expect(feedback).toBeTruthy();

    // Assertions to verify specific properties of the feedback object
    expect(feedback.feedbackText).toBe('This is a sample feedback.');
    expect(feedback.date).toEqual(new Date('2023-06-25'));
  });

  

});
