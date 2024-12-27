const HomeButton = ({ goHome }) => (
    <button
      onClick={goHome}
      className="absolute top-6 left-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all z-10"
    >
      Home
    </button>
  );
  
  export default HomeButton;
  