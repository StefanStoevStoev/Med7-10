import { useState } from "react";
import HiveFull from "./HiveFull";
import "../../../../css/home.css";
import home_info_honey_family from '../../../../images/home_info_honey_family.jpg';

const Hive = ( {removeHistory} ) => {
  const [open, setOpen] = useState(false);
  const [hiveFull, setHiveFull] = useState("info__hive");

  const setClass = () => {
    if (hiveFull === "hive") {
      setHiveFull("info__hive");
    } else {
      setHiveFull("hive");
    }
  };

  const expand = () => {
      setClass();
     setOpen(!open);
     removeHistory();
   };
   
  return (
    <div className={hiveFull}>
      <img className="img3"
      src={home_info_honey_family}
        // src="https://www.mindenpictures.com/cache/pcache2/00594061.jpg"
        alt="hive"
      />
      <h4>Пчелно семейство</h4>
      <p className="firstP">
      &ensp;Медоносните пчели живеят в многочислени семейства, съставени от три
        различни форми индивиди - пчелна майка, търтеи и пчели работнички. Трите
        форми индивиди се различават както по своите анатомични и физиологични
        особености и по дейността си, така и по своята численост. Те са в сложни
        биологични взаимоотношения и в тясно единство помежду си. Майката, пчелите и търтеите не са в състояние да живеят продължително време самостоятелно извън пчелното семейство. Ето защо медоносните пчели се наричат обществено живеещи насекоми.
      </p>
      <button id="history" onClick={ expand } className="button" >
          { open ? 'по-малко' : 'повече' }
        </button>
        {open && <HiveFull />}
    </div>
  );
};

export default Hive;
