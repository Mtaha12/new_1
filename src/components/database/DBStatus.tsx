'use client';

import { useState, useEffect } from 'react';

interface DBStatus {
  status: string;
  message: string;
  database?: string;
  collections?: string[];
  connectionState?: number;
}

export default function DBStatus() {
  const [status, setStatus] = useState<DBStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const checkConnection = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/connection');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setStatus({
        status: 'error',
        message: 'Failed to check database connection'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const addSampleData = async () => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: 'welcome-content',
          en: {
            title: 'Welcome to Our Platform',
            description: 'This is a sample welcome content in English',
            content: 'We provide excellent multilingual digital solutions for your business needs.'
          },
          ar: {
            title: 'مرحبا بكم في منصتنا',
            description: 'هذا محتوى ترحيبي عربي تجريبي',
            content: 'نقدم حلول رقمية متعددة اللغات ممتازة لاحتياجات عملك.'
          },
          category: 'page'
        })
      });

      const data = await response.json();
      alert(data.message);
      checkConnection(); // Refresh status
    } catch (error) {
      alert('Failed to add sample data');
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-blue-700">Checking database connection...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg ${
      status?.status === 'success' 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            status?.status === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}></div>
          <div>
            <p className={`font-medium ${
              status?.status === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {status?.message}
            </p>
            {status?.database && (
              <p className="text-sm text-gray-600">
                Database: {status.database} | 
                Collections: {status.collections?.length || 0} | 
                State: {status.connectionState === 1 ? 'Connected' : 'Disconnected'}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={checkConnection}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={addSampleData}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Add Sample Data
          </button>
        </div>
      </div>
    </div>
  );
}