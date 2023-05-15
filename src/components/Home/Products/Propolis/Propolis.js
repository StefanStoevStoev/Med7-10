import { useState } from "react";

import "../../../../css/honey.css";
import PropolisFull from "./PropolisFull";

const Propolis = ({ removeHoney, removePollen }) => {
  const [open, setOpen] = useState(false);
  const [propolisFull, setPropolisFull] = useState("products__propolis");

  const setClass = () => {
    if (propolisFull === "propolis") {
      setPropolisFull("products__propolis");
    } else {
      setPropolisFull("propolis");
    }
  };

  const expand = async () => {
    setClass();
    setOpen(!open);
    removeHoney();
    removePollen();
  };

    return (
        <div className={propolisFull}>
        <img
          src="https://maslo-dishi.ru/upload/images-for-oksana/photo-for-articles/436.jpg"
          alt="propolis"
        />
        <div className="products__propolis-text">
          <h4>Прополис</h4>
          <p>
          &ensp;Прополисът е смес от смоли, восък и прашец от пъпки и цветове на
            растенията, обогатена с ензими и подложена на млечно-кисела
            ферментация в храносмилателната система на пчелите. Прополисът
            съдържа витамини, етерични масла, минерални соли, микроелементи,
            хормони и ферменти. Цветът на прополиса е жълт, жълто-зелен,
            тъмно зелен или сив. Във вода се разтваря слабо, най-добре се
            разтваря в спирт, етер, хлороформ, ацетон.
          </p>
          <p>
            Прополисовите продукти и най-вече прополисовата тинктура
            традиционно се използва при грипи настинки. 
          </p>
          <button onClick={expand} className="button">
          {open ? "по-малко" : "повече"}
        </button>
        {open && <PropolisFull />}
        </div>
      </div>
    );
}

export default Propolis;