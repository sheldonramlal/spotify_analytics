
function Logout() {
    
    const handleLogout = () => {
        localStorage.removeItem("jwt_token");
        window.location.href = "/"
    }

    return (
        <button onClick={handleLogout} className="px-4 py-3 font-semibold text-black bg-white rounded-md h-fit">
            <p>Log out</p>
        </button>
    )
}

export default Logout;