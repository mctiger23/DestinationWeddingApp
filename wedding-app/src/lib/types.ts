// User Types
export type UserRole = "couple" | "coordinator" | "guest";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
}

// Guest Types
export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rsvp: "pending" | "confirmed" | "declined";
  from: string;
  fromCode: string;
  budget: string;
  allowedGuests: number;
  partyMembers: PartyMember[];
  travelInfo?: TravelInfo;
}

export interface PartyMember {
  name: string;
  relation: "self" | "spouse" | "child" | "guest" | "plus-one";
  age?: number;
}

export interface TravelInfo {
  flight?: FlightInfo;
  hotel?: HotelInfo;
}

export interface FlightInfo {
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
}

export interface HotelInfo {
  name: string;
  checkinDate: string;
  checkoutDate: string;
  roomType?: string;
  confirmationNumber?: string;
}

// Wedding Types
export interface Wedding {
  id: string;
  coupleName: string;
  destination: string;
  destinationCode: string;
  date: string;
  venue: string;
  coverPhoto?: string;
  coordinator?: Coordinator;
  itinerary: ItineraryItem[];
  guests: Guest[];
  settings: WeddingSettings;
}

export interface Coordinator {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  description?: string;
  duration?: number;
  isPublic: boolean;
}

export interface WeddingSettings {
  allowGuestMessaging: boolean;
  allowTravelSharing: boolean;
  requireRsvpDeadline?: string;
  timeZone: string;
  currency: string;
}

// Flight Search Types
export type FlightSearchMode = "affiliate" | "ai";

export interface FlightRecommendation {
  id: string;
  provider: string;
  type: FlightSearchMode;
  searchUrl?: string;
  previewData: FlightPreviewData;
}

export interface FlightPreviewData {
  airline: string;
  price?: string;
  priceRange?: string;
  duration?: string;
  stops?: string;
  description: string;
  commission?: string;
  aiScore?: number;
  aiReason?: string;
}

// Booking Types
export interface BookingInfo {
  type: "flight" | "hotel";
  guest: Guest;
  details: FlightInfo | HotelInfo;
  status: "pending" | "confirmed" | "cancelled";
  bookingDate: string;
  affiliate?: {
    provider: string;
    commission: number;
    trackingId: string;
  };
}

// Message Types
export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  isPrivate: boolean;
  readBy: string[];
}

// Setup Wizard Types
export interface WeddingSetup {
  coverPhoto?: File | string;
  coupleName: string;
  destination: string;
  destinationCode: string;
  date: string;
  venue: string;
  coordinator: Partial<Coordinator>;
  itinerary: Omit<ItineraryItem, "id" | "isPublic">[];
  guests: Omit<Guest, "id" | "rsvp" | "travelInfo">[];
  settings: Partial<WeddingSettings>;
}

// Authentication Types
export interface GuestAuth {
  isAuthenticated: boolean;
  guestData: Guest | null;
  showLogin: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface RsvpForm {
  guestId: string;
  response: "confirmed" | "declined";
  partySize: number;
  dietaryRestrictions?: string;
  notes?: string;
}

// Analytics Types
export interface WeddingAnalytics {
  totalGuests: number;
  confirmedGuests: number;
  pendingRsvps: number;
  totalBookings: number;
  affiliateRevenue: number;
  popularDestinations: string[];
  conversionRates: {
    rsvp: number;
    booking: number;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// State Types
export interface AppState {
  currentUser: UserRole;
  currentScreen: string;
  selectedGuest: Guest | null;
  flightRecommendations: FlightRecommendation[];
  isLoading: boolean;
  error: AppError | null;
  wedding: Wedding | null;
  guestAuth: GuestAuth;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationProps extends BaseComponentProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  userRole: UserRole;
}

export interface GuestCardProps extends BaseComponentProps {
  guest: Guest;
  onEdit?: (guest: Guest) => void;
  onMessage?: (guest: Guest) => void;
  onSearchFlights?: (guest: Guest) => void;
  showActions?: boolean;
}
