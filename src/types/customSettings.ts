export interface CustomSettings {
  customUrl: string | null;
  password: string | null;
  deleteAfterDate: boolean;
  deleteAfterTime: boolean;
  deleteAfterRead: boolean;
  analitics: boolean;
  time: string;
  date: string;
}
export interface NormalizedCustomSettings {
  analitics: boolean;
  deleteAfterRead: boolean;
  deleteTime: number | null;
  customUrl: string | null;
  password: string | null;
}
export interface CustomSettingsContext {
  customSettings: CustomSettings;
  setCustomSettings: React.Dispatch<React.SetStateAction<CustomSettings>>;
}
export type CustomToggleTypes =
  | "deleteAfterRead"
  | "deleteAfterDate"
  | "analitics"
  | "deleteAfterTime";
