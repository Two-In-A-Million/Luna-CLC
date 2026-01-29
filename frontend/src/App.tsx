import { useState } from "react";
import lunaLogo from "./assets/luna-logo.png";
import mageIcon from "./assets/mage.png";
import warriorIcon from "./assets/swords.png";
import archerIcon from "./assets/archery.png";
import "./App.css";
import ButtonOptions from "./components/ButtonOptions";

function App() {
  const [count, setCount] = useState(0);

  const raceOptions = [
      {
          label : "Elf",
          title : "mobil buat 1 keluarga besar",
          imgButton: false
      },
      {
          label : "Crab",
          title : "kepiting, mau apa lagi?",
          imgButton: false
      }
  ];
  
  const classOptions = [
      {
          label : "mage",
          title : "mobil buat 1 keluarga besar",
          imgButton: false
      },
      {
          label : "Crab",
          title : "kepiting, mau apa lagi?",
          imgButton: false
      }
  ];


  return (
    <div className="main-div">
      <div className="logo-div">
        <a
          href="https://www.google.com/search?client=opera-gx&q=luna&sourceid=opera&ie=UTF-8&oe=UTF-8"
          target="_blank"
        >
          <img src={lunaLogo} className="logo" alt="Luna logo" />
          <p className="logo-p">Luna Skill Calculator</p>
        </a>
      </div>
      <div className="main-card">
        <div className="char-desc-div">
          <ButtonOptions sectionName="race" options={raceOptions}/>
          <ButtonOptions sectionName="class" options={classOptions}/>
          <div className="class-div">
            <p className="class-p"> Select Class </p>
            <div className="button-groups">
              <button
                onClick={() => setCount((count) => count + 1)}
                title="mage kayak kontol"
              >
                <img src={mageIcon} className="class-icon" />
              </button>
              <button
                onClick={() => setCount((count) => count + 1)}
                title="warrior chad"
              >
                <img src={warriorIcon} className="class-icon" />
              </button>
              <button
                onClick={() => setCount((count) => count + 1)}
                title="archer pew pew"
              >
                <img src={archerIcon} className="class-icon" />
              </button>
            </div>
          </div>
          <div className="level-div">
            <p className="level-p"> Level 20 </p>
            <div className="select">
              <select>
                <option>Guardian</option>
                <option>Pecundang</option>
              </select>
            </div>
            <p className="level-p"> Level 40 </p>
            <div className="select">
              <select>
                <option>Gabut</option>
                <option>Gabut</option>
                <option>Gabut</option>
                <option>Gabut</option>
              </select>
            </div>
            <p className="level-p"> Level 75 </p>
            <div className="select">
              <select>
                <option>Whaler</option>
                <option>Whaler</option>
                <option>Whaler</option>
                <option>Whaler</option>
              </select>
            </div>
            <p className="level-p"> Level 105 </p>
            <div className="select">
              <select>
                <option>Master</option>
                <option>Master Baiter</option>
                <option>Master</option>
                <option>Sword Master</option>
              </select>
            </div>
          </div>
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
