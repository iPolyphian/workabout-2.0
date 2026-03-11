import type { Amenity } from "@/types/database";

export const amenities: Amenity[] = [
  // Connectivity
  { id: "am-001", name: "WiFi", icon: "Wifi", category: "Connectivity" },
  { id: "am-002", name: "Phone Booths", icon: "Phone", category: "Connectivity" },
  { id: "am-003", name: "Video Conferencing", icon: "Video", category: "Connectivity" },

  // Facilities
  { id: "am-004", name: "Kitchen", icon: "UtensilsCrossed", category: "Facilities" },
  { id: "am-005", name: "Showers", icon: "Droplets", category: "Facilities" },
  { id: "am-006", name: "Bike Storage", icon: "Bike", category: "Facilities" },
  { id: "am-007", name: "Lockers", icon: "Lock", category: "Facilities" },
  { id: "am-008", name: "Parking", icon: "ParkingSquare", category: "Facilities" },

  // Comfort
  { id: "am-009", name: "Air Conditioning", icon: "Wind", category: "Comfort" },
  { id: "am-010", name: "Standing Desks", icon: "Monitor", category: "Comfort" },
  { id: "am-011", name: "Natural Light", icon: "Sun", category: "Comfort" },
  { id: "am-012", name: "Quiet Zone", icon: "VolumeX", category: "Comfort" },

  // Services
  { id: "am-013", name: "Reception", icon: "ConciergeBell", category: "Services" },
  { id: "am-014", name: "Mail Handling", icon: "Mail", category: "Services" },
  { id: "am-015", name: "Printing", icon: "Printer", category: "Services" },
];
