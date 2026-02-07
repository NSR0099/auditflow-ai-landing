// Simple auth state management (UI-only, no backend yet)
import { useState, useEffect, useCallback } from "react";

export interface UserProfile {
  ownerName: string;
  businessName: string;
  email: string;
  phone: string;
  registrationNo: string;
  location: string;
}

const AUTH_KEY = "vyaparai_auth";
const PROFILE_KEY = "vyaparai_profile";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  });

  useEffect(() => {
    // Sync if needed, or remove this effect if state is fully manged by login/logout
  }, []);

  const login = useCallback((profile: UserProfile) => {
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setIsLoggedIn(true);
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(PROFILE_KEY);
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { isLoggedIn, user, login, logout, updateProfile };
}

// Mock signup database stored in localStorage
const SIGNUPS_KEY = "vyaparai_signups";

export interface SignupRecord {
  ownerName: string;
  businessName: string;
  email: string;
  phone: string;
  registrationNo: string;
  location: string;
  password: string;
}

export function getSignups(): SignupRecord[] {
  const data = localStorage.getItem(SIGNUPS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addSignup(record: SignupRecord) {
  const signups = getSignups();
  signups.push(record);
  localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signups));
}

export function lookupBusiness(registrationNo: string): string | null {
  const signups = getSignups();
  const match = signups.find(s => s.registrationNo === registrationNo);
  return match ? match.businessName : null;
}
