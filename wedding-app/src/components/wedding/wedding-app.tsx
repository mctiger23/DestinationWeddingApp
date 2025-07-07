"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  AppState,
  UserRole,
  Wedding,
  Guest,
  GuestAuth,
  FlightRecommendation,
  AppError,
} from "@/lib/types";

// Sample wedding data
const sampleWedding: Wedding = {
  id: "1",
  coupleName: "Sarah & Mike",
  destination: "Santorini, Greece",
  destinationCode: "JTR",
  date: "2025-10-15",
  venue: "Sunset Villa Resort",
  coordinator: {
    name: "Jessica Smith",
    email: "jessica@weddingplanning.com",
    phone: "+1-555-0199",
  },
  itinerary: [
    {
      id: "1",
      time: "14:00",
      activity: "Guest Check-in & Welcome Drinks",
      location: "Hotel Lobby",
      isPublic: true,
    },
    {
      id: "2",
      time: "16:30",
      activity: "Ceremony",
      location: "Sunset Terrace",
      isPublic: true,
    },
    {
      id: "3",
      time: "17:30",
      activity: "Cocktail Hour",
      location: "Garden Patio",
      isPublic: true,
    },
    {
      id: "4",
      time: "19:00",
      activity: "Reception & Dinner",
      location: "Main Ballroom",
      isPublic: true,
    },
    {
      id: "5",
      time: "22:00",
      activity: "Dancing & Celebration",
      location: "Dance Floor",
      isPublic: true,
    },
  ],
  guests: [
    {
      id: "1",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@email.com",
      phone: "+1-555-0123",
      rsvp: "confirmed",
      from: "New York",
      fromCode: "NYC",
      budget: "$800-1200",
      allowedGuests: 2,
      partyMembers: [
        { name: "Sarah Johnson", relation: "self" },
        { name: "Plus One", relation: "plus-one" },
      ],
    },
    {
      id: "2",
      firstName: "Mike",
      lastName: "Chen",
      email: "mike@email.com",
      phone: "+1-555-0456",
      rsvp: "pending",
      from: "Los Angeles",
      fromCode: "LAX",
      budget: "$600-900",
      allowedGuests: 1,
      partyMembers: [{ name: "Mike Chen", relation: "self" }],
    },
    {
      id: "3",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily@email.com",
      phone: "+1-555-0789",
      rsvp: "confirmed",
      from: "Chicago",
      fromCode: "CHI",
      budget: "$700-1000",
      allowedGuests: 4,
      partyMembers: [
        { name: "Emily Davis", relation: "self" },
        { name: "John Davis", relation: "spouse" },
        { name: "Emma Davis", relation: "child" },
        { name: "Ethan Davis", relation: "child" },
      ],
    },
  ],
  settings: {
    allowGuestMessaging: true,
    allowTravelSharing: true,
    timeZone: "Europe/Athens",
    currency: "EUR",
  },
};

// Initial state
const initialState: AppState = {
  currentUser: "couple",
  currentScreen: "home",
  selectedGuest: null,
  flightRecommendations: [],
  isLoading: false,
  error: null,
  wedding: sampleWedding,
  guestAuth: {
    isAuthenticated: false,
    guestData: null,
    showLogin: false,
  },
};

