import LoginBtn from "./LoginBtn"

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen text-white bg-black">
            
            <div className="mx-auto max-w-7xl">

                <div className="space-y-10 text-center ">
                    <h1 className="text-6xl font-semibold text-white "> See your Spotify Analytics</h1>
                    <div className="text-center">
                        <LoginBtn />
                    </div>
                </div>

                
            </div>

        </div>
    )
}

export default LoginPage