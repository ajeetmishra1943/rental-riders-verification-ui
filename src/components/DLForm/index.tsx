import React, { useState } from 'react'
import axios from 'axios'

const options = {
  method: 'POST',
  url: `${process.env.VITE_VERCEL_API_ENDPOINT}/api/verify-dl`
}

const DLForm = () => {
  const [dlNumber, setDLNumber] = useState('')
  const [dob, setDob] = useState('')
  const [dlDetails, setDlDetails] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .request({ ...options, data: { dl_number: dlNumber, dob } })
      .then((response) => {
        setDlDetails(response.data) // Set the fetched data to state
        setError('') // Clear any previous errors
      })
      .catch((error) => {
        setError('Error fetching details. Please try again.')
        setDlDetails(null) // Clear details if there's an error
      })
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Driving License Verification</h2>
      <p className="text-gray-600 mb-4">
        Please enter your driving license details
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Enter Date of Birth"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={dlNumber}
          onChange={(e) => setDLNumber(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Driving License Number"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display DL Details if available */}
      {dlDetails && (
        <div className="max-w-md mx-auto mt-8 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Driving License</h3>
              <img
                src={dlDetails.details_of_driving_licence.photo}
                alt="Image"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-75">License Number</p>
                <p className="font-semibold">{dlDetails.dl_number}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Name</p>
                <p className="font-semibold">
                  {dlDetails.details_of_driving_licence.name}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-75">Father/Husband Name</p>
                <p className="font-semibold">
                  {dlDetails.details_of_driving_licence.father_or_husband_name}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-75">Date of Birth</p>
                <p className="font-semibold">{dlDetails.dob}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-red-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-75">Issue Date</p>
                <p className="font-semibold">
                  {dlDetails.details_of_driving_licence.date_of_issue}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-75">Non-Transport Expiry Date</p>
                <p className="font-semibold">
                  {dlDetails.dl_validity.non_transport?.to || 'Not Available'}
                </p>
              </div>

              <div>
                <p className="text-sm opacity-75">Transport Expiry Date</p>
                <p className="font-semibold">
                  {dlDetails.dl_validity.transport?.to || 'Not Available'}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-75">Class of Vehicle</p>
                <p className="font-semibold">
                  {dlDetails.badge_details[0].class_of_vehicle[0] +
                    ', ' +
                    dlDetails.badge_details[0].class_of_vehicle[1]}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-75">License Type</p>
                <p className="font-semibold">
                  {dlDetails.dl_validity.transport.to
                    ? 'Transport'
                    : 'Non Transport'}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm opacity-75">Status</p>
              <p className="font-semibold">
                {dlDetails.details_of_driving_licence.status}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-75">Address</p>
              {dlDetails.details_of_driving_licence.address_list.map(
                (address, index) => (
                  <div key={index}>
                    <p className="font-semibold">{address.complete_address}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DLForm
