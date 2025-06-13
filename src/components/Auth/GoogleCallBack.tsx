import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const success = queryParams.get('success');
        const error = queryParams.get('error');

        if (error) {
          setError(`Authentication error: ${error}`);
          setLoading(false);
          return;
        }

        if (!success || success !== 'true') {
          setError('Authentication was not successful');
          setLoading(false);
          return;
        }

        if (!token) {
          setError('No authentication token received');
          setLoading(false);
          return;
        }

        // Lưu token và redirect
        sessionStorage.setItem('accessToken', token);
        
        // Fetch user profile
        await authService.fetchAndStoreUserProfile();
        
        // Redirect to dashboard
        navigate('/thanhviennghiencuu');
        
      } catch (error: any) {
        console.error('Error handling Google callback:', error);
        setError(error.message || 'An error occurred during authentication');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1569CB]"></div>
        <p className="mt-4 text-gray-600">Processing authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate('/signin')}
          className="mt-4 px-4 py-2 bg-[#1569CB] text-white rounded hover:bg-[#1254A3]"
        >
          Return to Sign In
        </button>
      </div>
    );
  }

  return null;
};

export default GoogleCallback;