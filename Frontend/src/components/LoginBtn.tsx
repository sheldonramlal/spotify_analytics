function Login() {

  const API_URL = import.meta.env.VITE_API_URL
  const handleLogin = () => {
    window.location.href = `${API_URL}/login`;
  };

  return (
    <button onClick={handleLogin} className="px-4 py-3 text-white bg-[#1DB954] rounded-lg">
      Login with Spotify
    </button>
  );
}

export default Login;