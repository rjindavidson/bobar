import PageTitle from "../components/pageTitle";
import './root.css';
import Card from "../components/card";

const Root = () => {
    return (
        <nav className="layout-container">
            <PageTitle title="Bobar" />
            <Card locationName="TP-TEA" backgroundImage={'/src/assets/TPTEA.jpg'} />
            <Card locationName="Sunright" backgroundImage={'/src/assets/SUNRIGHT.png'} />
            <Card locationName="Omomo"/>
            <Card locationName="Sharetea"/>
            <Card locationName="Feng Cha" backgroundImage={'/src/assets/SUNRIGHT.png'} />
            <Card locationName="Wushiland" backgroundImage={'/src/assets/SUNRIGHT.png'} />
            <Card locationName="Coming Soon" backgroundImage={'/src/assets/SUNRIGHT.png'} />
        </nav>
    )
}

export default Root;