'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch alerts when the component mounts
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/alerts');
        const data = await response.json();
        
        if (data.success) {
          // Filter only active alerts
          const activeAlerts = data.data.filter(alert => alert.active);
          
          // Sort by date, newest first
          activeAlerts.sort((a, b) => new Date(b.date) - new Date(a.date));
          
          // Only take the first 3 (or however many you want to display)
          const recentAlerts = activeAlerts.slice(0, 3);
          
          setAlerts(recentAlerts);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Section */}
      <header className="min-h-screen bg-primary-blue relative">
        <nav className="flex justify-between items-center p-6 bg-secondary-blue bg-opacity-95 fixed w-full z-10">
          <div className="flex items-center gap-2 text-accent-blue font-bold text-2xl">
            <span>Dept Of CSE</span>
          </div>
          
          <ul className="hidden md:flex gap-8">
            <li><a href="#" className="text-white hover:text-accent-blue transition-colors">Home</a></li>
            <li><a href="#about" className="text-white hover:text-accent-blue transition-colors">About</a></li>
            <li><a href="#dashboard" className="text-white hover:text-accent-blue transition-colors">Dashboard</a></li>
            <li><a href="#events" className="text-white hover:text-accent-blue transition-colors">Events</a></li>
            <li><a href="#contact" className="text-white hover:text-accent-blue transition-colors">Contact</a></li>
          </ul>
          
          <div className="md:hidden">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center text-center p-6 h-screen relative z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white relative z-10">Department of CSE</h1>
          <h2 className="text-xl md:text-2xl text-accent-blue mb-8 relative z-10">Brought to you by ACSESS Students Forum</h2>
          <Link href="/admin/alerts" className="px-6 py-3 bg-accent-blue text-primary-blue font-bold rounded hover:opacity-90 transition-opacity relative z-10">
            Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Notifications Section */}
      <section id="notifications" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Latest Alerts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-white">Loading alerts...</div>
            ) : alerts.length === 0 ? (
              <div className="col-span-full text-center text-white">No alerts available.</div>
            ) : (
              alerts.map((alert) => (
                <div key={alert._id} className="bg-secondary-blue p-6 rounded-lg shadow-lg relative">
                  {alert.isNewAlert && (
                    <span className="absolute -top-3 -right-3 bg-accent-blue text-primary-blue px-4 py-1 rounded-full font-bold">
                      New!
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-3 text-white">{alert.title}</h3>
                  <p className="text-gray-300 mb-4">{alert.content}</p>
                  <div className="text-sm text-gray-400">{formatDate(alert.date)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-secondary-blue">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">About Our Club</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-primary-blue h-64 rounded-lg flex items-center justify-center">
              <p className="text-accent-blue">Club Image Placeholder</p>
            </div>
            
            <div>
              <p className="text-white mb-6">
                ASCESS is the official technical club of Computer Science Department. We organize technical
                workshops, hackathons, and skill development sessions.
              </p>
              
              <div className="flex gap-12">
                <div className="text-center">
                  <p className="text-3xl text-accent-blue font-bold">10+</p>
                  <p className="text-white">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-accent-blue font-bold">5+</p>
                  <p className="text-white">Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary-blue p-8 rounded-lg text-center">
              <div className="text-accent-blue text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Event Calendar</h3>
              <p className="text-gray-300">View upcoming events and schedules</p>
            </div>
            
            <div className="bg-secondary-blue p-8 rounded-lg text-center">
              <div className="text-accent-blue text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Achievements</h3>
              <p className="text-gray-300">See our recent accomplishments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-blue py-8 px-6 text-center">
        <p className="text-white">© {new Date().getFullYear()} ASCESS - Department of Computer Science and Engineering</p>
      </footer>
    </div>
  );
}