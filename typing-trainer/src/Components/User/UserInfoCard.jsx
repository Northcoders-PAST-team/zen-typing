import React from 'react'
import Avatar from '../../images/avatar.webp'

const UserInfoCard = () => {
  return (
    <div className="user-InfoCard">
        <img src={Avatar} alt="" className='user-avatar'/>
        <div className="user-options">

        </div>
        <div className="user-friends">

        </div>
    </div>
  )
}

export default UserInfoCard