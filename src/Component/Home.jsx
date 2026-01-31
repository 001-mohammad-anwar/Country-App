import { useContext, useState } from "react";
import CardContainer from "./CardContainer";
import Choose from "./Choose";
// import { useOutletContext } from "react-router";
import { ThemeContext } from "./contexts/ThemeContext";
const Home = () => {
    const [query, setQuery] = useState("");
    
  // const [darkMode] = useOutletContext()
  const [darkMode] = useContext(ThemeContext)
  return (
    <>
         <main className={`${darkMode?'Dark':''}`}>
              <Choose setQuery={setQuery}/>
              {query === "unmount" ? "" : <CardContainer query={query}/>}
         </main>
    </>
  );
};

export default Home;
