import { useState } from "react";
import HoneyFull from "./HoneyFull";
import "../../../../css/honey.css";
// import oldStylesheet from "../../../../css/products.css";
// let oldStylesheet = import('../../../../css/products.css');

const Honey = ({ removePollen, removePropolis }) => {
  const [open, setOpen] = useState(false);
  const [honeyFull, setHoneyFull] = useState("products__honey");

  const setClass = () => {
    if (honeyFull === "honey") {
      setHoneyFull("products__honey");
    } else {
      setHoneyFull("honey");
    }
  };

  const expand = async () => {
    setClass();
    setOpen(!open);
    removePollen();
    removePropolis();
  };

  return (
    <div className={honeyFull}>
      <img className="img"
        src="https://5.imimg.com/data5/UD/MB/MY-42635865/natural-honey-500x500.jpg"
        alt="honey"
      />
      <h4>Пчелен мед</h4>
      <div className="products__honey-text">
      <p className="p1">
        &ensp;Пчелният мед е сложен биологичен продукт от растително-животински
        произход. Пчелите го произвеждат от нектара и маната на растенията,
        които преработват, обогатяват с ензими в медовата си гушка и складират в
        питите. Медът съдържа около 75-80% захари - главно инертна (гроздова и
        овощна). В него има около 32 минерални и микроелементи под формата на
        соли или в състава на органични съединения, поради което са лесно
        усвоими. В меда има и различни ензими - инвертаза, диастаза, малтаза,
        каталаза и др. витамини B<sub>1</sub>, B<sub>2</sub>, B<sub>2</sub>, B
        <sub>6</sub>, H, K, C, E, провитамини А, РР и др.
      </p>
      <button onClick={expand} className="button">
        {open ? "по-малко" : "повече"}
      </button>
      {open && <HoneyFull />}
      </div>
    </div>
  );
};

export default Honey;
