import { useState } from "react";

import Info from "./Info/Info";
import Products from "./Products/Products";

const Home = () => {
  const [hive, setHive] = useState(true);
  const [history, setHistory] = useState(true);
  const [honey, setHoney] = useState(true);
  const [pollen, setPollen] = useState(true);
  const [propolis, setPropolis] = useState(true);

  const removeHive = () => {
     setHistory(!history);
  };
  const removeHistory = () => {
    setHive(!hive);
  };

  const removeHoney = () => {
    setHoney(!honey);
  };
  const removePollen = () => {

    setPollen(!pollen);
  };
  const removePropolis = () => {
    setPropolis(!propolis);
  };

  return (
    <>
        {honey && pollen && propolis && (
          <Info
            removeHive={removeHive}
            hive={hive}
            history={history}
            removeHistory={removeHistory}
          />
        )}
        {history && hive && (
          <Products
            honey={honey}
            pollen={pollen}
            propolis={propolis}
            removeHoney={removeHoney}
            removePollen={removePollen}
            removePropolis={removePropolis}
          />
        )}
    </>
  );
};

export default Home;
