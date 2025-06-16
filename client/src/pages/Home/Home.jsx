import { useEffect } from "react"
import { getCurrentUser } from "../../api/user"

const Home = () => {

    useEffect(() => {

        async function fetchCurrentUser() {
            const res = await getCurrentUser();
        }

        fetchCurrentUser();
    }, [])
    return (
        <div>
            Home Page
        </div>
    )
}

export default Home
