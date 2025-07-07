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

// Create and export the WeddingContext
type WeddingContextType = {
  state: AppState;
  dispatch: React.Dispatch<WeddingAction>;
};

export const WeddingContext = createContext<WeddingContextType | undefined>(
  undefined
);

// Provider component
export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(weddingReducer, initialState);

  return (
    <WeddingContext.Provider value={{ state, dispatch }}>
      {children}
    </WeddingContext.Provider>
  );
};

// Custom hook to use the context
export function useWedding() {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error("useWedding must be used within a WeddingProvider");
  }
  return context;
}
