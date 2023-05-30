import { useState } from "react";
import "../../../../css/honey.css";
import PollenFull from "./PollenFull";

const Pollen = ({ removeHoney, removePropolis }) => {
  const [open, setOpen] = useState(false);
  const [pollenFull, setPollenFull] = useState("products__pollen");

  const setClass = () => {
    if (pollenFull === "pollen") {
      setPollenFull("products__pollen");
    } else {
      setPollenFull("pollen");
    }
  };

  const expand = async () => {
    setClass();
    setOpen(!open);
    removeHoney();
    removePropolis();
  };
  
  return (
    <div className={pollenFull}>
      <img
        src="https://cdn.shopify.com/s/files/1/0420/4442/4353/files/bee_pollen_1_1024x1024.jpg?v=1620666269"
        alt="pollen"
      />
      <div className="products__pollen-text">
        <h4>Пчелен прашец</h4>
        <p>
        &ensp;Пчелният цветен прашец се събира от пчелите от цветовете на
          растенията. Той е богат на белтъчини 20-40%, мазнини, захари 30-60%,
          минерални вещества, витамини C, B<sub>1</sub>, B<sub>2</sub>, B
          <sub>5</sub>, B<sub>6</sub>, B<sub>8</sub>, E провитамин А, фолиева
          киселина, биотин, ферменти, липиди и др. Пчелният прашец повишава
          съпротивителните сили на организма, пълен е с ензими, които
          благоприятстват правилното протичане на всички процеси в човешкото
          тяло. Πриемането му подобрява изграждането на костната система,
          нормализира се кръвното налягане, укрепват кръвните клетки.
        </p>
        <button onClick={expand} className="button">
          {open ? "по-малко" : "повече"}
        </button>
        {open && <PollenFull />}
      </div>
    </div>
  );
};

export default Pollen;
