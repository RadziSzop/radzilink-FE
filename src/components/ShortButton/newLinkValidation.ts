import { z } from "zod";
import {
  CustomSettings,
  NormalizedCustomSettings,
} from "../../types/customSettings";

const newLinkRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const customUrlRegex = /^[a-zA-Z0-9]+$/;

const linkBarSchema = z
  .string({
    invalid_type_error: "Url must be a string",
  })
  .min(1, "Url can't be empty.")
  .max(8192, "Url is too long.")
  .regex(newLinkRegex, "Url is invalid.")
  .trim();
const customSettingsShema = z.object({
  customUrl: z
    .string({
      invalid_type_error: "CustomUrl must be a string",
    })
    .regex(customUrlRegex, "Custom Url is invalid.")
    .max(8192, "Custom Url is too long.")
    .trim()
    .optional()
    .or(z.null().optional()),

  password: z
    .string({
      invalid_type_error: "Password must be a string.",
    })
    .min(6, "Password is too short.")
    .max(128, "Password is too long.")
    .trim()
    .optional()
    .or(z.null()),
  deleteTime: z
    .number({
      invalid_type_error: "Delete after time must be a boolean",
    })
    .min(Math.floor(new Date().getTime() / 1000), "You can't set past date")
    .optional()
    .or(z.null()),
  deleteAfterRead: z
    .boolean({
      invalid_type_error: "deleteAfterRead must be a boolean",
    })
    .optional()
    .or(z.null()),
  analitics: z
    .boolean({
      invalid_type_error: "analitics must be a boolean",
    })
    .optional()
    .or(z.null()),
});
//TODO: prevent shortening already shortened url
export const validateCustomSettings = async (
  customSettings: CustomSettings
) => {
  let deleteTime: number | null = null;
  if (customSettings.deleteAfterTime) {
    deleteTime =
      Math.floor(new Date().getTime() / 1000) +
      Number(customSettings.time.split(":")[0]) * 60 * 60 +
      Number(customSettings.time.split(":")[1]) * 60;
  } else if (customSettings.deleteAfterDate) {
    deleteTime = Math.floor(new Date(customSettings.date).getTime() / 1000);
  }
  const normalizedCustomSettings: NormalizedCustomSettings = {
    customUrl: customSettings.customUrl ? customSettings.customUrl : null,
    password: customSettings.password ? customSettings.password : null,
    deleteAfterRead: customSettings.deleteAfterRead,
    analitics: customSettings.analitics,
    deleteTime,
  };

  const customSettingsValidation = await customSettingsShema.safeParseAsync(
    normalizedCustomSettings
  );

  let customSettingsErrors = "";

  if (!customSettingsValidation.success) {
    customSettingsErrors = customSettingsValidation.error.issues
      .map((error) => {
        console.log(error.message, error.path);
        console.log(error);
        if (error.path[0] === "deleteTime") {
          return `Invalid input at ${
            customSettings.deleteAfterTime ? "time field." : "date field."
          }`;
        }

        return error.message;
      })
      .join("  ");
  }
  return { customSettingsErrors, normalizedCustomSettings };
};

export const validateLinkBar = async (linkBarValue: string) => {
  const normalizedLinkBarValue =
    linkBarValue.includes("https://") || linkBarValue.includes("http://")
      ? linkBarValue
      : `https://${linkBarValue}`;
  const linkValidation = await linkBarSchema.safeParseAsync(
    normalizedLinkBarValue
  );
  let linkBarErrors = "";
  if (!linkValidation.success) {
    linkBarErrors = linkValidation.error.issues
      .map((error) => {
        return linkBarValue.length > 0 ? error.message : "Url can't be empty!";
      })
      .join(" ");
  }
  return { linkBarErrors, normalizedLinkBarValue };
};
