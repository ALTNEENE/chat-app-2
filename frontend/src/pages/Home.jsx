import MessageContainer from "../Components/Messages/MessageContainer";
import SideBar from "../Components/SideBar/sidebar";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <div className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
                <SideBar />
                <MessageContainer />
            </div>
        </>
    )
}

export default Home;