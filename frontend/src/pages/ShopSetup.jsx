import React, { useState } from 'react';

const SetupShopPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [shopName, setShopName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const vehicles = [
    { id: 1, name: "Active - Honda", mileage: "50m/L/r", range: "120km", power: "400cc" },
    { id: 2, name: "Active - Honda", mileage: "50m/L/r", range: "120km", power: "400cc" },
    { id: 3, name: "Active - Honda", mileage: "50m/L/r", range: "120km", power: "400cc" },
    { id: 4, name: "Active - Honda", mileage: "50m/L/r", range: "120km", power: "400cc" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Setup your Shop</h1>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="space-y-8">
          {/* Basic Details Section */}
          <section className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-xl font-semibold mb-6">Basic Details</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-lg">Shop Name</span>
              </div>

              <div className="flex items-center space-x-4">
                <input 
                  type="checkbox" 
                  checked
                  readOnly
                  className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-lg">Contact No</span>
              </div>

              <div className="flex items-center space-x-4">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-lg">GST No</span>
              </div>
            </div>

            {/* Vehicle Types */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Vehicle Types</h3>
              <div className="flex space-x-4">
                <span className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Bike</span>
                <span className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Scooty</span>
                <span className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Car</span>
              </div>
            </div>

            {/* Upload Documents */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">Upload GST Bill</span>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className={`h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

          {/* Vehicle Listing Section */}
          <section className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-xl font-semibold mb-6">Vehicle Listing</h2>
            
            <div className="flex space-x-4 mb-6">
              <span className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Bike</span>
              <span className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Scooty</span>
            </div>

            {/* Vehicle Cards */}
            <div className="space-y-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className={`p-6 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          Mileage: <span className={darkMode ? 'text-white' : 'text-gray-900'}>{vehicle.mileage}</span>
                        </p>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          Range: <span className={darkMode ? 'text-white' : 'text-gray-900'}>{vehicle.range}</span>
                        </p>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          Power: <span className={darkMode ? 'text-white' : 'text-gray-900'}>{vehicle.power}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                          Status
                        </span>
                      </div>
                      <button className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Location Details Section */}
          <section className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-xl font-semibold mb-6">Location Details</h2>
            
            <button className={`w-full py-4 mb-6 rounded-lg border-2 border-dashed flex items-center justify-center space-x-2 ${
              darkMode 
                ? 'border-gray-600 hover:border-gray-500' 
                : 'border-gray-300 hover:border-gray-400'
            } transition-colors`}>
              <span className="text-2xl">+</span>
              <span>Set Location</span>
            </button>

            <h3 className="text-lg font-medium mb-4">Address Details</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Address Line', value: addressLine, setter: setAddressLine },
                { label: 'City', value: city, setter: setCity },
                { label: 'State', value: state, setter: setState },
                { label: 'Pin', value: pin, setter: setPin }
              ].map((field) => (
                <div key={field.label} className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-lg w-32">{field.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Add Vehicle Section */}
          <section className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <button className={`w-full py-4 mb-6 rounded-lg border-2 border-dashed flex items-center justify-center space-x-2 ${
              darkMode 
                ? 'border-gray-600 hover:border-gray-500' 
                : 'border-gray-300 hover:border-gray-400'
            } transition-colors`}>
              <span className="text-2xl">+</span>
              <span>Add Vehicle</span>
            </button>

            <div className="flex space-x-4 mb-6">
              <span className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Car</span>
            </div>

            {/* Additional Vehicle Card */}
            <div className={`p-6 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Active - Honda</h3>
                  <div className="mt-2 space-y-1">
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Mileage: <span className={darkMode ? 'text-white' : 'text-gray-900'}>50m/L/r</span>
                    </p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Range: <span className={darkMode ? 'text-white' : 'text-gray-900'}>120km</span>
                    </p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Power: <span className={darkMode ? 'text-white' : 'text-gray-900'}>400cc</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                      Status
                    </span>
                  </div>
                  <button className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    Details
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SetupShopPage;