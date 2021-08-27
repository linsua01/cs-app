import useTokens from '../../hooks/useTokens'

export const UserBalance = () => {
  const { balance } = useTokens()

  return (
    <div className="bg-light text-center py-4">
      <p>My Total Balance</p>
      <h2>${balance.toFixed(2)}</h2>
    </div>
  )
}
