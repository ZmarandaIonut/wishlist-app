import React from 'react'
import GoHome from '../../Utils/goHome/GoHome'
import LogOut from '../../Utils/Logout/LogOut'

export default function NotFound() {
  return (
    <div className='not_found_page'>
        <GoHome/>
        <LogOut/>
        <div className='not_found_container'>
            <p>Sorry, we couldn't find this page.</p>
        </div>

    </div>
  )
}
