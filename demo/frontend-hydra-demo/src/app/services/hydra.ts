import Hydra from "hydra-ai"; // I think this is right but my linter won't recognize this package...

import ProfilePhotosRow from "../components/profile-photos-row";
import { ProfilePhotoPropsArray } from "../components/types";

export const initHydra = (openAIKey: string) => {
  const hydra = new Hydra(openAIKey);

  hydra.registerComponent("alertbox", ProfilePhotosRow, {
    photos: ProfilePhotoPropsArray,
  });
  return hydra;
};
