import { Props, SmallCard } from "../SmallCard";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import { log } from "console";


let props: Partial<Props> = {};

const renderComponent = () => shallow(
  <BrowserRouter>
    <SmallCard {...props as Props} />
  </BrowserRouter>
)

describe("SmallCard", () => {
  beforeEach(() => {
    props = {
      adult: false,
      genres: ["Action", "Trailer"],
      poster_path: "https://image.tmdb.org/t/p/w300/zsbolOkw8RhTU4DKOrpf4M7KCmi.jpg",
      release_date: "2023-07-06",
      sourcePath: "/movie/457332",
      title: "Hidden Strike"
    }
  });
  it("renders correctly", () => {
    expect(renderComponent()).toMatchSnapshot()
  });
  describe("when `adult` prop is passed", () => {
    beforeEach(() => {
      props.adult = true
    });
    it("renders `18+` text", () => {
      expect(renderComponent().find({ children: "18+" })).toHaveLength(1)
    });
  });
  // describe("when `adult` prop is not passed", () => {
  //   it("does not render `18+` text", () => {
  //     expect(renderComponent().find({ children: "18+" }).html()).not.toBeInTheDocument()
  //   });
  // });
})