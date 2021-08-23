
import { useWeb3React } from '@web3-react/core'
import { Button } from 'react-bootstrap'
import { UserProfile } from './UserProfile/UserProfile'
import { ArrowUpRight } from 'react-bootstrap-icons';


export const Hero = () => {
  const { active } = useWeb3React()

  return (
    <>
      {active ? (
        <UserProfile />
      ) : (
        <div className="bg-light text-center py-5">
          <h1>Investing in crypto, simplified</h1>
          <div className="pb-5">
            We're helping people like you to have the same returns as geeks
            through 'All in One' tokens.
          </div>
          <Button >Learn more <ArrowUpRight /></Button>
        </div>
      )}
    </>
  )
}
