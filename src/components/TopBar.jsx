import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed top-right control cluster. Sits above the canvas (z-50) so the
 * animated particle background doesn't intercept clicks.
 */
const TopBar = () => (
  <div className="w-full flex justify-end px-4 py-4 z-50">
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <LanguageSelector />
    </div>
  </div>
);

export default TopBar;
