function Login() {
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/login";
  };

  return (
    <button onClick={handleLogin} className="px-4 py-3 text-white bg-[#1DB954] rounded-lg">
      Login with Spotify
    </button>
  );
}

export default Login;