import Collaboration from "../Assets/collaboration.svg";

const Home = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-700 h-80 flex items-center justify-center">
        <h2 className="text-center text-white font-bold">
          A Modern Day Solution to an Old Problem
        </h2>
      </div>
      <div className="flex flex-row mt-10 mx-5">
        <img src={Collaboration} alt="power to the people" className="h-60" />
        <div className="flex flex-col font-light mx-10 text-2xl">
          <p>{`Hello there and welcome to the UKnow website!`}</p>
          <p>
            This is where you can find petitions currently happening in your
            county. You can question and support petitions with just a few
            clicks!
          </p>
          <p>
            To get started, check out the "Explore" tab and browse some of the
            initiatives happening in your community today! 🌳
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
