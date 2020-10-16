import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

const CountryProfile = ({ profileData }) => {
  const equityData = profileData.equity_level;
  const procurement = profileData.procurement;

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
              <p className="text-3xl font-extrabold text-gray-900">
                {equityData.unemployment_rate}%
              </p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Average income</h4>
              <p className="text-3xl font-extrabold text-gray-900">
                ${equityData.average_income}
              </p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Gender distribution</h4>
              <div className="flex">
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {equityData.gender_distribution.male}%
                  </p>
                  <p className="uppercase text-sm">male</p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {equityData.gender_distribution.female}%
                  </p>
                  <p className="uppercase text-sm">female</p>
                </div>
              </div>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>Age distribution</h4>
              <div className="flex flex-wrap">
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {equityData.age_distribution.level_1.value}%
                  </p>
                  <p className="uppercase text-sm">
                    {equityData.age_distribution.level_1.range} yrs
                  </p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {equityData.age_distribution.level_2.value}%
                  </p>
                  <p className="uppercase text-sm">
                    {equityData.age_distribution.level_2.range} yrs
                  </p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {equityData.age_distribution.level_3.value}%
                  </p>
                  <p className="uppercase text-sm">
                    {equityData.age_distribution.level_3.range} yrs
                  </p>
                </div>
                <div className="mr-8 mb-4 md:mb-0">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {equityData.age_distribution.level_4.value}%
                  </p>
                  <p className="uppercase text-sm">
                    {equityData.age_distribution.level_4.range} yrs
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {equityData.age_distribution.level_5.value}%
                  </p>
                  <p className="uppercase text-sm">
                    {equityData.age_distribution.level_5.range}
                  </p>
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
              <p className="text-3xl font-extrabold text-gray-900">
                ${procurement.annual_spending}
              </p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>% of Procurement to GDP</h4>
              <p className="text-3xl font-extrabold text-gray-900">
                {procurement.gdp_percentage}%
              </p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>COVID-19 spending</h4>
              <p className="text-3xl font-extrabold text-gray-900">
                ${procurement.covid_spending}
              </p>
            </div>
            <div className="mr-4 md:mr-12 mb-6">
              <h4>% from total procurement market</h4>
              <p className="text-3xl font-extrabold text-gray-900">
                {procurement.total_procurement_market}%
              </p>
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

export default CountryProfile;
