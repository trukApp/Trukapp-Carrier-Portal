/* eslint-disable @typescript-eslint/no-explicit-any */

export const createLocationMap = (locations: any[] = []) => {
  return locations.reduce(
    (acc: Record<string, any>, location: any) => {
      acc[location.loc_ID] = location;
      return acc;
    },
    {},
  );
};

export const getLocation = (
  locationMap: Record<string, any>,
  locId?: string,
) => {
  if (!locId) return null;

  return locationMap[locId] ?? null;
};

export const getLocationName = (
  locationMap: Record<string, any>,
  locId?: string,
) => {
  return getLocation(locationMap, locId)?.loc_desc ?? "-";
};

export const getLocationCity = (
  locationMap: Record<string, any>,
  locId?: string,
) => {
  return getLocation(locationMap, locId)?.city ?? "-";
};

export const getLocationState = (
  locationMap: Record<string, any>,
  locId?: string,
) => {
  return getLocation(locationMap, locId)?.state ?? "-";
};

export const getLocationCountry = (
  locationMap: Record<string, any>,
  locId?: string,
) => {
  return getLocation(locationMap, locId)?.country ?? "-";
};

export const getFullLocation = (
  locationMap: Record<string, any>,
  locId?: string,
) => {
  const location = getLocation(locationMap, locId);

  if (!location) {
    return {
      name: "-",
      city: "-",
      state: "-",
      country: "-",
      address: "-",
    };
  }

  return {
    name: location.loc_desc,
    city: location.city,
    state: location.state,
    country: location.country,
    address: `${location.city}, ${location.state}, ${location.country}`,
  };
};