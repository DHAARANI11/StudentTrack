
import React, { useEffect, useRef } from 'react';

// Add Google Maps type declaration
declare global {
  interface Window {
    google: any;
  }
}

interface MapProps {
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

export function MapComponent({ location }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load Google Maps script
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.document.body.appendChild(googleMapsScript);

    googleMapsScript.onload = () => {
      if (!mapRef.current) return;

      // Initialize the map
      const mapOptions = {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      };

      // Create the map
      const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = mapInstance;

      // Add marker
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: location.address,
      });
    };

    // Cleanup
    return () => {
      if (googleMapsScript.parentNode) {
        googleMapsScript.parentNode.removeChild(googleMapsScript);
      }
    };
  }, [location]);

  return (
    <div className="flex flex-col h-full">
      <div ref={mapRef} className="w-full h-full">
        <div className="flex items-center justify-center h-full bg-muted">
          <p className="text-muted-foreground">Loading map...</p>
          <p className="text-xs text-muted-foreground mt-2">
            (To use Google Maps, add your API key in MapComponent.tsx)
          </p>
        </div>
      </div>
    </div>
  );
}
