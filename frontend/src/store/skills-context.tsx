import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import skillListModel from "../models/skillListModel";
import type skillReqDetail from "../models/skillReqDetail";
import { useCharacterCtx } from "./char-context";

interface SkillContextValue {
  currSkillLists?: skillListModel[];
  currSkillLevels: Record<number, number>;
  currSkillReqDetail: skillReqDetail;
  updateSkillLevel: ({skill_id, command, max_level} : {skill_id: number, command: string, max_level: number}) => void;
}

export const SkillsContext = createContext<SkillContextValue | undefined>(
  undefined,
);

export default function SkillsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { currRace, currCharClass, currJobDetails } = useCharacterCtx();

  const [currSkillLists, setSkillLists] = useState<skillListModel[]>();
  const [currSkillLevels, setSkillLevels] = useState<Record<number, number>>({});
  const [currSkillReqDetail, setSkillReqDetail] = useState<skillReqDetail>({
    total_sp: 0,
    total_gold: 0,
    sp_remain: 3074,
  });

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
          [`jobId${jobDetail.levelCap}`]:
            jobDetail.selected === 0 ? "None" : jobDetail.selected,
        };
      });

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
  }, [currJobDetails, currRace, currCharClass]);

  const updateSkillLevel = ({skill_id, command, max_level} : {skill_id: number, command: string, max_level: number})=>{
    if (currSkillLevels[skill_id]) {
      command == "add" 
      ?
      setSkillLevels((prev) => ({
        ...prev,
        [skill_id] : Math.min(max_level, (prev[skill_id] ?? 0) + 1)
      }))
      :
      setSkillLevels((prev) => ({
        ...prev,
        [skill_id] : Math.max(0, (prev[skill_id] ?? 0) - 1)
      }))
    }
    else
    {
      command == "add" &&
      setSkillLevels((prev) => ({
        ...prev,
        [skill_id] : (prev[skill_id] ?? 0) + 1
      }))
    }

  }

  return (
    <SkillsContext.Provider value={{ currSkillLists, currSkillLevels, currSkillReqDetail, updateSkillLevel}}>
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkillCtx = (): SkillContextValue => {
  const ctx = useContext(SkillsContext);

  if (!ctx) {
    throw new Error(
      "useCharacterCtx must be used within a CharacterProvider"
    );
  }
  
  return ctx;
};

