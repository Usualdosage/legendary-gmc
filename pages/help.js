import Layout from "../components/layout";
import Alarms from "../components/alarms";
import styles from "./help.module.css"

export default function Help() {
    return (
        <Layout>
            <Alarms />
            <div className={styles.helpSection}>
                <h1>Using the Game Master's Companion</h1>
                <p>Welcome to the help desction of the Game Master's Companion.</p>
                <h3>Table of Contents</h3>
                <ol>
                    <li><a className={styles.helpLink} href="#campaigns">Campaigns</a></li>
                    <li><a className={styles.helpLink} href="#playertracker">Player Tracker</a></li>
                    <li><a className={styles.helpLink} href="#gametracker">Game Tracker</a></li>
                    <li><a className={styles.helpLink} href="#timers">Timers</a></li>
                    <li><a className={styles.helpLink} href="#random">Randomizers</a></li>
                    <li><a className={styles.helpLink} href="#dice">Dice Roller</a></li>
                    <li><a className={styles.helpLink} href="#maps">Maps</a></li>
                </ol>
                <h2 id="campaigns">Campaigns</h2>
                <p>A campaign is a single group of players you have chosen for an adventure. The GMC allows you to run multiple saved campaigns. Each time you create a campaign
                    from the launch page, it is saved to your local storage automatically. Only the game tracker, the player tracker, and the timers are unique to the campaign. The
                    dice roller, randomizers, and maps are all public tools that do not save state.
                </p>
                <h3>Saving and Loading Campaign</h3>
                <p>As you enter data into the trackers, it is saved for you automatically. However, if you are using this on a public computer, you can download all of your campaigns
                    from the launch menu as a JSON file. It will be downloaded to your Downloads folder. This can later be uploaded to another computer.
                </p>
                <h2 id="playertracker">Player Tracker</h2>
                <p>This is the first page you will see once you create a campaign. It's the place for you to fill in all of the details about your players; things like names,
                    attributes, locations, and any other info you care to provide. It is laid out much like a character sheet in Legendary. When you input this information, it is saved,
                    and will automatically reflect on the Game Tracker.
                </p>
                <h2 id="gametracker">Game Tracker</h2>
                <p>After you have created your players, the Game Tracker is "home". It maps the time and date, the weather, the group needs, and basic information
                    about the players, which it pulls from the saved data. The only information entered here is not saved over the top of the player data; it's saved in a different place.</p>
                <h3>Time of Day</h3>
                <p>This is randomized when the campaign is created and cannot be reset. You may however use the navigation buttons to advance days, hours, and minutes. The time of day
                    directly drives the "Needs" section.
                </p>
                <h3>Weather</h3>
                <p>The weather section uses the OpenWeather API to randomly generate weather conditions across Europe to provide realistic conditions. You can refresh the weather as much as you like
                    to pinpoint the weather that makes sense to your campaign.
                </p>
                <h3>Needs</h3>
                <p>The needs section sybmolizes the player's needs, such as food, water, and rest. As the time of day advances, the needs will increase, reminding you when the party should
                    eat, drink, or sleep, respectively.
                </p>
                <h2 id="timers">Timers</h2>
                <p>There are 8 timers available in the GMC. A time can either be a standard timer that runs from start until you stop it. Or it can be a countdown timer. To set the timer,
                    click the play icon. To stop and reset the timer, click the stop button. To pause the timer, click the pause button. To set an interval, enter the number of hours, minutes,
                    or seconds you wish to elapse before the alarm is fired. Once you have done this, click the "set interval" button, then click "play".
                </p>
                <p>Once a timer has elapsed, no matter where you are in the app, a toast message will appear at the top right of the page informing you which timer has elapsed. If sound
                    is on, it will signal with a chime. 
                </p>
                <h2 id="random">Randomizers</h2>
                <p>The GMC comes with a variety of randomizers available. These are self-explanatory.</p>
                <h2 id="dice">Dice Roller</h2>
                <p>The dice roller randomizes dice rolls to save you the trouble of rolling multiple dice.</p>
                <h3>Dice</h3>
                <p>Select the die you wish to roll and click the corresponding button. To roll another one, click it again, or select another die. D100 dice are rolled as two percentile
                    dice, and not a single 100 sided die.
                </p>
                <h3>Modifiers</h3>
                <p>You can add bonuses to any die roll, or multipliers. These will be reflected on the <b>last</b> rolled die. In the case of percentiles, it will apply to the total number.</p>
                <h3>Reset</h3>
                <p>Click this to reset the board.</p>
                <h2 id="maps">Maps</h2>
                <p>The map viewer is a powerful tool unique to Legendary. It features a variety of premade maps that can be used to run a game. The map viewer is designed to be used with
                    and external monitor, laid flat. A screen protector is advised! 
                </p>
                <p>When running the map, select a map from the dropdown list. The map viewer will open with the overlay on it, so the map will be hidden from view.</p>
                <h3>Tools</h3>
                <p>Going from left to right at the bottom right of the page:</p>
                <ul>
                    <li>Color Indicator<p>This indicates the current color of your pen tool.</p></li>
                    <li>Color Selector<p>Click this to open a palette selector. Select any color for the color of your pen. The color indicator will change to the new color.</p></li>
                    <li>Grid Resizer<p>Allows zooming of the hex grid to account for screen size.</p></li>
                    <li>Pen Width<p>Use this resizer to increase or decrease the width of the pen tool.</p></li>
                    <li>Brush Width<p>This will increase or decrease the size of the hide/reveal brush tool.</p></li>
                    <li>Drag Map<p>This toggle allows you to drag and drop the map in the background.</p></li>
                    <li>Draw<p>Allows you to draw directly on the map.</p></li>
                    <li>Reveal Map<p>Reveals a section of the map.</p></li>
                    <li>Hide Map<p>Covers a section of the map.</p></li>
                    <li>Hide Overlay<p>Toggles the map overlay.</p></li>
                    <li>Hide Grid<p>Toggles the map grid</p></li>
                    <li>Zoom<p>Use the mouse wheel to zoom the map in and out.</p></li>
                </ul>
            </div>
        </Layout>
    );
}
