import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorElement = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Une erreur est survenue.</h1>
      <p className="text-lg text-gray-700 mb-4">Nous sommes désolés, mais une erreur s'est produite.</p>
      <p className="text-lg text-gray-700 mb-4">Retournez à <button onClick={()=> window.history.back()}  className="text-blue-600 hover:text-red-500">Retour</button>.</p>
    </div>
  </div>
  )
}
