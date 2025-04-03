export interface Vehicle {
    _id: string;
    type: string;
    model: string;
    year: string;
    licensePlate: string;
    vin: string;
    status: 'Available' | 'In Use';
  }
  