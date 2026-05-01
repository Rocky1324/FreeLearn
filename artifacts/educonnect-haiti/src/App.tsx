import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

// Pages
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Orientation from "@/pages/orientation";
import Opportunities from "@/pages/opportunities";
import Centers from "@/pages/centers";
import Schools from "@/pages/schools";
import About from "@/pages/about";
import Admin from "@/pages/admin";
import Flashcards from "@/pages/flashcards";
import CalendarPage from "@/pages/calendar";
import Login from "@/pages/login";
import Register from "@/pages/register";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function ProtectedAdmin() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [, navigate] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || (user?.role !== "admin" && user?.role !== "teacher")) {
    navigate("/connexion");
    return null;
  }

  return <Admin />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cours" component={Courses} />
      <Route path="/cours/:id" component={CourseDetail} />
      <Route path="/orientation" component={Orientation} />
      <Route path="/opportunites" component={Opportunities} />
      <Route path="/centres" component={Centers} />
      <Route path="/ecoles" component={Schools} />
      <Route path="/a-propos" component={About} />
      <Route path="/admin" component={ProtectedAdmin} />
      <Route path="/fiches" component={Flashcards} />
      <Route path="/fiches/:courseId" component={Flashcards} />
      <Route path="/calendrier" component={CalendarPage} />
      <Route path="/connexion" component={Login} />
      <Route path="/inscription" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
            <SonnerToaster richColors position="top-right" />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
