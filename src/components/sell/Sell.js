import Sell10 from "./Sell10/Sell10";
import Sell25 from "./Sell25/Sell25";
import SellPP from "./SellPP/SellPP";

const Sell = () => {
    return (
        <section className="sell">
            <Sell10 />
            <Sell25 />
            <SellPP />
      </section>
    );
}

export default Sell;