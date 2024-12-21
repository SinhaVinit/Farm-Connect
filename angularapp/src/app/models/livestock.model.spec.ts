import { Livestock } from './livestock.model';

describe('Livestock Model', () => {

  fit('frontend_livestock_model_should_create_an_instance', () => {
    // Create a sample Livestock object without optional fields
    const livestock: Livestock = {
      name: 'Bessie',
      species: 'Cow',
      age: 4,
      breed: 'Holstein',
      location: 'Barn A',
    };

    // Assertion to check if livestock is truthy (not null or undefined)
    expect(livestock).toBeTruthy();

    // Assertions to verify specific properties of the livestock object
    expect(livestock.name).toBe('Bessie');
    expect(livestock.species).toBe('Cow');
  
  });


});
