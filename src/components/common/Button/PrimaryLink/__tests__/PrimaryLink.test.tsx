import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { FAIcon } from "components/common/FAIcon/FAIcon";
import { faAd } from "@fortawesome/free-solid-svg-icons";

import { PrimaryLink, Props } from "../PrimaryLink";


describe("PrimaryLink", () => {
  let props: Partial<Props> = {};

  beforeEach(() => {
    props = {
      href: "/",
      children: "Link",
    }
  });

  const renderElement = () => {
    return render(
      <BrowserRouter>
        <PrimaryLink {...props as Props} />
      </BrowserRouter>
    );
  };

  it("renders correctly", () => {
    expect(renderElement().getByRole("link")).toMatchSnapshot();
  });

  it("renders `href` attribute correctly", () => {
    expect(renderElement().getByRole("link")).toHaveAttribute("href", props.href)
  });

  describe("when `children` prop is passed", () => {
    beforeEach(() => {
      props.children = "Link with children";
    });
    it("renders children", () => {
      expect(renderElement().getByText(props.children as string)).toBeInTheDocument()
    })
  });
  describe("when `children` prop is not passed", () => {
    beforeEach(() => {
      props.icon = undefined;
      props.children = undefined;
    });
    it("does not render children", () => {
      expect(renderElement().queryByTestId("primary-link-children")).toBeNull()
    })
  });
  describe("when `icon` prop is passed", () => {
    beforeEach(() => {
      props.icon = (
        <span data-testid="primary-link-icon">
          <FAIcon icon={faAd}/>
        </span>
      )
    });
    it("renders icon", () => {
      expect(renderElement().getByTestId("primary-link-icon")).toBeInTheDocument()
    })
  });
})