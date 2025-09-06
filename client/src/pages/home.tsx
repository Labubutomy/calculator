import { Calculator } from "../widgets/calculator/ui/Calculator";

const Home: React.FC = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <Calculator />
      </div>

      <button onClick={toggleTheme}>
        Toggle theme
      </button>
    </div>

  );
};

export default Home;
