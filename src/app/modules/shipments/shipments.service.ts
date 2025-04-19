import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { User } from '../user/user.model';
import axios from 'axios';
import { getDistance } from 'geolib';
import { GetAvailableShipmentsQuery, Shipment } from './shipments.interface';

const getAvailableShipmentsNearDriver = async (
  id: string,
  query: GetAvailableShipmentsQuery,
) => {
  const { maxDistance, weightRange, startDate, endDate, location } = query;

  // Step 1: Fetch the driver's coordinates from your database
  const driver = await User.findById(id);
  if (!driver) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Driver not found');
  }
  const driverLocation = driver.location.coordinates; // Driver coordinates

  // Step 2: Fetch shipment data from the website's database (via API)
  const response = await axios.get('https://website-api.com/shipments');
  const shipments: Shipment[] = response.data; // Typed the shipments

  // Step 3: Filter shipments within a specified radius (location filter)
  let nearbyShipments = shipments.filter((shipment) => {
    const shipmentCoords = {
      latitude: shipment.pickup_location.coordinates[1],
      longitude: shipment.pickup_location.coordinates[0],
    };
    const distance = getDistance(driverLocation, shipmentCoords);
    return distance <= (parseInt(maxDistance as string) || 50000); // Default to 50 km if maxDistance is not provided
  });

  // Step 4: Filter by weight range (if provided)
  if (weightRange) {
    const [minWeight, maxWeight] = weightRange.split('-').map(Number);
    nearbyShipments = nearbyShipments.filter(
      (shipment) =>
        shipment.weight >= minWeight && shipment.weight <= maxWeight,
    );
  }

  // Step 5: Filter by date range (if provided)
  if (startDate && endDate) {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    nearbyShipments = nearbyShipments.filter((shipment) => {
      const pickupDate = new Date(shipment.pickup_date);
      return pickupDate >= start && pickupDate <= end;
    });
  }

  // Step 6: Optionally, filter by location (e.g., city or pickup location)
  if (location) {
    nearbyShipments = nearbyShipments.filter(
      (shipment) => shipment.pickup_location.city === location,
    );
  }

  // Step 7: Return the nearby shipments
  return nearbyShipments;
};

export const ShipmentsService = { getAvailableShipmentsNearDriver };
