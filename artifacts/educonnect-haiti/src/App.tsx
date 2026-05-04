import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
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
import ProgressDashboard from "@/pages/progress-dashboard";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  useEffect(() => {
    if (!loading && !user) navigate("/connexion");
  }, [user, loading, navigate]);
  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Chargement…</div>;
  if (!user) return null;
  return <Component />;
}

function PublicOnlyRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  useEffect(() => {
    if (!loading && user) navigate("/cours");
  }, [user, loading, navigate]);
  if (loading) return null;
  if (user) return null;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/connexion">
        <PublicOnlyRoute component={Login} />
      </Route>
      <Route path="/inscription">
        <PublicOnlyRoute component={Register} />
      </Route>
      <Route path="/cours">
        <ProtectedRoute component={Courses} />
      </Route>
      <Route path="/cours/:id">
        <ProtectedRoute component={CourseDetail} />
      </Route>
      <Route path="/progression">
        <ProtectedRoute component={ProgressDashboard} />
      </Route>
      <Route path="/orientation">
        <ProtectedRoute component={Orientation} />
      </Route>
      <Route path="/opportunites">
        <ProtectedRoute component={Opportunities} />
      </Route>
      <Route path="/centres">
        <ProtectedRoute component={Centers} />
      </Route>
      <Route path="/ecoles">
        <ProtectedRoute component={Schools} />
      </Route>
      <Route path="/a-propos" component={About} />
      <Route path="/admin">
        <ProtectedRoute component={Admin} />
      </Route>
      <Route path="/fiches">
        <ProtectedRoute component={Flashcards} />
      </Route>
      <Route path="/fiches/:courseId">
        <ProtectedRoute component={Flashcards} />
      </Route>
      <Route path="/calendrier">
        <ProtectedRoute component={CalendarPage} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
