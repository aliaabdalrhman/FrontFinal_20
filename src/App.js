import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {router} from './Layouts/Routes.jsx'


export default function App() {

  return (
      <RouterProvider router={router} ></RouterProvider>

  )
}
