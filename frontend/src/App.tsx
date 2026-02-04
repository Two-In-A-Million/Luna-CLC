import { useEffect, useState } from "react";
import mageIcon from "./assets/mage.png";
import warriorIcon from "./assets/swords.png";
import archerIcon from "./assets/archery.png";
import "./App.css";
import ButtonOptions from "./components/button-options/ButtonOptions";
import LogoSet from "./components/logo/LogoSet";
import SelectionOptionGroups from "./components/selection-option-groups/SelectionOptionGroups";
import SkillOptions from "./components/skill-options/SkillOptions";
import SkillInfo from "./components/skill-info/SkillInfo";

function App() {
  const [currJobLists, setJobLists] = useState(null);
  const [currRace, setRace] = useState("Human");
  const [currCharClass, setCharClass] = useState("Warrior");

  useEffect(() => {
    let meta = document.querySelector(
      'meta[name="viewport"]',
    ) as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }

    meta.content = "width=device-width, initial-scale=1";

    // get data
    async function getJobListData() {
      let charDetail = {
        race: currRace,
        class: currCharClass
      }

      let getJobList = await fetch("http://localhost:3000/get-job-list", {
        method: "POST",
        body: JSON.stringify({charDetail : charDetail}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let jobList = await getJobList.json();
    console.log(jobList)
      setJobLists(jobList);
    }

    getJobListData();

  }, [currRace, currCharClass]);

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
      label: "Mage",
      title: "mage class",
      img: mageIcon,
      imgButton: true,
    },
    {
      label: "Fighter",
      title: "warrior class",
      img: warriorIcon,
      imgButton: true,
    },
    {
      label: "Rogue",
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

  function onChangeRace(race: string) {
    setRace((prevRace) => {
      if (prevRace != race) {
        return race;
      } else {
        return prevRace;
      }
    });
  }

  function onChangeClass(charClass: string) {
    setCharClass((prevCharClass) => {
      if (prevCharClass != charClass) {
        return charClass;
      } else {
        return prevCharClass;
      }
    });
  }

  return (
    <div className="main-div">
      <div className="main-card">
        <div className="char-desc-div">
          <LogoSet />
          <ButtonOptions
            sectionName="race"
            options={raceOptions}
            selected={currRace}
            onClickEvent={onChangeRace}
          />
          <ButtonOptions
            sectionName="class"
            options={classOptions}
            selected={currCharClass}
            onClickEvent={onChangeClass}
          />
          <SelectionOptionGroups sectionLists={selectionOptionGroups} />
        </div>
        <SkillOptions skillOptions={skillOptions} />
        <SkillInfo />
      </div>
      <div className="sp-needed">
        <div className="stat-display">
          <span className="stat-label">Total SP</span>
          <span className="stat-value primary">10</span>
        </div>
        <div className="stat-display">
          <span className="stat-label">Total Gold</span>
          <span className="stat-value accent">123123123</span>
        </div>
        <div className="stat-display">
          <span className="stat-label">SP Remaining</span>
          <span className="stat-value success">12</span>
        </div>
      </div>
    </div>
  );
}

export default App;
