import React from 'react';
import MapView from 'react-native-maps';

export default function App() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    />
  );
}