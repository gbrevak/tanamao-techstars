import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import CashFlow from "./pages/CashFlow";
import Quiz from "./pages/Quiz";
import Credit from "./pages/Credit";
import OpenFinance from "./pages/OpenFinance";
import ImportCSV from "./pages/ImportCSV";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RootRedirect() {
  const onboarded = localStorage.getItem('tanamao-onboarded');
  return <Navigate to={onboarded ? '/dashboard' : '/onboarding'} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adicionar" element={<AddTransaction />} />
          <Route path="/fluxo" element={<CashFlow />} />
          <Route path="/crescer" element={<Quiz />} />
          <Route path="/credito" element={<Credit />} />
          <Route path="/openfinance" element={<OpenFinance />} />
          <Route path="/importar-csv" element={<ImportCSV />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
