import { useEffect, useState } from "react";

function UserInfo() {

 interface User {
    display_name: string;
    followers: {
        total: number;
    };
    images: {
        url: string;
        height: number;
        width: number;
    }[];
    }
 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  const API_URL = import.meta.env.VITE_API_URL


  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    setLoading(true)
    const fetchUser = async () => {
        try {
            const response = await fetch(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            setUser(data);
            setLoading(false)
            
        } catch (error) {
            console.log(error);
        }
    }

    fetchUser();

  }, []);


  return (
   <section className="flex justify-between w-full p-5 mt-20 md:p-16">
  <div className="w-full p-10 text-white bg-gradient-to-tr from-purple-600 from-50% to-rose-500 to-100% rounded-md">

   
    <h1 className="pb-10 text-4xl md:text-7xl">Spotify Wrapped</h1>
   

    {loading ? (
      <div className="w-40 h-5 mb-4 rounded bg-white/20 animate-pulse"></div>
    ) : (
      <p className="text-xl">Hello {user?.display_name}</p>
    )}

    {loading ? (
      <div className="w-32 h-5 rounded bg-white/20 animate-pulse"></div>
    ) : (
      <p>Followers: {user?.followers.total}</p>
    )}

  </div>
</section>
  );
}

export default UserInfo