import { z } from "zod";

// profile-photos-row types
export const ProfilePhotoProps = z
  .object({
    container: z
      .object({
        className: z
          .string()
          .optional()
          .describe(
            "Use tailwinds classes to style the container here is an example: 'profile-photo bg-black text-white p-4 rounded-lg'"
          ),
      })
      .optional(),
    info: z
      .object({
        className: z
          .string()
          .optional()
          .describe(
            "Use tailwinds classes to style the info here is an example: 'profile-photo__info p-2'"
          ),
        name: z.string().optional(),
        nameClass: z
          .string()
          .optional()
          .describe(
            "Use tailwinds classes to style the name here is an example: 'profile-photo__name text-lg font-bold'"
          ),
        description: z.string().optional(),
        descriptionClass: z
          .string()
          .optional()
          .describe(
            "Use tailwinds classes to style the description here is an example: 'profile-photo__description text-sm'"
          ),
      })
      .optional(),
    image: z
      .object({
        url: z
          .string()
          .optional()
          .describe(
            "Use one of these profiles: /profile_man_1.webp, /profile_woman_2.webp, /profile_woman_3.webp"
          ),
        className: z
          .string()
          .optional()
          .describe(
            "Use tailwinds classes to style the image here is an example: 'profile-photo__image w-full h-32 object-cover rounded-t-lg'"
          ),
      })
      .optional(),
  })
  .optional();

export type ProfilePhotoProps = z.infer<typeof ProfilePhotoProps>;
export const ProfilePhotoPropsArray = z.object({
  profiles: z
    .array(ProfilePhotoProps)
    .min(1)
    .max(3)
    .describe(
      "Array of profile photos with a minimum of 1 and a maximum of 3 items."
    ),
});
export type ProfilePhotoPropsArray = z.infer<typeof ProfilePhotoPropsArray>;
