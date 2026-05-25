import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type jobListModel from "../models/jobListModel";
import { API_URL, LEVEL_CAP, LEVEL_TIERS } from "../config.ts";

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
  onSelectJob: ({
    levelCap,
    value,
  }: {
    levelCap: number;
    value: number;
  }) => void;
}

const CharacterContext = createContext<CharacterContextValue | undefined>(
  undefined,
);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [currRace, setRace] = useState("Elf");
  const [currCharClass, setCharClass] = useState("Mage");
  const [currJobLists, setJobLists] = useState(null);
  const initialJobDetails = (): JobDetail[] =>
    LEVEL_TIERS.filter((cap) => cap < LEVEL_CAP).map((cap) => ({
      sectionName: `level ${cap}`,
      levelCap: cap,
      selected: 0,
    }));

  const [currJobDetails, setJobDetails] = useState<JobDetail[]>(initialJobDetails);

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
      const res = await fetch(`${API_URL}api/get-job-list`, {
        method: "POST",
        body: JSON.stringify({
          charDetail: { race: currRace, class: currCharClass, level_cap: LEVEL_CAP},
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setJobLists(data.query);
    }

    fetchJobList();
    setJobDetails(initialJobDetails());
  }, [currRace, currCharClass]);

  const onChangeRace = (race: string) => {
    setRace((prevRace) => {
      if (prevRace != race) {
        return race;
      } else {
        return prevRace;
      }
    });
  };

  const onChangeClass = (charClass: string) => {
    setCharClass((prevCharClass) => {
      if (prevCharClass != charClass) {
        return charClass;
      } else {
        return prevCharClass;
      }
    });
  };

  const onSelectJob = ({
    levelCap,
    value,
  }: {
    levelCap: number;
    value: number;
  }) => {
    setJobDetails((prevDetails) =>
      prevDetails.map((prevDetail) =>
        prevDetail.levelCap === levelCap
          ? { ...prevDetail, selected: value }
          : prevDetail,
      ),
    );
  };

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
    throw new Error("useCharacterCtx must be used within a CharacterProvider");
  }

  return ctx;
};
