import { getRandomNumber } from "../components/utils";

export function getRandomName(type) {
    let first;
    let last;

    switch (type) {
        case "human": {
            first = getRandomNumber(HumanFirst.length - 2);
            last = getRandomNumber(HumanLast.length - 2);
            return HumanFirst[first] + " " + HumanLast[last];
        }
        case "dwarf": {
            first = getRandomNumber(DwarfFirst.length - 2);
            last = getRandomNumber(DwarfLast.length - 2);
            return DwarfFirst[first] + " " + DwarfLast[last];
        }
        case "elf": {
            first = getRandomNumber(ElfFirst.length - 2);
            last = getRandomNumber(ElfLast.length - 2);
            return ElfFirst[first] + " " + ElfLast[last];
        }
        case "halfling": {
            first = getRandomNumber(HalflingFirst.length - 2);
            last = getRandomNumber(HalflingLast.length - 2);
            return HalflingFirst[first] + " " + HalflingLast[last];
        }
        case "fairy": {
            first = getRandomNumber(FairyFirst.length - 2);
            last = getRandomNumber(FairyLast.length - 2);
            return FairyFirst[first] + " " + FairyLast[last];
        }
        case "gnome": {
            first = getRandomNumber(GnomeFirst.length - 2);
            last = getRandomNumber(GnomeLast.length - 2);
            return GnomeFirst[first] + " " + GnomeLast[last];
        }
        case "giant": {
            first = getRandomNumber(GiantFirst.length - 2);
            return GiantFirst[first];
        }
        case "half-orc": {
            first = getRandomNumber(HOrcFirst.length - 2);
            last = getRandomNumber(HOrcLast.length - 2);
            return HOrcFirst[first] + " " + HOrcLast[last];
        }
    }
}

const HumanFirst = [
    "Aaron",
    "Matthew",
    "Timothy",
    "David",
    "Eric",
    "Andrew",
    "Edward",
    "James",
    "Michael",
    "Randall",
    "Robert",
    "Thomas",
    "Edgar",
    "Joshua",
    "Stephen",
    "Mary",
    "Margaret",
    "Sally",
    "Tina",
    "Christine",
    "Rosemary",
    "Catherine",
    "Jane",
    "Patricia",
    "Wendy",
    "Jasmine",
    "Heather",
    "Amy",
    "Joanne",
    "Natalie",
    "Erin",
    "Vera",
    "Tara",
    "Misty",
    "Jeanne",
    "Jean",
    "Gene",
    "Rick",
    "Sven",
    "Anders",
    "Cole",
    "Erik",
    "Gina",
    "Madeline",
    "Caitlyn",
    "Katie",
    "Anna",
    "Anne",
    "Reginald",
    "Victor",
    "Samantha",
    "Maxwell",
    "Lee",
    "Leigh",
    "Carol",
    "Caroline",
    "Karen",
    "Hunter",
    "Robin",
    "Donald",
    "William",
    "Jared",
    "Caleb",
    "Dennis",
    "Peter",
    "Luke",
    "John",
    "Dana",
    "Suzanne",
    "Kathy",
    "Katrina",
    "Marina",
    "Marin",
    "Dane",
    "Terry",
    "Angela",
    "Angelo",
    "Ralph",
    "Scott",
    "Theresa",
    "Leonard",
    "Steve",
    "Stanley",
    "Shannon",
    "Roger",
    "Jeff",
    "Daniel",
    "Savannah",
    "Kate",
    "Christopher",
    "Rachel",
    "Micah",
    "Taylor",
    "Phillip",
    "Edwin",
    "Mike",
    "Jennifer",
    "Lisa",
    "Henry",
    "Jack",
    "Jill",
    "Arnold",
    "Samuel",
    "Gerald",
    "Margaret",
    "Meredith",
    "Beatrice",
    "Beverly",
    "Grant",
    "Amelia",
];
const HumanLast = [
    "Atell",
    "Martin",
    "Thatcher",
    "Smith",
    "Cooper",
    "Mason",
    "Farmer",
    "Wiliamson",
    "Tailor",
    "Howard",
    "King",
    "Kent",
    "Phillips",
    "Anderson",
    "Stevens",
    "Miller",
    "Brewer",
    "Jones",
    "Stevenson",
    "Mayer",
    "Meyer",
    "Evans",
    "Richards",
    "Graham",
    "Gray",
    "Brown",
    "Taylor",
    "Greene",
    "Hill",
    "Peterson",
    "Ryan",
    "Kent",
    "Ford",
    "Obrien",
    "MacAllum",
    "Dunn",
    "Carlisle",
    "Matthews",
    "Black",
    "Davis",
    "Murphy",
    "Rowe",
    "Kendrick",
    "Reynolds",
    "Fisher",
];

