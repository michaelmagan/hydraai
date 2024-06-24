import Hydra from "hydra-ai"; // no more lint errors, but nextjs is not recognizing it as a package...

import ProfilePhotosRow from "../components/profile-photos-row";
import { ProfilePhotoPropsArray } from "../components/types";

export const initHydra = (openAIKey: string) => {
  const hydra = new Hydra(openAIKey);

  hydra.registerComponent("profilephotosrow", ProfilePhotosRow, {
    // getting a lint error saying this isn't the right type.
    photos: ProfilePhotoPropsArray,
  });
  return hydra;
};
