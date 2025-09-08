import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, User, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [step, setStep] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // No new user logic needed for direct OTP login

  const { sendOTP, verifyOTP, login, checkUserExists } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await sendOTP(formData.email);
    
    if (result.success) {
      setStep('otp');
    } else {
      setError(result.error || 'Failed to send OTP');
    }
    
    setLoading(false);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await verifyOTP(formData.email, formData.otp);
    
    if (result.success) {
      // Check user role and log in directly
      const userCheck = await checkUserExists(formData.email);
      if (userCheck.success && userCheck.exists) {
        // Direct login for existing user
        const loginResult = await login(formData.email, null, userCheck.role);
        if (loginResult.success) {
          navigate('/');
        } else {
          setError(loginResult.error || 'Login failed');
        }
      } else {
        setError('User not found or invalid email');
      }
    } else {
      setError(result.error || 'Invalid OTP');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">IFL Admin Portal</h1>
            <p className="text-gray-600 mt-2">
              {step === 'email' && 'Enter your email to continue'}
              {step === 'otp' && 'Verify your email address'}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${step === 'email' ? 'bg-blue-600' : 'bg-green-500'}`}></div>
              <div className={`w-8 h-0.5 ${step === 'otp' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email Step */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800 font-medium mb-2">Demo Login Options:</p>
                  <div className="text-xs text-blue-700 space-y-1">
                    <div><strong>Admin:</strong> admin@example.com</div>
                    <div><strong>Sub-Admin:</strong> subadmin@example.com</div>
                    <div><strong>OTP:</strong> 123456</div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <form onSubmit={handleOTPSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the 6-digit code sent to <strong>{formData.email}</strong>
                </p>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    Verify OTP
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={() => sendOTP(formData.email)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Resend
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;