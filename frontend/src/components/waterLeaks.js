import { getDirections } from '../lib/getDirections.js';

import {useState, useEffect, useRef} from 'react';
import Map, { Marker,NavigationControl, Source, Layer } from 'react-map-gl';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';



let socket;

const layerStyle = {
  id: 'routepath',
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#4169E1',
    'line-width': 7,
    'line-opacity': 0.75
  }
};

const notify = () => toast("New water leak 😱​🛠️​​", {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

const sound = require('../assets/notification-sound.mp3');

const WaterLeaks = () => {
  const [ audio ] = useState(new Audio(sound));
  const [isConnected, setIsConnected] = useState(false);
  const [newleak, setNewLeak] = useState(false);
  const [leaklocation, setLeaklocaation] = useState({});
  const [route, setRoute] = useState({});
  const socketClientRef = useRef();

  useEffect(() => {
    socket = io('http://localhost:8080');
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('newleak', (location) => {
      setLeaklocaation({
        lat: location.latitude,
        long: location.longitude,
      });
      setNewLeak(true);
      notify();
      audio.play();
    });

    (async () => {
      const geojson = await getDirections([34.75226, 0.28369], [leaklocation.long, leaklocation.lat]);
      setRoute(geojson);
    })()

    socketClientRef.current = socket;

    return () => {
      socket.removeAllListeners();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaklocation]);

  return (
    <div className="App">
      <Map
        initialViewState={{
          latitude: 0.28369,
          longitude: 34.75226,
          zoom: 16
        }}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/ligawa/cl6nbhs0q005814mlzxkhwac6"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Marker
          longitude={34.75226}
          latitude={0.28369}
        />
        {isConnected && newleak && (
          <Marker
            longitude={leaklocation.long}
            latitude={leaklocation.lat}
            color='#FF0000'
        />
        )}
        {isConnected && newleak && (
          <Source id="route" type="geojson" data={route}>
             <Layer {...layerStyle}/>
          </Source>
        )}
        <NavigationControl/>
      </Map>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
       />
    </div>
  );
}

export default WaterLeaks;
