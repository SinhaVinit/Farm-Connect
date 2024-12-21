import { Feed } from './feed.model';

describe('Feed Model', () => {

  fit('frontend_Feed_model_should_create_an_instance', () => {
    // Create a sample Feed object
    const feed: Feed = {
      feedName: 'Corn',
      type: 'Vegetable',
      description: 'Fresh corn from the farm',
      quantity: 5,
      unit: 'kg',
      pricePerUnit: 2.5,
      
    };

    // Assertion to check if feed is truthy (not null or undefined)
    expect(feed).toBeTruthy();

    // Assertions to verify specific properties of the feed object
   
    expect(feed.type).toBe('Vegetable');
    expect(feed.description).toBe('Fresh corn from the farm');
    expect(feed.quantity).toBe(5);
    expect(feed.unit).toBe('kg');
  
  });

});
