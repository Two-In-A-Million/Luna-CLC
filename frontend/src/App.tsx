import { useEffect, useState } from "react";
import mageIcon from "./assets/mage.png";
import fighterIcon from "./assets/fighter.png";
import archerIcon from "./assets/rogue.png";
import "./App.css";
import ButtonOptions from "./components/button-options/ButtonOptions";
import LogoSet from "./components/logo/LogoSet";
import SelectionOptionGroups from "./components/selection-option-groups/SelectionOptionGroups";
import SkillOptions from "./components/skill-options/SkillOptions";
import SkillInfo from "./components/skill-info/SkillInfo";

function App() {
  const [currJobLists, setJobLists] = useState(null);
  const [currRace, setRace] = useState("Elf");
  const [currCharClass, setCharClass] = useState("Mage");
  const [currSkillReqDetail, setSkillReqDetail] = useState({
    totalSP: 0,
    totalGold: 0,
    spRemain: 3074,
  });
  const [currSkillLists, setSkillLists] = useState([]);
  const [currJobDetails, setJobDetails] = useState([
    {
      sectionName: "level 20",
      levelCap: 20,
      selected: 0,
    },
    {
      sectionName: "level 40",
      levelCap: 40,
      selected: 0,
    },
    {
      sectionName: "level 75",
      levelCap: 75,
      selected: 0,
    },
    {
      sectionName: "level 105",
      levelCap: 105,
      selected: 0,
    },
  ]);

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
        class: currCharClass,
      };

      let getJobList = await fetch("http://localhost:3000/get-job-list", {
        method: "POST",
        body: JSON.stringify({ charDetail: charDetail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let jobList = await getJobList.json();
      setJobLists(jobList.query);
    }

    getJobListData();
  }, [currRace, currCharClass]);

  useEffect(() => {
    // get skill list
    async function getSkillListData() {
      let charDetail = {
        race: currRace,
        class: currCharClass,
      };

      currJobDetails.map((jobDetail) => {
        charDetail = {
          ...charDetail,
          [`jobId${jobDetail.levelCap}`] : jobDetail.selected === 0 ? 'None' : jobDetail.selected
        }
      })

      let getSkillList = await fetch("http://localhost:3000/get-skill-list", {
        method: "POST",
        body: JSON.stringify({ charDetail: charDetail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let skillList = await getSkillList.json();

      console.log(skillList);
      setSkillLists(skillList.query);
    }

    getSkillListData();
  }, [currRace, currCharClass, currJobDetails])

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
      title: "Mage class",
      img: mageIcon,
      imgButton: true,
    },
    {
      label: "Fighter",
      title: "Fighter class",
      img: fighterIcon,
      imgButton: true,
    },
    {
      label: "Rogue",
      title: "Rogue class",
      img: archerIcon,
      imgButton: true,
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

  function onSelectJob({
    levelCap,
    value,
  }: {
    levelCap: number;
    value: number;
  }) {
    setJobDetails((prevDetails) => 
      prevDetails.map((prevDetail) => 
        prevDetail.levelCap === levelCap
          ? { ...prevDetail, selected: value }
          : prevDetail
      )
    );
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
          <SelectionOptionGroups
            sectionLists={currJobDetails}
            jobLists={currJobLists}
            onSelectJob={onSelectJob}
          />
        </div>
        <SkillOptions skillOptions={currSkillLists} />
        <SkillInfo />
      </div>
      <div className="sp-needed">
        <div className="stat-display">
          <span className="stat-label">Total SP</span>
          <span className="stat-value primary">
            {currSkillReqDetail.totalSP}
          </span>
        </div>
        <div className="stat-display">
          <span className="stat-label">Total Gold</span>
          <span className="stat-value accent">
            {currSkillReqDetail.totalGold}
          </span>
        </div>
        <div className="stat-display">
          <span className="stat-label">SP Remaining</span>
          <span className="stat-value success">
            {currSkillReqDetail.spRemain}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
