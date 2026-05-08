/* eslint-disable */
// Root app — wires routes together.

const { useState: uSA, useEffect: uEA } = React;

function App() {
  const [route, setRoute] = uSA('home');

  uEA(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  const Page = ({
    home: window.HomePage,
    games: window.GamesPage,
    config: window.Configurator,
    web: window.WebPage,
    vps: window.VPSPage,
    pricing: window.PricingPage,
    status: window.StatusPage,
    locations: window.LocationsPage,
    dash: window.DashboardPage,
    support: window.SupportPage,
  })[route] || window.HomePage;

  return (
    <div className="app">
      <window.BFChrome.Topbar route={route} setRoute={setRoute} />
      <Page setRoute={setRoute} />
      <window.BFChrome.Footer setRoute={setRoute} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
