import React from 'react';
import './index.css';
import data from '../../config/landing-page.json';
import arrowIcon from '../../assets/down-arrow.svg';
import MicrosoftIcon from '../../assets/microsoft.svg';
import GithubIcon from '../../assets/github.svg';
import MediumIcon from '../../assets/medium.svg';
import TwitterIcon from '../../assets/twitter.svg';
import QuoraIcon from '../../assets/quora.svg';
import LinkedinIcon from '../../assets/linkedin.svg';

export const getIcon = (icon) => {
  switch (icon) {
    case 'microsoft':
      return MicrosoftIcon;
    case 'linkedin':
      return LinkedinIcon;
    case 'twitter':
      return TwitterIcon;
    case 'quora':
      return QuoraIcon;
    case 'medium':
      return MediumIcon;
    case 'github':
      return GithubIcon;
    default:
      return GithubIcon;
  }
};

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
              <img alt="Social Icon" src={getIcon(link.icon)} />
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

export default React.memo(LandingPage);
