export const Info = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <h1 className="text-2xl font-bold">HydraAI</h1>
      <p className="p-4">
        This is a demo that shows how Hydra lets you register components and
        lets AI choose from them and hydrate their props when needed.
      </p>
      <p className="p-4">
        After each user message we ask hydra to generate one of the components
        based on the conversation. The idea is to let Hydra decide when a user
        wants to see a certain feature and provide it, rather than hardcoding
        the layout of components and the flow of UX as with a usual app.
      </p>

      <p className="p-4">
        Note: The demo will try to respond with one of the components every
        message, even if it would not normally make sense to show one.
      </p>
    </div>
  );
};
