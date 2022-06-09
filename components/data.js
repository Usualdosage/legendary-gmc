import { getRandomNumber } from "../components/utils";

const Swords = [
    "",
    "Longsword",
    "Broadsword",
    "Rapier",
    "Falchion",
    "Cutlass",
    "Saber",
    "Shortsword",
    "Bastard Sword",
    "Two-Handed Sword",
    "Arming Sword",
    "Gladius",
    "Falx",
    "Xiphos",
    "Backsword",
    "Claymore",
    "Seax",
    "Langseax",
];

const Axes = [
    "",
    "Broadaxe",
    "War Axe",
    "Wood Axe",
    "Battleaxe",
    "Hatchet",
    "Field Axe",
    "Double Bedded Wood Axe",
    "Tomahawk",
    "Throwing Axe",
];

const Polearms = [
    "",
    "Halberd",
    "Awl Pike",
    "Fauchard",
    "Bill-Giusarme",
    "Glaive",
    "Voulge",
    "Bardiche",
    "Bec de Corbin",
    "Partisan",
    "Ranseur",
];

const Exotics = ["", "Whip", "Scythe", "Cat of Nine Tails", "Crystal"];

const Blunt = [
    "",
    "Cudgel",
    "Mace",
    "Morning Star",
    "Flail",
    "Flanged Mace",
    "Winged Mace",
    "Club",
    "Bat",
    "War Club",
    "Brickbat",
    "Warhammer",
    "Hammer",
    "Truncheon",
    "Nightstick",
    "Aklys",
    "Skull Mace"
];

const Ranged = [
    "",
    "Short Bow",
    "Long Bow",
    "Crossbow",
    "Javelin",
    "Sling",
    "Arbalest",
    "Ballista",
    "Compound Bow",
    "Discus",
];

const Daggers = [
    "",
    "Dagger",
    "Rondel",
    "Kris",
    "Bollocks Dagger",
    "Stiletto",
    "Dirk",
    "Hunting Knife",
    "Push Dagger",
    "Baselard",
    "Anelace",
    "Chef Knife",
    "Kukri",
    "Bolo",
];

const Spears = [
    "",
    "Javelin",
    "Wooden Spear",
    "Steel Spear",
    "Longspear",
    "Pilum",
    "Lancea",
    "Boar Spear",
    "Pike",
    "Spetum",
];

const Effects = [
    "",
    "",
    "",
    "(Glowing)",
    "",
    "",
    "",
    "(Humming)",
    "",
    "",
    "",
    "(Dark)",
    "",
    "",
    "",
    "(Holy)",
    "",
    "",
    "",
    "(Evil)",
    "",
    "",
    "",
];

const WeaponType = [
    "",
    "Mauling",
    "Dragon Slaying",
    "The Hunter",
    "Devastation",
    "Slaughter",
    "Piercing",
    "Legends",
    "The Valiant",
    "The Brave",
    "Crushing",
    "Thrusting",
    "Fire",
    "Earth",
    "Water",
    "The Winds",
    "Whispering",
    "Hunting",
    "Demon Slaying",
    "The Raven",
    "Slaying",
    "Spell Turning",
    "Vanquishment",
    "The Ranger",
    "The Boar",
    "The Serpent",
    "Dragoth",
    "Vashura",
    "Rathe",
    "Saurath",
    "Azraeth",
    "Merimor",
    "Taramin",
    "Ulma",
    "Nazrek",
    "Khyber",
    "Khoda",
    "Atrina",
    "The Horse",
    "The Rabbit",
    "The Hawk",
    "The Damned",
    "Enlightenment",
    "The Jester",
    "Darkness",
    "The Light",
    "Balance",
    "Poison",
    "Plague"
];

const Head = [
    "",
    "Helm",
    "Great Helm",
    "Winged Helm",
    "Sallet",
    "Bascinet",
    "Spangenhelm",
    "Norman",
    "Armet",
    "Aventail",
    "Barbute",
    "Combat Helmet",
    "Helmet",
    "Gorget",
    "Hat",
];

const Body = [
    "",
    "Cuirass",
    "Breastplate",
    "Gambeson",
    "Hauberk",
    "Corselet",
    "Vest",
    "Shirt",
    "Jacket",
];

