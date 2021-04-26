// accept numerical value for parameters and return distance b/w two coordinates in numeric format
const calculateDistance = (lat1, lat2, long1, long2) => {
    let d;
    let deltaLat = lat2 - lat1;
    let detltaLong = long2 - long1;
    d = Math.sqrt(Math.pow(deltaLat, 2) + Math.pow(detltaLong, 2));
    return d;
  };
  
  export default calculateDistance;