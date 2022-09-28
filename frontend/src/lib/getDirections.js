import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions'
import { lineString as makeLineString } from '@turf/helpers'

const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const directionsClient = MapboxDirectionsFactory({accessToken});

export const  getDirections = async (startLoc, destLoc) => {
    const reqOptions = {
      waypoints: [
        {coordinates: startLoc},
        {coordinates: destLoc},
      ],
      profile: 'driving',
      geometries: 'geojson',
    };
    const res = await directionsClient.getDirections(reqOptions).send();
    const route = makeLineString(res.body.routes[0].geometry.coordinates);
    return {
      type: 'FeatureCollection',
      features: [route]
    };
};