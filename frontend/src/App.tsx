import { useState } from "react";
import mageIcon from "./assets/mage.png";
import warriorIcon from "./assets/swords.png";
import archerIcon from "./assets/archery.png";
import "./App.css";
import ButtonOptions from "./components/button-options/ButtonOptions";
import LogoSet from "./components/logo/LogoSet";
import SelectionOptionGroups from "./components/selection-option-groups/SelectionOptionGroups";

function App() {
  const [count, setCount] = useState(0);

  const raceOptions = [
    {
      label: "Elf",
      title: "mobil buat 1 keluarga besar",
      img: null,
      imgButton: false,
    },
    {
      label: "Crab",
      title: "kepiting, mau apa lagi?",
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
      avbOptions: ["Guardian", "Pecundang"],
    },
    {
      sectionName: "level 40",
      avbOptions: ["Gabut", "Gabut", "Gabut", "Gabut"],
    },
    {
      sectionName: "level 75",
      avbOptions: ["Whaler", "Whaler", "Whaler", "Whaler"],
    },
    {
      sectionName: "level 105",
      avbOptions: ["Master", "Master Baiter", "Master", "Sword Master"],
    }
  ];
  
  return (
    <div className="main-div">
      <LogoSet/>
      <div className="main-card">
        <div className="char-desc-div">
          <ButtonOptions sectionName="race" options={raceOptions} />
          <ButtonOptions sectionName="class" options={classOptions} />
          <SelectionOptionGroups sectionLists={selectionOptionGroups} />
        </div>
        <div className="skill-selection-div">
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div className="skill-qty-div">
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div className="skill-qty-div">
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div className="skill-qty-div">
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div className="skill-qty-div">
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div className="skill-qty-div">
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div className="skill-qty-div">
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div className="skill-qty-div">
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
          <div className="skill-card">
            <img src={archerIcon} className="skill-icon" />
            <p className="skill-name"> Arrow Rain </p>
            <div>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </div>
          </div>
        </div>
        <div className="other-detail-div">
          <div className="char-detail-div"></div>
          <div className="skill-detail-div"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
