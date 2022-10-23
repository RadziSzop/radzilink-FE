import { z } from "zod";
import { ICustomSettings } from "../Customize/CustomizeForm/customizeForm";

const regex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const linkBarSchema = z
  .string({
    invalid_type_error: "CustomUrl must be a string",
  })
  .min(1, "Url can't be empty!")
  .max(8192, "Url is too long!")
  .regex(regex, "Url is invalid!")
  .trim();
const customSettingsShema = z.object({
  customUrl: z
    .string({
      invalid_type_error: "CustomUrl must be a string",
    })
    .max(8192, "Custom Url is too long.")
    .trim()
    .optional()
    .or(z.null().optional()),

  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password is too short.")
    .max(128, "Password is too long.")
    .trim()
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
export const validateCustomSettings = async (
  customSettings: ICustomSettings
) => {
  const normalizedCustomSettings: ICustomSettings = { ...customSettings };
  if (normalizedCustomSettings.customUrl === "") {
    normalizedCustomSettings.customUrl = null;
  }
  if (normalizedCustomSettings.password === "") {
    normalizedCustomSettings.password = null;
  }
  const customSettingsValidation = await customSettingsShema.safeParseAsync(
    normalizedCustomSettings
  );

  let customSettingsErrors = "";
  if (!customSettingsValidation.success) {
    customSettingsErrors = customSettingsValidation.error.issues
      .map((error) => {
        return error.message;
      })
      .join(" ");
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
