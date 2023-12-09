import { useState } from "react";
import HistoryFull from "./HistoryFull";
import "../../../../css/home.css";
import home_info_beekeeping_egypt from '../../../../images/home_info_beekeeping_egypt.jpg';

const History = ({ removeHive }) => {
  const [open, setOpen] = useState(false);
  const [historyFull, setHistoryFull] = useState("info__history");

  const setClass = () => {
    if (historyFull === "history") {
      setHistoryFull("info__history");
    } else {
      setHistoryFull("history");
    }
  };

  const expand = () => {
    setClass();
    setOpen(!open);
    removeHive();
  };

  return (
    <div className={historyFull}>
      <img
        src={home_info_beekeeping_egypt}
        // src="https://www.bees.wales/assets/img/article-organic-beekeeping-egypt.jpg"
        alt="honey-history"
      />

      <h4>История на пчеларството</h4>
      <p className="firstP">
        &ensp;Пчелата се е появила около 50-60 000г. преди появата на човека. Има
        пещерни рисунки, които показват, че пещерният човек е познавал вкуса на
        меда. Исторически паметници показват първата цивилизация документирала
        отглеждането на пчелни семейства е египетската преди повече от 6000г.
        Разчетен е папирус, в който е отбелязан пчелният мед, като основа за
        лекарства служещи за лечение на заболявания на очите, бъбреците, черния
        дроб, стомашно чревни заболявания и др.&ensp;В индийския епос Аюр-веда,
        писан преди повече от 4000г. се споменават медът и млякото, като
        съставки за лекарства удължаващи живота.
      </p>
      <button id="history" onClick={expand} className="button">
        {open ? "по-малко" : "повече"}
      </button>
      {open && <HistoryFull />}
    </div>
  );
};

export default History;
