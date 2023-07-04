import React from "react";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";

import { Section, StyledTab, TabPanel, TabPanelsWrap } from "./styled";
import { Movie, TVShow } from "types";
import { Slider } from "../Slider";
import { SectionTitle } from "../SectionTitle/SectionTitle";


interface SwitchableCollectionProps {
  title: string;
  collections: {
    title: string;
    items: Movie[] | TVShow[];
    loadItems?: () => void;
  }[]
}

export const SwitchableCollection = ({ collections, title }: SwitchableCollectionProps) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const handleChangeActiveTabIndex = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };
  return (
    <Section>
      <Container maxWidth="xl">
        <SectionTitle>{title}</SectionTitle>
        <Tabs
          value={activeTabIndex}
          onChange={handleChangeActiveTabIndex}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          {collections.map(({ title }, index) => (
            <StyledTab
              id={`collection-tab-${index}`}
              value={index}
              label={title}
              key={title}
              aria-controls={`collection-tabpanel-${index}`}
              disableRipple
            />
          ))}
        </Tabs>
        <TabPanelsWrap>
          {collections.map(({ items, title, loadItems }, index) => {
            const isActiveTab = activeTabIndex === index
            return (
              <TabPanel
                id={`collection-tabpanel-${index}`}
                className={`${isActiveTab ? "visible" : "hidden"}`}
                role="tabpanel"
                aria-labelledby={`collection-tab-${index}`}
                key={title}
              >
                <Slider
                  items={items}
                  sliderName={title}
                  loadItems={loadItems}
                />
              </TabPanel>
            )
          })}
        </TabPanelsWrap>
      </Container>
    </Section>
  )
};
