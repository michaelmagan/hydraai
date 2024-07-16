export default function AllComponentsPage() {
  return (
    <div
      className="flex flex-col min-h-screen  text-black p-4 justify-center items-center"
      style={{ backgroundColor: "#AAB7B5" }}
    >
      <div className="p-3 text-center">
        <div className="text-xs">
          These are the components Hydra knows about
        </div>
      </div>
      <div className=" w-full max-w-xl flex flex-col items-center"></div>
    </div>
  );
}
