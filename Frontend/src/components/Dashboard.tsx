import UserInfo from "./UserInfo";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import RecentlyPlayed from "./RecentlyPlayed"
import Menu from "./Menu";

function Dashboard() {
  const params = new URLSearchParams(window.location.search);
  const jwt_token = params.get("token")

  
  if(jwt_token) {
   localStorage.setItem("jwt_token", jwt_token || "")
   window.history.replaceState({}, document.title, "/dashboard")
 }


  return (
    <div>
        <Menu />
        <UserInfo />
        <TopArtists />
        <TopSongs />
        <RecentlyPlayed />
    </div>
  );
}

export default Dashboard