import useTokens from "../../hooks/useTokens"


export const UserBalance = () => {
    const { balance } = useTokens()

    return (
        <div className="bg-light text-center py-4">
            <p>My Balance</p>
            <h2>

                {balance}
                
                
            </h2>
        </div>
    )
}
