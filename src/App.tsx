import { CurrentScreen } from "./screens";
import { Logo } from "./components";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.background}>
      <Logo />
      <CurrentScreen />
    </div>
  );
}

export default App;
