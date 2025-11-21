import {
  RedenominationEngine,
  PREDEFINED_RULES,
} from 'currency-redenomination';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import QuickStart from './components/QuickStart';
import Examples from './components/Examples';
import APIOverview from './components/APIOverview';
import UseCases from './components/UseCases';
import Contributing from './components/Contributing';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Demo calculations for live examples
  const indonesiaEngine = new RedenominationEngine(PREDEFINED_RULES.indonesia2027);
  const indonesiaResult = indonesiaEngine.convertForward(1000000);
  const indonesiaFormatted = indonesiaEngine.format(indonesiaResult.amount);

  const turkeyEngine = new RedenominationEngine(PREDEFINED_RULES.turkey2005);
  const turkeyResult = turkeyEngine.convertForward(1000000);
  const turkeyFormatted = turkeyEngine.format(turkeyResult.amount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      <Hero indonesiaResult={indonesiaResult.amount} indonesiaFormatted={indonesiaFormatted} />
      <Features />
      <QuickStart />
      <Examples indonesiaFormatted={indonesiaFormatted} turkeyFormatted={turkeyFormatted} />
      <APIOverview />
      <UseCases />
      <Contributing />
      <Footer />
    </div>
  );
}

export default App;