const ArmorMaterial = [
    "",
    "Leather",
    "Chainmail",
    "Plate",
    "Studded Leather",
    "Boiled Leather",
    "Quilted",
    "Brigandine",
    "Scale",
    "Iron",
    "Steel",
    "Spiked Leather",
    "Woolen",
    "Banded Mail",
    "Ring Mail",
    "Gothic",
    "Copper",
    "Platinum",
    "Golden",
    "Bone",
    "Wood",
    "Brass",
];

const Arms = [
    "",
    "Vambraces",
    "Pauldrons",
    "Bracers",
    "Bracelet",
    "Arm Guards",
    "Cuffs",
];

const Hands = ["", "Gauntlets", "Gloves", "Fingerless Gloves", "Ring"];

const Feet = ["", "Boots", "Shoes", "Sollerettes", "Sandals"];

const Legs = ["", "Greaves", "Pants"];

const Material = [
    "",
    "Wooden",
    "",
    "Leather",
    "",
    "Unusual",
    "",
    "Glass",
    "",
    "Paper",
    "",
    "Wool",
    "",
    "Leather",
    "",
    "Hemp",
    "",
    "Glass",
    "",
    "Brass",
];

const Ordinary = ["", "Pencil", "Rope", "Fork", "Marble", "Card", "Glass",];

const Common = [
    "",
    "Book",
    "Sandals",
    "Mug",
    "Cup",
    "Plate",
    "Bowl",
    "Belt",
    "Gloves",
    "Lamp",
    "Shirt",
    "Pants",
    "Shorts",
    "Bottle",
    "Canteen",
    "Tinderbox",
];

const Magical = ["", "Orb", "Chalice", "Wand", "Staff", "Sphere"];

const Adjective = [
    "",
    "Unusual",
    "",
    "Weird",
    "",
    "Common",
    "",
    "Shiny",
    "",
    "Worn",
    "",
    "Old",
    "",
    "New",
];

const Color = [
    "",
    "",
    "Blue",
    "",
    "",
    "Red",
    "",
    "",
    "Green",
    "",
    "",
    "Orange",
    "",
    "",
    "Yellow",
    "",
    "",
    "White",
    "",
    "",
    "Purple",
    "",
    "",
    "Pink",
    "",
    "",
    "Black",
    "",
    "",
    "Clear",
    "",
    "",
    "Golden",
    "",
    "",
    "Silvery",
    "",
    "",
    "Brown",
    "",
    "",
    "Tan",
    "",
    "",
];

const Liquid = [
    "",
    "Liquid",
    "Wine",
    "Ale",
    "Whiskey",
    "Rum",
    "Water",
    "Syrup",
    "Molasses",
    "Honey",
    "Gin",
    "Tonic Water",
    "Carbonated Water",
    "Mead",
    "Olive Oil",
    "Lamp Oil",
    "Holy Water",
    "Mineral Spirits",
    "Moonshine",
    "Beer",
];

const Food = [
    "",
    "Eggs",
    "Raw Chicken",
    "Tree Nuts",
    "Potatoes",
    "Yams",
    "Carrots",
    "Onions",
    "Apples",
    "Beefsteak",
    "Tomatoes",
    "Peppers",
    "Cheese",
    "Ham",
    "Pork Loin",
    "Squirrel",
    "Rabbit",
    "Cabbage",
    "Parsnips",
    "Peas",
    "Beans",
    "Sunflower Seeds",
    "Cherries",
    "Pie",
    "Cake",
    "Bread",
    "Venison",
    "Mutton",
    "Pears",
    "Bananas",
    "Lemons",
    "Limes",
    "Mackerel",
    "Salmon",
    "Crickets",
    "Stew",
    "Celery",
    "Brisket",
    "Beef Ribs",
    "Pork Ribs",
    "Lettuce",
    "Scallions",
    "Shallots",
    "Rashers",
    "Corn",
    "Fruit"
];

const Container = [
    "",
    "Plate",
    "Barrel",
    "Bucket",
    "Bottle",
    "Jar",
    "Cup",
    "Glass",
    "Bushel",
    "Satchel",
    "Pouch",
    "Can",
    "Pack",
    "Box",
    "Bag",
    "Bowl",
    "Sack",
    "Crate",
];

