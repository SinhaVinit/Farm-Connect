import { Medicine } from './medicine.model';

describe('Medicine Model', () => {

  fit('frontend_medicine_model_should_create_an_instance', () => {
    // Create a sample Medicine object without optional fields
    const medicine: Medicine = {
      medicineName: 'Aspirin',
      brand: 'Bayer',
      category: 'Pain Relief',
      description: 'Used to reduce pain, fever, or inflammation.',
      quantity: 100,
      unit: 'tablets',
      pricePerUnit: 0.10,
      
    };

    // Assertion to check if medicine is truthy (not null or undefined)
    expect(medicine).toBeTruthy();

  
    expect(medicine.medicineName).toBe('Aspirin');
   ;
  });

});