const DwarfFirst = [
    "Murri",
    "Abram",
    "Gorthi",
    "Ulrich",
    "Gearth",
    "Dannic",
    "Fermi",
    "Arnius",
    "Wicklow",
    "Armus",
    "Vanguard",
    "Fillen",
    "Wilmore",
    "Scroggins",
    "Murray",
    "Ulram",
    "Ruich",
    "Dangram",
    "Ragnar",
];
const DwarfLast = [
    "Redbeard",
    "Blackbeard",
    "Graybeard",
    "Warhammer",
    "Stronghammer",
    "Silverbeard",
    "Redcloud",
    "Rockthrower",
    "Stonethrower",
    "Stonehammer",
    "Rockwall",
    "Roadheaver",
    "Stormhammer",
    "Rockcrusher",
    "Stoneeater",
    "Hillclimber",
    "Cavedigger",
    "Ironhammer",
    "Ironbeard",
    "Fireeater",
    "Ironthrower",
    "Stonewall",
    "Ironforge",
    "Stoneforge",
];

const ElfFirst = [
    "Amaris",
    "Erelor",
    "Denethri",
    "Marith",
    "Valek",
    "Meris",
    "Lorelei",
    "Felicia",
    "Arianne",
    "Tyrion",
    "Tyhrus",
    "Cyprian",
    "Vandor",
    "Rulian",
    "Neremor",
    "Railynn",
    "Samara",
];
const ElfLast = [
    "Silverblade",
    "Lightblade",
    "Lightbringer",
    "Stormwind",
    "Stormcloud",
    "Stormsinger",
    "Silverwind",
    "Silverwing",
    "Silverthorne",
    "Cloudwalker",
    "Crystalsinger",
    "Crystalwind",
    "Glasswind",
];

const HalflingFirst = [
    "Pippin",
    "Arlow",
    "Sammael",
    "Dannil",
    "Bagdan",
    "Brim",
    "Samworth",
    "Rennin",
    "Sivver",
    "Pillith",
    "Fingdur",
    "Wymore",
    "Randur",
    "Desildur",
    "Orenth",
    "Plorth",
    "Villhelm",
    "Wangsur",
    "Derry",
    "Dinger",
    "Flange",
];
const HalflingLast = [
    "Riggins",
    "Loggins",
    "Gamgi",
    "Haskins",
    "Lugor",
    "Fangdarth",
    "Biggins",
    "Lemmins",
    "Wanging",
    "Sargi",
    "Soryu",
    "Flingen",
    "Wilkins",
    "Dennons",
    "Wisenhut",
];

const FairyFirst = [
    "Indiri",
    "Shimri",
    "Hawkli",
    "Andeara",
    "Mystri",
    "Keelie",
    "Lilly",
    "Merrily",
];
const FairyLast = [
    "Sunwhisper",
    "Rainsinger",
    "Sunflower",
    "Windsinger",
    "Sundrop",
    "Dewdrop",
    "Windflower",
    "Sunsinger",
    "Mayflower",
];

const GnomeFirst = [
    "Oatsworth",
    "Wendeldorf",
    "Brambus",
    "Fandarg",
    "Wilburg",
    "Helfdorf",
];
const GnomeLast = [
    "Shufflebottom",
    "Longfellow",
    "Gigglesnort",
    "Wortsifter",
    "Zippersnip",
    "Pepperwhistle",
];

const GiantFirst = [
    "Aungren",
    "Glarg",
    "Bragt",
    "Fuldhur",
    "Arghus",
    "Orgrold",
    "Grandt",
    "Smash",
    "Crush",
];

const HOrcFirst = ["Larch", "Grend", "Graendel"];

const HOrcLast = ["Warseeker", "Gnomeslayer", "Elfkiller"];
