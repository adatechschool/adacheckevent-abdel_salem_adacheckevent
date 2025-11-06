
// Background.jsx
import bg from "../assets/background-white.png";
import bgDark from "../assets/background-dark.png";

const Background = () => {

console.log('bg', bg);       // doit logguer une URL type /assets/...
console.log('bgDark', bgDark);
  return (
    <div>
    <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none bg-cover bg-center bg-no-repeat dark:hidden"
        style={{ backgroundImage: `url(${bg})` }}>
    </div>

    <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat hidden dark:block"
        style={{ backgroundImage: `url(${bgDark})` }}
    />
</div>
  );
};

export default Background