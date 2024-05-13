import { StateCreator } from "zustand";
import get from "lodash/get";
import { storage } from "services";

export type TTheme = "dark" | "light";

export interface ISystemInitialState {
  lang: string;
  theme: TTheme;
  loadingStatus: boolean;
}

export const SystemInitialState: ISystemInitialState = {
  lang: "uz",
  theme: "light",
  //@ts-ignore
  loadingStatus: false,
};

export interface ISystem {
  system: ISystemInitialState;
  setLang: (action: { [key: string]: any }) => void;
  setLoadingStatus: (data: any) => any;
  changeTheme: (data: string) => any
}

export const systemSlice: StateCreator<ISystem, [], []> = (set): ISystem => {
  return {
    system: SystemInitialState,
    setLang: (action: { [key: string]: any }) => {
      return set((state) => {
        return {
          system: {
            ...get(state, "system"),
            lang: "ru",
          },
        };
      });
    },
    setLoadingStatus: (action: boolean) => {
      return set((state) => {
        // storage.set("loadingStatus", JSON.stringify(action))
        return {
          system: {
            ...get(state, "system"),
            loadingStatus: action,
          },
        };
      });
    },
    changeTheme: (action: string) => {
      return set((state: any) => {
        return {
          system: {
            ...get(state, 'system'),
            theme: action,
          },
        }
      })
    },
  };
};
