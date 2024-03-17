import { ThemeProvider } from "./components/theme/theme-providder";
import { AmountProvider } from "./context/amount-provider";
import { ModeToggle } from "./components/theme-toggle/theme-toggle";
import FormWrapper from "./components/form/Form";
import Container from "./components/ui/container";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AmountProvider>
        <div className="container p-10">
        <ModeToggle />
        <div className="flex flex-col items-center justify-center gap-5">
        <FormWrapper/>
        <Container/>
        </div>
        </div>
      </AmountProvider>
    </ThemeProvider>
  );
}

export default App;
