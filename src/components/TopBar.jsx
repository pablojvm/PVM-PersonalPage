import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed top-right control cluster. Sits above the canvas (z-50) so the
 * animated particle background doesn't intercept clicks.
 */
const TopBar = () => (
  <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
    <ThemeToggle />
    <LanguageSelector />
  </div>
);

export default TopBar;
