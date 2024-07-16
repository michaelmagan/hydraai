import { HydraClient } from "hydra-ai";
import { ProfileCardList } from "./components/profile-card-list";
import { SendMessageList } from "./components/send-message-list";
import { getProfiles } from "./services/profile-service";

const hydra = new HydraClient();

hydra.registerComponent(
  "ProfileCardList",
  ProfileCardList,
  {
    profiles: "{id: string, name: string, imageUrl: string, about: string}[]",
  },
  getProfiles
);

hydra.registerComponent("SendMessageList", SendMessageList, {
  messages: "{id: string, to: string, message: string}[]",
});

export default hydra;
