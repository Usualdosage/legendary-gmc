# Welcome to the Game Master's Companion

This application is a supplement for Game Masters who wish to run a [Legendary](https://thelegendarygame.com/) campaign. Legendary is a fantasy role-playing game written by Matthew Martin, and is available for purchase from [Amazon](https://www.amazon.com/dp/1794769862/ref=cm_sw_em_r_mt_dp_MD2F6YP1VVFWFS8RTD7R).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It is open source and free for all use.

## Getting Started

First, you'll want to install the node modules by running `npm -i`.

Once that's done, just run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Troubleshooting

- Ensure you're using the latest node version when executing the application, as well as npm.

## Loading and Saving Campaigns

Data is stored at the browser level using local storage. Anything you create, edit, or save will be available, and saving is all performed in the background. On the initial screen, you can create a campaign, and later, load existing campaigns. Each campaign can have a unique set of players, monsters, and timers.

## The Game Tracker

This is the primary page. It contains 5 separate modules as described below.

### Game Time

The game time is based on the Calendar of Mystra. A random date is selected when a campaign is created. Using the buttons below the card, you can advance days, hours, and minutes. It will also display holidays and the cycles of the moon.

![This is an example of game time.](/public/img/GameTime.png)

### Weather

The weather pulls random data from the OpenWeather API. A list of cities across Europe are used as the basis. You can click the refresh icon to update the weather accordingly.

You will need to get an API key from [OpenWeather](https://openweathermap.org/api) in order to use this card. The API key is housed in the `.env` (or `.env.local`) file like so:

```
NEXT_PUBLIC_OPENWEATHER_API_KEY = 'MyAPIKey'
```

Once you have done that, the weather should load normally.

![This is an example of weather.](/public/img/Weather.png)

### Player Needs

As time passes, player needs will grow. This will remind you of when they need to eat, sleep, and drink. The needs are based on the Game Time. The colors of the badge will change as the group needs worsen.

![This is an example of player needs.](/public/img/Needs.png)

### Players

Player information is populated here from the Player Tracker. Any information input there will reflect on this card. This allows the game master to track initiave, health, and mana, and indicate whether a player is surprised or affected by a spell.

### Monsters

Monsters can be added and managed from this card. Clicking the trash icon will delete the monster, and clicking the dice icon will randomize their initiative.

## The Player Tracker

This is the place to keep track of your players. Entering their information here will populate important fields in the Game Tracker. You can reset a player's card by clicking the trash icon.

## Timers

There are eight timers available in the application. They can be used as elapsed timers as well as countdown timers. You can name the timers by selecting the name and entering a new name.

![This is a timer](/public/img/Timers.png)

### Elapsed

Enter the hours, minutes, and seconds, and click the play button. This will start the timer. Click the stop button to stop and reset the timer. Click the pause button to pause the timer. Click play to start it again.

### Countdown

Enter the hours, minutes, and seconds, and click the "set interval" button. Then click play. When the time has elapsed, a toast message and a chime sound will occur (regardless of the page you are on). The timer will continue to run unless stopped or paused.

## Randomizers

There are a variety of randomizers available in this application. Feel free to add to the randomizers by editing the `data.js` and `names.js` files.

## Dice Roller

The dice roller utilizes a canvas and a polygon drawing tool to generate dice with the sides listed. Modifiers can also be added, and will update the total score.

![D4, D6, D8, and D10 dice](/public/img/Dice.png)

## Maps

The map is designed for use on an external monitor of 48-65". If laid horizontally, players can place their miniatures directly on the screen (it's recommended to get a screen protector). 

Several maps are provided in this release. When a map is selected, a modal dialog will open, and the screen will be dark, covered with an overla. Use the buttons described below to manipulate the map.

### Hide/Show Overlay

Clicking the eye-slash icon will toggle the overlay. This will allow you to drag and zoom the map to the correct position.

### Toggle Grid

Turns the hexagonal grid on or off.

### Drag

Allows the map to be dragged. You can zoom the map by using the mouse scroll wheel.

### Draw

Click the pencil icon to draw on the map with a red pen.

### Reveal

When the overlay is active, clicking and dragging will reveal the map under the overlay, allowing the Game Master to keep the area hidden.

### Hide

If too much is revealed, the Game Master can restore the overlay by using this tool.

### Sliders

There are two sliders available. The first will increase the size of the pen, the second will increase the size of the hide/reveal brush.

### Adding More Maps

You can add maps by dropping .JPG files into the `public/maps` folder.