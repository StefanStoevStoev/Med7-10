import Honey from "./Honey/Honey";
import Pollen from "./Pollen/Pollen";
import Propolis from "./Propolis/Propolis";

const Products = ({
  honey,
  pollen,
  propolis,
  removeHoney,
  removePollen,
  removePropolis,
}) => {

  return (
    <section className="products">
      <h3>Продукти</h3>
      <div className="products__type">
        { honey && <Honey removePollen={removePollen} removePropolis={removePropolis} />}
        {pollen && 
          <Pollen removeHoney={removeHoney} removePropolis={removePropolis} />
        }
        { propolis && (
          <Propolis removeHoney={removeHoney} removePollen={removePollen} />
        )}
      </div>
    </section>
  );
};

export default Products;
