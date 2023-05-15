import History from "./History/History";
import Hive from "./Hive/Hive";

const Info = ({
    hive,
    history,
    removeHive,
    removeHistory
}) => {
    return (
        <main className="info">
            { hive && <History removeHive={removeHive}/>  }
            { history && <Hive removeHistory={removeHistory} /> }
        </main>
    );
}

export default Info;