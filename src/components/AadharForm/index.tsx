import React, { useState } from 'react'
import axios from 'axios'

const AadharForm = () => {
  const [aadharNumber, setAadharNumber] = useState('')
  const [refId, setRefId] = useState('')
  const [otp, setOtp] = useState('')
  const [aadharDetails, setAadharDetails] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .request({
        method: 'POST',
        url: `${process.env.VITE_VERCEL_API_ENDPOINT}api/generate-otp`,
        data: { aadhaar_number: aadharNumber }
      })
      .then(function (response) {
        setRefId(response.data.ref_id)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handleOtpVerification = (e) => {
    e.preventDefault()
    axios
      .request({
        method: 'POST',
        url: `${process.env.VITE_VERCEL_API_ENDPOINT}api/verify-otp`,
        data: { otp: otp, ref_id: refId }
      })
      .then(function (response) {
        setAadharDetails(response.data)
        alert('Aadhaar Verification Successful!')
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Aadhaar Verification</h2>

      {!refId && !aadharDetails && (
        <div>
          <p className="text-gray-600 mb-4">
            Please enter your 12-digit Aadhaar number
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              placeholder="Enter Aadhaar Number"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={12}
              pattern="\d{12}"
              title="Please enter a valid 12-digit Aadhaar number"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {refId && !aadharDetails && (
        <div>
          <p className="text-gray-600 mb-4">
            Please enter the OTP sent to your Aadhaar-linked phone number
          </p>
          <form onSubmit={handleOtpVerification}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              pattern="\d{6}"
              title="Please enter a valid 6-digit OTP"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}

      {!!aadharDetails && (
        <div className="mt-6 relative">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-2xl overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-white-800 mb-4">
              Aadhar Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-white-500 opacity-75">Name</p>
                <p className="mt-1 text-lg font-semibold text-white-900">
                  {aadharDetails.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-white-500 opacity-75">
                  Date of Birth
                </p>
                <p className="mt-1 text-lg font-semibold text-white-900">
                  {aadharDetails.dob}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-white-500 opacity-75">Gender</p>
                <p className="mt-1 text-lg font-semibold text-white-900">
                  {aadharDetails.gender}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-white-500 opacity-75">S/O</p>
                <p className="mt-1 text-lg font-semibold text-white-900">
                  {aadharDetails.care_of}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-white-500 opacity-75">Address</p>
                <p className="mt-1 text-lg font-semibold text-white-900">
                  {aadharDetails.address}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium font-semibold text-white-500 opacity-75">
                  Aadhar Number
                </p>
                <p className="mt-1 text-lg font-semibold text-white-900">{aadharNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div
        className="absolute top-4 right-4 w-64 p-4 rounded-md shadow-lg transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: aadharDetails
            ? 'rgba(0, 200, 0, 0.9)'
            : 'rgba(200, 0, 0, 0.9)'
        }}
      >
        <div className="flex items-center">
          {aadharDetails ? (
            <svg
              className="w-6 h-6 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
          <p className="text-white font-semibold">
            {aadharDetails ? 'Success' : 'Error'}
          </p>
        </div>
        <p className="text-white mt-1">
          {aadharDetails
            ? 'Aadhar Verified successfully!'
            : 'Failed to fetch details. Please try again.'}
        </p>
      </div> */}
    </div>
  )
}

export default AadharForm
