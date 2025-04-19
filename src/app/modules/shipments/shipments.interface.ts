// Define interfaces for shipment and query parameters
export interface Shipment {
    pickup_location: {
      coordinates: [number, number]; // [longitude, latitude]
      city: string;
    };
    weight: number;
    pickup_date: string;
  }
  
  export interface GetAvailableShipmentsQuery {
    maxDistance?: string;
    weightRange?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
  }
  