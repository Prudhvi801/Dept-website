'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function AlertsAdminPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isNewAlert: true,
    active: true
  });
  
  // Fetch alerts data
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/alerts');
      const data = await response.json();
      
      if (data.success) {
        setAlerts(data.data);
      } else {
        setError('Failed to load alerts');
      }
    } catch (error) {
      setError('Error fetching alerts: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAlerts();
  }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Reset form to default values
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      isNewAlert: true,
      active: true
    });
    setIsEditing(false);
    setCurrentAlert(null);
  };
  
  // Submit form to create or update an alert
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing && currentAlert) {
        // Update existing alert
        const response = await fetch(`/api/alerts/${currentAlert._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Update the alerts list with the updated alert
          setAlerts(alerts.map(alert => 
            alert._id === currentAlert._id ? data.data : alert
          ));
          resetForm();
        } else {
          setError('Failed to update alert: ' + data.message);
        }
      } else {
        // Create new alert
        const response = await fetch('/api/alerts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Add the new alert to the list
          setAlerts([data.data, ...alerts]);
          resetForm();
        } else {
          setError('Failed to create alert: ' + data.message);
        }
      }
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    }
  };
  
  // Edit an existing alert
  const handleEdit = (alert) => {
    setIsEditing(true);
    setCurrentAlert(alert);
    setFormData({
      title: alert.title,
      content: alert.content,
      isNewAlert: alert.isNewAlert,
      active: alert.active
    });
  };
  
  // Delete an alert
  const handleDelete = async (alertId) => {
    if (!window.confirm('Are you sure you want to delete this alert?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the deleted alert from the list
        setAlerts(alerts.filter(alert => alert._id !== alertId));
      } else {
        setError('Failed to delete alert: ' + data.message);
      }
    } catch (error) {
      setError('Error deleting alert: ' + error.message);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Alerts</h1>
      
      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-6">
          {error}
        </div>
      )}
      
      {/* Alert Form */}
      <div className="bg-secondary-blue p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Alert' : 'Create New Alert'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              value={formData.title}
              onChange={handleChange}
              maxLength={60}
              required
            />
            <div className="text-sm text-gray-400 mt-1">
              {formData.title.length}/60 characters
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="3"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              value={formData.content}
              onChange={handleChange}
              maxLength={200}
              required
            ></textarea>
            <div className="text-sm text-gray-400 mt-1">
              {formData.content.length}/200 characters
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <input
                id="isNewAlert"
                name="isNewAlert"
                type="checkbox"
                className="h-4 w-4 text-accent-blue bg-gray-800 border-gray-700 rounded focus:ring-accent-blue"
                checked={formData.isNewAlert}
                onChange={handleChange}
              />
              <label className="ml-2 text-white" htmlFor="isNewAlert">
                Mark as New
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="active"
                name="active"
                type="checkbox"
                className="h-4 w-4 text-accent-blue bg-gray-800 border-gray-700 rounded focus:ring-accent-blue"
                checked={formData.active}
                onChange={handleChange}
              />
              <label className="ml-2 text-white" htmlFor="active">
                Active
              </label>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="py-2 px-4 bg-accent-blue text-primary-blue rounded font-bold hover:opacity-90 transition-opacity"
            >
              {isEditing ? 'Update Alert' : 'Create Alert'}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-4 bg-gray-600 text-white rounded font-bold hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Alerts List */}
      <div className="bg-secondary-blue p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Current Alerts</h2>
        
        {loading ? (
          <div className="text-center py-4">Loading alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-4 text-gray-400">No alerts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {alerts.map((alert) => (
                  <tr key={alert._id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{alert.title}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-300">
                        {alert.content.length > 50
                          ? `${alert.content.substring(0, 50)}...`
                          : alert.content}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{formatDate(alert.date)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        {alert.isNewAlert && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                            New
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.active
                              ? 'bg-green-600 text-white'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {alert.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(alert)}
                          className="text-blue-500 hover:text-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(alert._id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}