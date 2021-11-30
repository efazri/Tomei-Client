import { DesktopView, MobileView } from './Components';

function App() {
  return (
    <>
      <div className="desktop-view">
        <DesktopView />
      </div>

      <div className="mobile-view">
          <MobileView />
      </div>
    </>
  );
}

export default App;
