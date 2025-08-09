import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom stylish marker icon
const createCustomIcon = (color = '#3B82F6') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        position: relative;
        width: 30px;
        height: 30px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: -1px 1px 4px rgba(0,0,0,0.3);
      ">
        <div style="
          position: absolute;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          top: 8px;
          left: 8px;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const MapContainerComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude
          });
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  // Add CSS for Leaflet container
  useEffect(() => {
    const leafletContainer = document.querySelector('.leaflet-container');
    if (leafletContainer) {
      leafletContainer.style.height = '100%';
      leafletContainer.style.width = '100%';
    }
  }, [currentPosition]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading your location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* <h1 className="text-2xl font-bold mb-4 text-gray-800">My Current Location</h1> */}
      
      <div className=" rounded-lg ">
        {currentPosition ? (
          <>
            <div className="h-48 w-full  rounded-md overflow-hidden relative">
              <MapContainer
                center={[currentPosition.lat, currentPosition.lng]}
                zoom={15}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker 
                  position={[currentPosition.lat, currentPosition.lng]}
                  icon={createCustomIcon('#3B82F6')} // Blue color marker
                >
                  <Popup className="custom-popup">
                    <div className="font-semibold text-blue-600">You are here!</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {currentPosition.lat.toFixed(6)}, {currentPosition.lng.toFixed(6)}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700">Coordinates</h2>
              <p className="text-gray-600">
                Latitude: {currentPosition.lat.toFixed(6)}, Longitude: {currentPosition.lng.toFixed(6)}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            <p>Location data not available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapContainerComponent;