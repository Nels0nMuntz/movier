import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { PrimaryButton } from "../PrimaryButton"
import { FAIcon } from "components/common/FAIcon/FAIcon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


describe("PrimaryButton component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<PrimaryButton />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it("should render button text correctly", () => {
    const text = "Primary Button";
    render(<PrimaryButton>{text}</PrimaryButton>);
    const element = screen.getByText(text);
    expect(element).toBeInTheDocument();
  });
 
  it("should fill all avalable space", () => {
    const text = "Primary Button Fluid";
    render(<PrimaryButton fluid>{text}</PrimaryButton>);
    const element = screen.getByText(text).parentElement;
    expect(element).toHaveStyle({ "width": "100%" });
  });

  it("should render button icon correctly", () => {
    const testId = "icon-element"
    const icon = (
      <span data-testid={testId}>
        <FAIcon icon={faPlus}/>
      </span>
    )
    render(<PrimaryButton icon={icon}>Primary Button</PrimaryButton>);
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });
})