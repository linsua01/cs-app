import React from 'react'
import { UserBalance } from './UserBalance'
import { UserTokens } from './UserTokens'

export const UserProfile = () => {
    return (
        <div>
            <UserBalance />
            <UserTokens />
        </div>
    )
}
