import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
} from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  birthDate: string;
  birthTime: string;
  birthLocation?: string;
}

interface UserProfile {
  fullName: string;
  birthDate: string;
  birthTime: string;
  birthLocation?: string;
  emailVerified: boolean;
  createdAt: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        throw new Error('Please verify your email before signing in');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUp = async (userData: SignUpData) => {
    try {
      // Create user account
      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Update user profile
      await updateProfile(result.user, {
        displayName: userData.fullName,
      });

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        fullName: userData.fullName,
        birthDate: userData.birthDate,
        birthTime: userData.birthTime,
        birthLocation: userData.birthLocation,
        emailVerified: false,
        createdAt: Date.now(),
      };

      await setDoc(doc(db, 'users', result.user.uid), userProfile);

      // Send verification email
      await sendEmailVerification(result.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resendVerificationEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}