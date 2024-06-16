import React, { ReactElement } from "react";

const TestComp: React.FC = () => {
  return <div>test</div>;
};

export const generateComponent = async (
  message: string
): Promise<ReactElement> => {
  //TODO: use ai to pick component
  return componentList["testComp"];
};

const componentList: { [key: string]: ReactElement } = {
  testComp: <TestComp />,
};
