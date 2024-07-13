import React, { useState } from 'react'
import AsideBar from './AsideBar'

function Home() {
 const [showSideBar,setShowSideBar]=useState(false)
  return (
    <>
      <nav>
        <img src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=" alt=""/>
      </nav>
      <AsideBar/>
    </>
  )
}

export default Home