import Navbar from "../components/Navbar/Navbar"
import Posts from "../components/Posts/Posts"
import Sidebar from "../components/Sidebar/Sidebar"


const Home = () => {
  return (<>
    <Navbar/>
    <div className="main container grid">
        <Sidebar/>
        <Posts/>
    </div>
  </>)
}

export default Home;