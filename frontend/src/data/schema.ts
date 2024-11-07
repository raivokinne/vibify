import { z } from "zod";

export const formSchema = z.object({
  files: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Please select at least one file",
    }),
});