// Action types
type WeddingAction =
  | { type: "SET_USER_ROLE"; payload: UserRole }
  | { type: "SET_CURRENT_SCREEN"; payload: string }
  | { type: "SET_SELECTED_GUEST"; payload: Guest | null }
  | { type: "SET_FLIGHT_RECOMMENDATIONS"; payload: FlightRecommendation[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: AppError | null }
  | { type: "SET_GUEST_AUTH"; payload: GuestAuth }
  | { type: "UPDATE_WEDDING"; payload: Partial<Wedding> }
  | { type: "UPDATE_GUEST"; payload: Guest }
  | { type: "ADD_GUEST"; payload: Guest }
  | { type: "REMOVE_GUEST"; payload: string };

// Reducer
function weddingReducer(state: AppState, action: WeddingAction): AppState {
  switch (action.type) {
    case "SET_USER_ROLE":
      return {
        ...state,
        currentUser: action.payload,
        guestAuth:
          action.payload === "guest"
            ? { ...state.guestAuth, showLogin: true }
            : { isAuthenticated: false, guestData: null, showLogin: false },
      };

    case "SET_CURRENT_SCREEN":
      return { ...state, currentScreen: action.payload };

    case "SET_SELECTED_GUEST":
      return { ...state, selectedGuest: action.payload };

    case "SET_FLIGHT_RECOMMENDATIONS":
      return { ...state, flightRecommendations: action.payload };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_GUEST_AUTH":
      return { ...state, guestAuth: action.payload };

    case "UPDATE_WEDDING":
      return {
        ...state,
        wedding: state.wedding ? { ...state.wedding, ...action.payload } : null,
      };

    case "UPDATE_GUEST":
      return {
        ...state,
        wedding: state.wedding
          ? {
              ...state.wedding,
              guests: state.wedding.guests.map((guest) =>
                guest.id === action.payload.id ? action.payload : guest
              ),
            }
          : null,
      };

    case "ADD_GUEST":
      return {
        ...state,
        wedding: state.wedding
          ? {
              ...state.wedding,
              guests: [...state.wedding.guests, action.payload],
            }
          : null,
      };

    case "REMOVE_GUEST":
      return {
        ...state,
        wedding: state.wedding
          ? {
              ...state.wedding,
              guests: state.wedding.guests.filter(
                (guest) => guest.id !== action.payload
              ),
            }
          : null,
      };

    default:
      return state;
  }
}

// Context type
interface WeddingContextType {
  state: AppState;
  setUserRole: (role: UserRole) => void;
  setCurrentScreen: (screen: string) => void;
  setSelectedGuest: (guest: Guest | null) => void;
  setFlightRecommendations: (recommendations: FlightRecommendation[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AppError | null) => void;
  setGuestAuth: (auth: GuestAuth) => void;
  updateWedding: (wedding: Partial<Wedding>) => void;
  updateGuest: (guest: Guest) => void;
  addGuest: (guest: Guest) => void;
  removeGuest: (guestId: string) => void;
  authenticateGuest: (identifier: string) => boolean;
  searchFlights: (guest: Guest, mode: "affiliate" | "ai") => Promise<void>;
}

// Create context
const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

// Provider component
export function WeddingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(weddingReducer, initialState);

  // Action creators
  const setUserRole = useCallback((role: UserRole) => {
    dispatch({ type: "SET_USER_ROLE", payload: role });
  }, []);

  const setCurrentScreen = useCallback((screen: string) => {
    dispatch({ type: "SET_CURRENT_SCREEN", payload: screen });
  }, []);

  const setSelectedGuest = useCallback((guest: Guest | null) => {
    dispatch({ type: "SET_SELECTED_GUEST", payload: guest });
  }, []);

  const setFlightRecommendations = useCallback(
    (recommendations: FlightRecommendation[]) => {
      dispatch({
        type: "SET_FLIGHT_RECOMMENDATIONS",
        payload: recommendations,
      });
    },
    []
  );

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error: AppError | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const setGuestAuth = useCallback((auth: GuestAuth) => {
    dispatch({ type: "SET_GUEST_AUTH", payload: auth });
  }, []);

  const updateWedding = useCallback((wedding: Partial<Wedding>) => {
    dispatch({ type: "UPDATE_WEDDING", payload: wedding });
  }, []);

  const updateGuest = useCallback((guest: Guest) => {
    dispatch({ type: "UPDATE_GUEST", payload: guest });
  }, []);

  const addGuest = useCallback((guest: Guest) => {
    dispatch({ type: "ADD_GUEST", payload: guest });
  }, []);

  const removeGuest = useCallback((guestId: string) => {
    dispatch({ type: "REMOVE_GUEST", payload: guestId });
  }, []);

  // Guest authentication
  const authenticateGuest = useCallback(
    (identifier: string): boolean => {
      if (!state.wedding) return false;

      const guest = state.wedding.guests.find(
        (g) =>
          g.firstName.toLowerCase() === identifier.toLowerCase() ||
          g.lastName.toLowerCase() === identifier.toLowerCase() ||
          g.email.toLowerCase() === identifier.toLowerCase() ||
          g.phone === identifier ||
          `${g.firstName} ${g.lastName}`.toLowerCase() ===
            identifier.toLowerCase()
      );

      if (guest) {
        setGuestAuth({
          isAuthenticated: true,
          guestData: guest,
          showLogin: false,
        });
        return true;
      }
      return false;
    },
    [state.wedding, setGuestAuth]
  );

  // Flight search simulation
  const searchFlights = useCallback(
    async (guest: Guest, mode: "affiliate" | "ai") => {
      if (!state.wedding) return;

      setLoading(true);
      setSelectedGuest(guest);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (mode === "affiliate") {
          const affiliateRecommendations: FlightRecommendation[] = [
            {
              id: "1",
              provider: "Expedia",
              type: "affiliate",
              searchUrl: `https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:${guest.fromCode},to:${state.wedding.destinationCode}&d1=${state.wedding.date}&affiliateId=YOUR_ID`,
              previewData: {
                airline: "Multiple Airlines",
                priceRange: guest.budget,
                description: "Compare flights from top airlines",
                commission: "3-4%",
              },
            },
            {
              id: "2",
              provider: "Kayak",
              type: "affiliate",
              searchUrl: `https://www.kayak.com/flights/${guest.fromCode}-${state.wedding.destinationCode}/${state.wedding.date}?affiliateId=YOUR_ID`,
              previewData: {
                airline: "Price Comparison",
                priceRange: guest.budget,
                description: "Find the best deals across sites",
                commission: "$1-3 per click",
              },
            },
            {
              id: "3",
              provider: "Booking.com",
              type: "affiliate",
              searchUrl: `https://www.booking.com/flights/?affiliateId=YOUR_ID&from=${guest.fromCode}&to=${state.wedding.destinationCode}&departure=${state.wedding.date}`,
              previewData: {
                airline: "Global Options",
                priceRange: guest.budget,
                description: "Worldwide flight inventory",
                commission: "2-3%",
              },
            },
          ];
          setFlightRecommendations(affiliateRecommendations);
        } else {
          const aiRecommendations: FlightRecommendation[] = [
            {
              id: "1",
              provider: "AI Recommendation",
              type: "ai",
              previewData: {
                airline: "Delta",
                price: "$850",
                duration: "12h 45m",
                stops: "1 stop",
                description: "AI-optimized route",
                aiScore: 95,
                aiReason: "Best value for your budget range with good timing",
              },
            },
            {
              id: "2",
              provider: "AI Recommendation",
              type: "ai",
              previewData: {
                airline: "American Airlines",
                price: "$920",
                duration: "11h 20m",
                stops: "1 stop",
                description: "Faster alternative",
                aiScore: 88,
                aiReason: "Faster flight time, slightly over budget",
              },
            },
          ];
          setFlightRecommendations(aiRecommendations);
        }
      } catch (error) {
        setError({
          code: "FLIGHT_SEARCH_ERROR",
          message: "Failed to search for flights",
          details: error,
        });
      } finally {
        setLoading(false);
      }
    },
    [
      state.wedding,
      setLoading,
      setSelectedGuest,
      setFlightRecommendations,
      setError,
    ]
  );

  const value: WeddingContextType = {
    state,
    setUserRole,
    setCurrentScreen,
    setSelectedGuest,
    setFlightRecommendations,
    setLoading,
    setError,
    setGuestAuth,
    updateWedding,
    updateGuest,
    addGuest,
    removeGuest,
    authenticateGuest,
    searchFlights,
  };

  return (
    <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>
  );
}

// Custom hook to use the context
export function useWedding() {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error("useWedding must be used within a WeddingProvider");
  }
  return context;
}