export function getRandomSword() {
    let random = getRandomNumber(Swords.length - 1);
    return (
        getRandomEffect() + " " + Swords[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomRanged() {
    let random = getRandomNumber(Ranged.length - 1);
    return (
        getRandomEffect() + " " + Ranged[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomPolearm() {
    let random = getRandomNumber(Polearms.length - 1);
    return (
        getRandomEffect() + " " + Polearms[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomArmor(type) {
    let armor;
    switch (type) {
        case "head":
            armor = getRandomNumber(Head.length - 1);
            return (
                getRandomEffect() +
                " " +
                getRandomArmorMaterial() +
                " " +
                Head[armor] +
                " of " +
                getRandomWeaponType()
            );
        case "body":
            armor = getRandomNumber(Body.length - 1);
            return (
                getRandomEffect() +
                " " +
                getRandomArmorMaterial() +
                " " +
                Body[armor] +
                " of " +
                getRandomWeaponType()
            );
        case "arms":
            armor = getRandomNumber(Arms.length - 1);
            return (
                getRandomEffect() +
                " " +
                getRandomArmorMaterial() +
                " " +
                Arms[armor] +
                " of " +
                getRandomWeaponType()
            );
        case "legs":
            armor = getRandomNumber(Legs.length - 1);
            return (
                getRandomEffect() +
                " " +
                getRandomArmorMaterial() +
                " " +
                Legs[armor] +
                " of " +
                getRandomWeaponType()
            );
        case "hands":
            armor = getRandomNumber(Hands.length - 1);
            return (
                getRandomEffect() +
                " " +
                getRandomArmorMaterial() +
                " " +
                Hands[armor] +
                " of " +
                getRandomWeaponType()
            );
        case "feet":
            armor = getRandomNumber(Feet.length - 1);
            return (
                getRandomEffect() +
                " " +
                getRandomArmorMaterial() +
                " " +
                Feet[armor] +
                " of " +
                getRandomWeaponType()
            );
    }
}

function getRandomColor() {
    let color = getRandomNumber(Color.length - 1);
    return Color[color];
}

function getRandomContainer() {
    let container = getRandomNumber(Container.length - 1);
    return Container[container];
}

function getRandomAdjective() {
    let adj = getRandomNumber(Adjective.length - 1);
    return Adjective[adj];
}

export function getRandomItem(type) {
    let adjective = getRandomAdjective();
    let color = getRandomColor();
    let material = getRandomMaterial();
    let container = getRandomContainer();
    let item;
    switch (type) {
        case "food":
            item = getRandomNumber(Food.length - 1);
            return container + " of " + color + " " + Food[item];
        case "liquid":
            item = getRandomNumber(Liquid.length - 1);
            return container + " of " + color + " " + Liquid[item];
        case "ordinary":
            item = getRandomNumber(Ordinary.length - 1);
            return adjective + " " + color + " " + material + " " + Ordinary[item];
        case "common":
            item = getRandomNumber(Common.length - 1);
            return adjective + " " + color + " " + material + " " + Common[item];
        case "magical":
            item = getRandomNumber(Magical.length - 1);
            return (
                getRandomEffect() +
                " " +
                adjective +
                " " +
                color +
                " " +
                material +
                " " +
                Magical[item]
            );
    }
}

export function getRandomBlunt() {
    let random = getRandomNumber(Blunt.length - 1);
    return (
        getRandomEffect() + " " + Blunt[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomExotic() {
    let random = getRandomNumber(Exotics.length - 1);
    return (
        getRandomEffect() + " " + Exotics[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomAxe() {
    let random = getRandomNumber(Axes.length - 1);
    return (
        getRandomEffect() + " " + Axes[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomSpear() {
    let random = getRandomNumber(Spears.length - 1);
    return (
        getRandomEffect() + " " + Spears[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomDagger() {
    let random = getRandomNumber(Daggers.length - 1);
    return (
        getRandomEffect() + " " + Daggers[random] + " of " + getRandomWeaponType()
    );
}

export function getRandomEffect() {
    let random = getRandomNumber(Effects.length - 1);
    return Effects[random];
}

export function getRandomArmorMaterial() {
    let random = getRandomNumber(ArmorMaterial.length - 1);
    return ArmorMaterial[random];
}

export function getRandomMaterial() {
    let random = getRandomNumber(Material.length - 1);
    return Material[random];
}

export function getRandomWeaponType() {
    let random = getRandomNumber(WeaponType.length - 1);
    return WeaponType[random];
}
