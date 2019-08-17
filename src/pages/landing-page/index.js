import React from 'react';
import './index.css';
import data from '../../config/landing-page.json';
import arrowIcon from '../../assets/down-arrow.svg';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h1 className="title">{data.title}</h1>
      <h3 className="quote">{data.quote}</h3>
      <div className="icons-holder">
        {data.links.map((link, key) => {
          return (
            <a
              key={key}
              aria-label={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`${link.icon} icon`} />
            </a>
          );
        })}
      </div>
      <a aria-label="chevron" href="#ProjectsPage">
        <img src={arrowIcon} alt="chevron-down" className="chevron-down" />
      </a>
    </div>
  );
};

export default LandingPage;
