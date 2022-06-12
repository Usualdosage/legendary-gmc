import Layout from "../components/layout";
import Dice from "../components/dice";
import Alarms from "../components/alarms";

export default function Home() {
    return (
        <Layout>
            <Alarms />
            <div className="card bg-dark">
                <div className="card-header">Dice Roller</div>
                <Dice />
            </div>
        </Layout>
    );
}
