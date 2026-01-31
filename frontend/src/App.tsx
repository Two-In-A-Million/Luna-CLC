import { useEffect, useState } from "react";
import mageIcon from "./assets/mage.png";
import warriorIcon from "./assets/swords.png";
import archerIcon from "./assets/archery.png";
import "./App.css";
import ButtonOptions from "./components/button-options/ButtonOptions";
import LogoSet from "./components/logo/LogoSet";
import SelectionOptionGroups from "./components/selection-option-groups/SelectionOptionGroups";
import SkillOptions from "./components/skill-options/SkillOptions";

function App() {
  const [data, setData] = useState(null);

  const raceOptions = [
    {
      label: "Elf",
      title: "mobil buat 1 keluarga besar",
      img: null,
      imgButton: false,
    },
    {
      label: "Human",
      title: "yaa orang biasa aja",
      img: null,
      imgButton: false,
    },
  ];

  const classOptions = [
    {
      label: "mage",
      title: "mage class",
      img: mageIcon,
      imgButton: true,
    },
    {
      label: "warrior",
      title: "warrior class",
      img: warriorIcon,
      imgButton: true,
    },
    {
      label: "archer",
      title: "archer class",
      img: archerIcon,
      imgButton: true,
    },
  ];

  const selectionOptionGroups = [
    {
      sectionName: "level 20",
      avbOptions: ["Guard", "Warrior", "None"],
    },
    {
      sectionName: "level 40",
      avbOptions: ["Infantry", "Swordsman", "Mercenary", "None"],
    },
    {
      sectionName: "level 75",
      avbOptions: ["Mercenary", "Knight", "Gladiator", "None"],
    },
    {
      sectionName: "level 105",
      avbOptions: [
        "Paladin",
        "Panzer",
        "Crusader",
        "Destroyer",
        "Sword Master",
        "None",
      ],
    },
  ];

  const skillOptions = [
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
    {
      label: "Power Strike",
    },
  ];

  return (
    <div className="main-div">
      <LogoSet />
      <div className="main-card">
        <div className="char-desc-div">
          <ButtonOptions sectionName="race" options={raceOptions} />
          <ButtonOptions sectionName="class" options={classOptions} />
          <SelectionOptionGroups sectionLists={selectionOptionGroups} />
        </div>
        <SkillOptions skillOptions={skillOptions} />
        <div className="skill-detail-div">
          <h2> Skill Information </h2>
          <div className="skill-main-desc">
            <div className="skill-info">
              <img
                src={mageIcon}
                alt="skill icon"
                style={{ width: "4rem", height: "4rem" }}
              />
              <span>
                <p className="skill-name"> Dildo Strike </p>
                <p className="skill-type"> Active Skill </p>
              </span>
            </div>
            <span className="skill-stats">
              <div>
                <img
                  src={warriorIcon}
                  alt="cd icon"
                  style={{ width: "1rem", height: "1rem" }}
                />
                <p className="skill-cd"> 10.0s</p>
              </div>
              <div>
                <img
                  src={warriorIcon}
                  alt="mana icon"
                  style={{ width: "1rem", height: "1rem" }}
                />
                <p className="skill-mana"> 20 MP </p>
              </div>
              <div>
                <img
                  src={warriorIcon}
                  alt="sp icon"
                  style={{ width: "1rem", height: "1rem" }}
                />
                <p className="skill-sp"> 1 </p>
              </div>
            </span>
          </div>
          <div className="skill-description">
            <p>Skill Description:</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
