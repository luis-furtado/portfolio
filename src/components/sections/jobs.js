import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const data = [
    {
      frontmatter: {
        title: 'Arco Educação',
        url: 'https://arcoeducacao.com.br/',
        company: 'Arco Educação',
        range: 'Jun 2022 - Current',
      },
      html: `
        <li>Worked as project manager with technical skills of a big whitelabel project 
          with many products (5 whitelabel projects on education segment).</li><br>
        <li>Worked as a devops focused on AWS (Amazon Web Services) to improve monitoring, performance and 
        scalability of many applicationns on education segment.</li><br>
        <li>Worked on union of many databases not solid datas for a unique solid database for 
          some units of Arco Educação.</li><br>
        <p>Skills that I most exercise on this company:</p>
        <br>
        <ul className="skills-list">
            <li>Product Manager</li>
            <li>Tech Lead</li>
            <li>Devops</li>
            <li>Node.js</li>
            <li>React.js</li>
        </ul>
        `,
    },
    {
      frontmatter: {
        title: 'Mb Labs',
        url: 'https://mblabs.com.br/',
        company: 'Mb Labs',
        range: 'Mai 2020 - Mai 2022',
      },
      html: `
        <li>I participate with some technical lead functions, such as: supporting beginner devs, 
        reviewing pull requests mainly in backend, planning and organizing estimates and deliveries to the client.</li><br>
        <li>Main developer and tech leader role of the full education application 
          developed in ReactNative on app, NodeJs on backend ad Angular on dashboard (large application).
          <a style="color: #64ffda" href="https://apps.apple.com/br/app/pleno-projet/id1500961287" target="_blank">Pleno: Projet</a> / 
          <a style="color: #64ffda" href="https://apps.apple.com/br/app/pleno-inovadores-em-a%C3%A7%C3%A3o/id1552681193" target="_blank">Pleno: IEA</a>
        </li><br>
        <li>Development of the BTG Pactual backend (full LMS developed for BTG Pactual) 
          developed in NodeJS on backend, React on dashboard.
          <a style="color: #64ffda" href="https://apps.apple.com/br/app/btg-bankers/id1532769258?l=en" target="_blank">Btg Bankers</a>
        </li><br>
        <li>Development of Versa Fuel Backend, a complete application using internal 
        payment microservice, backend in NodeJS and dashboard in React (startup of innovation in supply) 
          <a style="color: #64ffda" href="https://versafuel.com.br/" target="_blank">Versa Fuel</a>
        </li><br>

        <p>Skills that I most exercise on this company:</p>
        <br>
        <ul className="skills-list">
            <li>Tech Lead</li>
            <li>Node JS</li>
            <li>React</li>
            <li>React Native</li>
            <li>Angular</li>
            <li>Microservice</li>
            <li>AWS</li>
        </ul>
      `
    },
    {
      frontmatter: {
        title: 'Box IT Tecnologia',
        url: 'https://boxit.com.br/',
        company: 'Box IT Tecnologia',
        range: 'Ago 2019 - Mai 2020',
      },
      html: `
        <li>I participated in the development and maintenance of some CRM (Customer Relationship Management), 
        ERP (Enterprise Resource Planning) systems developed in VueJS (Javascript) and Laravel (PHP) and 
        developed some custom institutional websites.
        </li><br>
        <ul className="skills-list">
            <li>PHP</li>
            <li>Javascript ES6+</li>
            <li>Vue.js</li>
            <li>Laravel</li>
            <li>MySQL</li>
        </ul>
      `
    },
  ];
  const jobsData = data;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map((o , i) => {
              const { company } = o.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map((o, i) => {
              const { frontmatter, html } = o;
              const { title, url, company, range } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
