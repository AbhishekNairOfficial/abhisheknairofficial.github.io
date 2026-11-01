import Hero from './molecules/Hero';
import Experience from './organisms/Experience';
import Work from './organisms/Work';
import Clients from './molecules/Clients';
import LetsTalk from './organisms/LetsTalk';

const PortfolioPage = () => {
  return (
    <main id="main">
      <Hero />
      <Work />
      <Experience />
      <Clients />
      <LetsTalk />
    </main>
  );
};

export default PortfolioPage;
