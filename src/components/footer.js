import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {Luis Furtado Araujo
Software Engineer
(61) 99913-7803 luiscesm1@gmail.com
linkedin.com/in/luis-furtado-
github.com/luis-furtado
I am a software engineer with 7 years of experience across the entire software development lifecycle—from product
definition and requirement analysis to backend and frontend development, infrastructure, architecture, automated testing,
and software quality. Currently, I focus on technical leadership and full-stack development, with the goal of driving projects
to success by balancing scalability, performance, and maintainability.
RECENT WORK HISTORY
2022 - 2023
2022 - 2023
ARCO EDUCAÇÃO
Staff Software Engineer
2023 - Present
Led a team of five engineers in migrating multiple legacy services to well-architected, scalable microservices.
Achieved over $80K/year in cost savings through AWS FinOps initiatives optimizing legacy services.
Designed, developed, and maintained microservices with a strong foundation in software engineering principles and best
practices.
Senior Software Engineer
Technical leadership and development in JavaScript/TypeScript, Node.js, React, AWS, and various frameworks.
Developing and maintaining 6+ applications across different domains.
Technologies: Javascript, Typescript, NodeJS, NextJS, React, AWS and SQL.
MB LABS
Tech Lead
Technical leadership, including mentoring junior developers and providing guidance.
Code reviews, project planning and estimations, organizing timelines and deliveries for clients.
Lead developer and tech leader for a full-scale education application.
Software Engineer
2020 - 2022
Designing and developing robust web applications with a focus on scalability and performance.
Full-stack expertise, leveraging front-end and back-end technologies to drive innovation and deliver exceptional user
experiences.
Contributed to various applications, including for Versa Fuel, a geolocation startup built with Node.js (backend), React
(dashboard), and React Native (client-side).
Technologies: Javascript, Typescript, NodeJS, React Native, React, Angular, SQL, AWS.
BOX IT
2018 - 2019
Full Stack Web Developer
Developed and maintained CRM (Customer Relationship Management) and ERP (Enterprise Resource Planning) systems.
Tech stack: Vue.js (JavaScript) for the front end and Laravel (PHP) for the back end.
Built custom institutional websites tailored to specific business needs.
Technologies: JavaSript · NodeJS · Laravel · VueJS · SQL (MySQL) · Git
EDUCATION
University of Brasília – School of Science and Technology in Engineering (UnB FCTE)
B.S. Software Engineering
SKILLS
2018 - 2024
C
Problem
Solving
JavaScript
TypeScript
NodeJS
React
Next
AWS
Git
CI/CD
SQL
NoSQL
Software Architecture
Microservices
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`;

const Footer = () => {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    fetch('https://api.github.com/repos/bchiang7/v4')
      .then(response => response.json())
      .then(json => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabindex="-1">
        <a href="https://github.com/bchiang7/v4">
          <div>Designed &amp; Built by Brittany Chiang</div>

          {githubInfo.stars && githubInfo.forks && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )}
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
