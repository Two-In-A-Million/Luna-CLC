import { useCharacterCtx } from "../../store/char-context";
import { useSkillCtx } from "../../store/skills-provider";

import ButtonOptions from "../../components/button-options/ButtonOptions";
import LogoSet from "../../components/logo/LogoSet";
import SelectionOptionGroups from "../../components/selection-option-groups/SelectionOptionGroups";
import SkillOptions from "../../components/skill-options/SkillOptions";
import SkillInfo from "../../components/skill-info/SkillInfo";
import NowLoading from "../../components/loading/NowLoading";

import mageIcon from "../../assets/mage.png";
import fighterIcon from "../../assets/fighter.png";
import archerIcon from "../../assets/rogue.png";

export default function MainSection() {
  const {
    currRace,
    currCharClass,
    currJobLists,
    currJobDetails,
    onChangeRace,
    onChangeClass,
    onSelectJob,
  } = useCharacterCtx();
  const { currSkillLists, currSkillLevels, currSkillReqDetail, isLoading } =
    useSkillCtx();

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

  return (
    <div className="main-div">
      {isLoading ? (
        <NowLoading />
      ) : (
        <>
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
            <SkillOptions
              skillOptions={currSkillLists}
              skillLevels={currSkillLevels}
            />
            <SkillInfo />
          </div>
          <div className="sp-needed">
            <div className="stat-display">
              <span className="stat-label">Total SP</span>
              <span className="stat-value primary">
                {currSkillReqDetail.total_sp}
              </span>
            </div>
            <div className="stat-display">
              <span className="stat-label">Total Gold</span>
              <span className="stat-value accent">
                {currSkillReqDetail.total_gold}
              </span>
            </div>
            <div className="stat-display">
              <span className="stat-label">SP Remaining</span>
              <span className="stat-value success">
                {currSkillReqDetail.sp_remain}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
