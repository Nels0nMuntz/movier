import React from "react";
import { observer } from "mobx-react-lite";
import { Section } from "./styled";
import Container from "@mui/material/Container";

import { SectionTitle } from "../SectionTitle/SectionTitle";
import { Movie } from "types";
import { Slider } from "../Slider";


interface Props {
  title: string;
  items: Movie[];
  loadItems?: () => void;
}

export const ScrollableCollection: React.FC<Props> = observer(({ title, items, loadItems }) => { 
  return (
    <Section>
      <Container maxWidth="xl">
        <SectionTitle>{title}</SectionTitle>
        <Slider
          items={items}
          sliderName={title}
          loadItems={loadItems}
        />
      </Container>
    </Section>
  )
});
