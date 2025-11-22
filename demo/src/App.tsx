import {
  RedenominationEngine,
  PREDEFINED_RULES,
} from 'currency-redenomination';
import { motion } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 via-purple-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:via-blue-950/20 dark:via-purple-950/20 dark:to-slate-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      <Hero indonesiaResult={indonesiaResult.amount} indonesiaFormatted={indonesiaFormatted} />
      <Features />
      <QuickStart />
      <Examples indonesiaFormatted={indonesiaFormatted} turkeyFormatted={turkeyFormatted} />
      <APIOverview />
      <UseCases />
      <Contributing />
      <Footer />
    </motion.div>
  );
}

export default App;
