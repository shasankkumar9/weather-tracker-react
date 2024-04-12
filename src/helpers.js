export function determineDirection(degrees) {
  // Convert degrees to the range 0 to 360
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees += 360;
  }

  // Determine sector number
  var sector = Math.floor(degrees / 22.5);

  // Determine direction based on sector
  switch (sector) {
    case 0:
      return 'North';
    case 1:
      return 'North-Northeast';
    case 2:
      return 'Northeast';
    case 3:
      return 'East-Northeast';
    case 4:
      return 'East';
    case 5:
      return 'East-Southeast';
    case 6:
      return 'Southeast';
    case 7:
      return 'South-Southeast';
    case 8:
      return 'South';
    case 9:
      return 'South-Southwest';
    case 10:
      return 'Southwest';
    case 11:
      return 'West-Southwest';
    case 12:
      return 'West';
    case 13:
      return 'West-Northwest';
    case 14:
      return 'Northwest';
    case 15:
      return 'North-Northwest';
    default:
      return 'Unknown'; // In case of invalid input
  }
}

// alert for different os
export function showLocationPermissionAlert() {
  var message = '';
  if (navigator.userAgent.match(/(android|iphone|ipad)/i)) {
    message =
      'Please enable location permission in your device settings to use this feature.';
  } else {
    message =
      'Please enable location permission in your browser settings to use this feature.';
  }
  alert(message);
}

export function formatCreatedOn(createdOn) {
  // Parse the createdOn string into a Date object
  const date = new Date(createdOn);

  // Format the time part of the date as '12:30 PM'
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleTimeString('en-US', options);
}

export function processDataList(dataList) {
  // Sort the list by the 'createdOn' property in descending order (newest to oldest)
  dataList.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

  // Add the 'time' property to each object after sorting
  dataList.forEach((data) => {
    data.time = formatCreatedOn(data.createdOn);
  });

  return dataList;
}
