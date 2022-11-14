import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  const elContainer = "Header";

  const defaultProps = {
    title: "Xogito Challenge",
  };

  const renderComponent = (props = defaultProps) =>
    render(<Header {...props} />);

  const setup = (extraProps) => {
    const utils = renderComponent({ ...defaultProps, ...extraProps });

    const header = utils.getByTestId(elContainer);

    return {
      header,
      ...utils,
    };
  };

  it(`should render component #${elContainer}`, () => {
    const { header } = setup();

    expect(header).toBeTruthy();
  });

  it(`should render text inside tag component when title props is provided`, () => {
    const { getByText } = setup({ ...defaultProps });

    const text = getByText("Xogito Challenge");

    expect(text).toBeTruthy();
  });
});
