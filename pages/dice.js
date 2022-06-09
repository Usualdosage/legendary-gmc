import Layout from "../components/layout";
import Canvas from "../components/canvas";
import Alarms from "../components/alarms";

export default function Home() {
    return (
        <Layout>
            <Alarms />
            <div className="card bg-dark">
                <div className="card-header">Dice Roller</div>
                <Canvas />
            </div>
        </Layout>
    );
}
