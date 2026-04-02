import LoginBtn from "./LoginBtn"
import icon from "../assets/icon.png"

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen text-white bg-black">
            
            <div className="px-5 mx-auto max-w-7xl">

                <div className="space-y-10 text-center ">
                    <h1 className="text-6xl font-semibold text-white "> See your Spotify Analytics</h1>
                    <div className="text-center">
                        <LoginBtn />
                    </div>
                </div>

                <div className="flex p-4 mt-10 space-x-4 rounded-md place-items-center bg-yellow-500/30">
                    <img src={icon} alt="" className="h-8" />
                    <p className="text-white">Access is currently limited. <span className="font-semibold underline"><a href="mailto:sheldonramlal99@gmail.com?subject=Spotify%20Analytics%20Website%20Request&body=Hi,%0A%0AI%20would%20like%20to%20request%20access%20to%20the%20Spotify%20Analytics%20website.%0A%0AName:%20%0AEmail:%20%0A%0AThank%20you.">
  Request Access
</a></span> to get started, or <span className="font-semibold underline"> <a href="https://youtu.be/7ttSj3j15MY" target="_blank" rel="noopener noreferrer">watch a demo</a></span> of the platform.</p>
                </div>

                
            </div>

        </div>
    )
}

export default LoginPage