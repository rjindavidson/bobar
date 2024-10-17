import PageTitle from "./components/pageTitle";
import './app.css';
import Card from "./components/card";

const App = () => {
    return (
        <div className="layout-container">
            <PageTitle title="Bobar"/>
            <Card locationName="TP-TEA" distance={10} backgroundImage={'/src/assets/TPTEA.jpg'}/>
            <Card locationName="Sunright" distance={5} backgroundImage={'/src/assets/SUNRIGHT.png'}/>
        </div>
    )
}

export default App;