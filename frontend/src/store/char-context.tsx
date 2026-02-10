// context/CharacterContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type jobListModel from "../models/jobListModel";

interface JobDetail {
  sectionName: string;
  levelCap: number;
  selected: number;
}

interface CharacterContextValue {
  currRace: string;
  currCharClass: string;
  currJobDetails: JobDetail[];
  currJobLists: jobListModel[] | null;
  onChangeRace: (race: string) => void;
  onChangeClass: (charClass: string) => void;
  onSelectJob: ({levelCap, value} : {levelCap: number; value: number}) => void;
}

const CharacterContext = createContext<CharacterContextValue | undefined>(
  undefined,
);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [currRace, setRace] = useState("Elf");
  const [currCharClass, setCharClass] = useState("Mage");
  const [currJobLists, setJobLists] = useState(null);
  const [currJobDetails, setJobDetails] = useState<JobDetail[]>([
    { sectionName: "level 20", levelCap: 20, selected: 0 },
    { sectionName: "level 40", levelCap: 40, selected: 0 },
    { sectionName: "level 75", levelCap: 75, selected: 0 },
    { sectionName: "level 105", levelCap: 105, selected: 0 },
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

    async function fetchJobList() {
      const res = await fetch("http://localhost:3000/api/get-job-list", {
        method: "POST",
        body: JSON.stringify({ charDetail: { race: currRace, class: currCharClass } }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setJobLists(data.query);
    }

    fetchJobList();
  }, [currRace, currCharClass]);

  const onChangeRace = (race: string) => {
    setRace((prevRace) => {
      if (prevRace != race) {
        return race;
      } else {
        return prevRace;
      }
    });
  }

  const onChangeClass = (charClass: string) => {
    setCharClass((prevCharClass) => {
      if (prevCharClass != charClass) {
        return charClass;
      } else {
        return prevCharClass;
      }
    });
  }

  const onSelectJob = ({levelCap, value} : {levelCap: number; value: number}) => {
    setJobDetails((prevDetails) => 
      prevDetails.map((prevDetail) => 
        prevDetail.levelCap === levelCap
          ? { ...prevDetail, selected: value }
          : prevDetail
      )
    );
  }

  return (
    <CharacterContext.Provider
      value={{
        currRace,
        currCharClass,
        currJobLists,
        currJobDetails,
        onChangeRace,
        onChangeClass,
        onSelectJob,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterCtx = (): CharacterContextValue => {
  const ctx = useContext(CharacterContext);

  if (!ctx) {
    throw new Error(
      "useCharacterCtx must be used within a CharacterProvider"
    );
  }

  return ctx;
};
