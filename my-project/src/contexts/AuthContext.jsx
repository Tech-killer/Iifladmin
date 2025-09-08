import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('ifl_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For direct OTP login, password may be null
      const userData = {
        email,
        role,
        name: role === 'admin' ? 'Admin User' : 'Sub-Admin User',
        id: Math.random().toString(36).substr(2, 9)
      };
      setUser(userData);
      localStorage.setItem('ifl_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const checkUserExists = async (email) => {
    try {
      // Simulate API call to check if user exists
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Demo logic: determine user type based on email
      const existingUsers = {
        'admin@example.com': { exists: true, role: 'admin' },
        'subadmin@example.com': { exists: true, role: 'sub-admin' },
        'test@admin.com': { exists: true, role: 'admin' },
        'test@subadmin.com': { exists: true, role: 'sub-admin' }
      };
      
      const userInfo = existingUsers[email.toLowerCase()];
      
      if (userInfo) {
        return { 
          success: true, 
          exists: true, 
          role: userInfo.role 
        };
      }
      
      // New user
      return { 
        success: true, 
        exists: false 
      };
      
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ifl_user');
  };

  const verifyOTP = async (email, otp) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple OTP verification (in real app, this would be server-side)
      if (otp === '123456') {
        return { success: true };
      }
      
      return { success: false, error: 'Invalid OTP' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const sendOTP = async (email) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    login,
    logout,
    verifyOTP,
    sendOTP,
    resetPassword,
    checkUserExists,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
