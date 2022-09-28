import {useState, useEffect} from 'react';
import Map, { Marker,NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ReportedLeaks = () => {
    const [leaks, setLeaks] = useState();

    useEffect(() => {
      fetch('http://localhost:8080/leaks')
        .then((res) => res.json())
        .then((data) => setLeaks(data))
        .catch((err) => console.log(err));
    }, []);

  return (
    <div className="App">
      <Map
        initialViewState={{
          latitude: 0.28369,
          longitude: 34.75226,
          zoom: 15
        }}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/ligawa/cl6nbhs0q005814mlzxkhwac6"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {(leaks || []).map(leak => (
            <Marker
            longitude={leak.longitude}
            latitude={leak.latitude}
            color='#FF0000'
          />
        ))}
        <NavigationControl/>
      </Map>
    </div>
  );
}

export default ReportedLeaks;
