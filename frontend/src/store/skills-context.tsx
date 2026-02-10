import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import skillListModel from "../models/skillListModel";
import type skillReqDetail from "../models/skillReqDetail";
import { useCharacterCtx } from "./char-context";
import SkillBuff from "../models/skillBuff";
import skillDetailModel from "../models/skillDetail";

interface SkillContextValue {
  currSkillLists?: skillListModel[];
  currSkillLevels: Record<number, number>;
  currSkillReqDetail: skillReqDetail;
  currSelectedSkill: skillDetailModel | undefined;
  updateSkillLevel: ({
    skill_id,
    command,
    max_level,
  }: {
    skill_id: number;
    command: string;
    max_level: number;
  }) => string;
  onClickSkill: ({ skill_id }: { skill_id: number }) => void;
  updateSpDetail: (skillId: number, changed: string) => Promise<void>;
  setSelectedSkillId: (skill_id: number | undefined) => void;
}

export const SkillsContext = createContext<SkillContextValue | undefined>(
  undefined,
);

export default function SkillsProvider({ children }: { children: ReactNode }) {
  const { currRace, currCharClass, currJobDetails } = useCharacterCtx();

  const [currSkillLists, setSkillLists] = useState<skillListModel[]>();
  const [currSkillLevels, setSkillLevels] = useState<Record<number, number>>(
    {},
  );
  const [currSkillReqDetail, setSkillReqDetail] = useState<skillReqDetail>({
    total_sp: 0,
    total_gold: 0,
    sp_remain: 3074,
  });
  const [currSelectedSkill, setSelectedSkill] = useState<skillDetailModel>();
  const [selectedSkillId, setSelectedSkillId] = useState<number>();

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

      setSkillLists(skillList.query);

      setSkillLevels({});

      setSkillReqDetail({
        total_sp: 0,
        total_gold: 0,
        sp_remain: 3074,
      });
    }

    getSkillListData();
  }, [currJobDetails, currRace, currCharClass]);

  useEffect(() => {
    if (!selectedSkillId) {
      return;
    }
    let curId = parseInt(
      selectedSkillId.toString() +
        (currSkillLevels[selectedSkillId] ?? 1).toString().padEnd(2, "0"),
    );
    fetchSkillDetail({ skill_id: curId });
  }, [selectedSkillId]);

  const updateSkillLevel = ({
    skill_id,
    command,
    max_level,
  }: {
    skill_id: number;
    command: string;
    max_level: number;
  }) => {
    console.log("skill lvl");
    if (currSkillLevels[skill_id]) {
      if (command == "add") {
        setSkillLevels((prev) => ({
          ...prev,
          [skill_id]: Math.min(max_level, (prev[skill_id] ?? 0) + 1),
        }));

        return "plus";
      } else {
        setSkillLevels((prev) => ({
          ...prev,
          [skill_id]: Math.max(0, (prev[skill_id] ?? 0) - 1),
        }));

        return "minus";
      }
    } else {
      command == "add" &&
        setSkillLevels((prev) => ({
          ...prev,
          [skill_id]: (prev[skill_id] ?? 0) + 1,
        }));

      return "plus";
    }
  };

  const updateSpDetail = async (skillId: number, changed: string) => {
    if (!skillId) {
      return;
    }

    let curLevel = currSkillLevels[skillId] ?? 1;
    let curId = parseInt(
      skillId.toString() + curLevel.toString().padEnd(2, "0"),
    );

    const skillDetail = await fetchSkillDetail({ skill_id: curId });

    if (skillDetail?.skill_point) {
      const sp =
      changed === "minus"
        ? -skillDetail.skill_point
        : skillDetail.skill_point;

      setSkillReqDetail((prev) => ({
        ...prev,
        ["total_sp"]: prev.total_sp + sp,
        ["sp_remain"]: prev.sp_remain - sp,
      }));
    }
  };

  const onClickSkill = ({ skill_id }: { skill_id: number }) => {
    setSelectedSkillId(skill_id);
  };

  const fetchSkillDetail = async ({ skill_id }: { skill_id: number }) => {
    let skill = {
      skillId: skill_id,
    };

    let getSkillDetail = await fetch(
      "http://localhost:3000/get-skill-list-detail",
      {
        method: "POST",
        body: JSON.stringify({ skill: skill }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    let skillDetailRaw = await getSkillDetail.json();
    let skillDetail = skillDetailRaw.query[0];

    setSelectedSkill(skillDetail);
    return skillDetail;
  };

  return (
    <SkillsContext.Provider
      value={{
        currSkillLists,
        currSkillLevels,
        currSkillReqDetail,
        currSelectedSkill,
        updateSkillLevel,
        onClickSkill,
        updateSpDetail,
        setSelectedSkillId,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkillCtx = (): SkillContextValue => {
  const ctx = useContext(SkillsContext);

  if (!ctx) {
    throw new Error("useCharacterCtx must be used within a CharacterProvider");
  }

  return ctx;
};
