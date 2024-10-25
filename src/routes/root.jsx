import PageTitle from "../components/pageTitle";
import './root.css';
import Card from "../components/card";

export const loader = async () => {
    const data = await 'Test'
    return data;
}

const Root = () => {

    return (
        <nav className="layout-container">
            <PageTitle title="Bobar"/>
            <Card locationName="TP-TEA" distance={10} backgroundImage={'/src/assets/TPTEA.jpg'}/>
            <Card locationName="Sunright" distance={5} backgroundImage={'/src/assets/SUNRIGHT.png'}/>
        </nav>
    )
}

export default Root;