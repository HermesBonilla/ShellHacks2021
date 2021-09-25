import NavBar from "../Components/Nav";
import Collaboration from "../Assets/collaboration.svg";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-gradient-to-r from-indigo-500 to-purple-700 h-80 flex items-center justify-center">
        <h2 className="text-center text-white font-bold">
          A Modern Day Solution to an Old Problem
        </h2>
      </div>
      <div className="flex flex-row mt-10 mx-5">
        <img src={Collaboration} alt="power to the people" className="h-60" />
        <p className="font-light mx-10">
          Hello there and welcome to the PetitNearYou website! This is where you
          can find pititions currently happening in your county. You can
          question and support petitoins with just a few clicks!
        </p>
      </div>
    </div>
  );
};

export default Home;
