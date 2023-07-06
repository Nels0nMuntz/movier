import React from "react";
import { observer } from "mobx-react-lite";
import { Section } from "./styled";
import Container from "@mui/material/Container";

import { SectionTitle } from "../SectionTitle/SectionTitle";
import { Movie, TVShow } from "types";
import { SimpleSlider } from "../Slider";


interface Props {
  title: string;
  items: Movie[] | TVShow[];
  loadItems?: () => void;
}

export const ScrollableCollection: React.FC<Props> = observer(({ title, items, loadItems }) => { 
  return (
    <Section>
      <Container maxWidth="xl">
        <SectionTitle>{title}</SectionTitle>
        <SimpleSlider
          items={items}
          sliderName={title}
          loadItems={loadItems}
        />
      </Container>
    </Section>
  )
});
