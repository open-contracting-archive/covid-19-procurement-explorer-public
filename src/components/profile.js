import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

const Profile = () => {
  return (
    <Accordion allowMultipleExpanded allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Equity Level</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="[ flex flex-wrap ] px-4">
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Unemployment rate</h4>
              <p className="text-3xl font-bold">3.4%</p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Average income</h4>
              <p className="text-3xl font-bold">$834</p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Gender distribution</h4>
              <div className="flex">
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-bold">48.1%</p>
                  <p className="uppercase text-sm">male</p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-bold">51.9%</p>
                  <p className="uppercase text-sm">female</p>
                </div>
              </div>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Age distribution</h4>
              <div className="flex flex-wrap">
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-bold">26.61%</p>
                  <p className="uppercase text-sm">0-14 yrs</p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-bold">17.9%</p>
                  <p className="uppercase text-sm">15-24 yrs</p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-bold">40.19%</p>
                  <p className="uppercase text-sm">25-54 yrs</p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-bold">7.82%</p>
                  <p className="uppercase text-sm">55-64 yrs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">5.31%</p>
                  <p className="uppercase text-sm">65 & above</p>
                </div>
              </div>
            </div>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Procurement</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="[ flex flex-wrap px-4 ] ">
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Annual public procurement spending</h4>
              <p className="text-3xl font-bold">$111.5B</p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>% of Procurement to GDP</h4>
              <p className="text-3xl font-bold">8%</p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>COVID-19 spending</h4>
              <p className="text-3xl font-bold">$12B</p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>% from total procurement market</h4>
              <p className="text-3xl font-bold">13%</p>
            </div>
          </div>
          <div className="px-4">
            <a href="" className="text-blue-600">
              See Mexico's procurement portal
            </a>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>COVID-19 Procurement Policy</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="px-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              dignissimos doloremque ratione explicabo. Voluptates quidem autem
              asperiores animi iure, labore eos corrupti provident voluptas
              illum ipsa voluptate reprehenderit fugiat accusantium.
            </p>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>COVID-19 Preparedness</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="px-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              dignissimos doloremque ratione explicabo. Voluptates quidem autem
              asperiores animi iure, labore eos corrupti provident voluptas
              illum ipsa voluptate reprehenderit fugiat accusantium.
            </p>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Profile;
