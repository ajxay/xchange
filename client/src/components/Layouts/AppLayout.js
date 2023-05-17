import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='bg-white'>
        app layout
        <Outlet/>
    </div>
  )
}

export default AppLayout