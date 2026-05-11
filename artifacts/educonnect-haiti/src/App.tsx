import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import { LanguageProvider } from "@/hooks/use-language";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Public pages
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";

// App pages
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
import Dashboard from "@/pages/dashboard";
import Forum from "@/pages/forum";
import Annales from "@/pages/annales";
import OfflineSpace from "@/pages/offline-space";
import NotFound from "@/pages/not-found";
import { PwaInstallBanner } from "@/components/PwaInstallBanner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
  },
});

function P({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/bienvenue" component={Landing} />
      <Route path="/connexion" component={Login} />
      <Route path="/inscription" component={Register} />

      {/* Protected */}
      <Route path="/">{() => <P><Home /></P>}</Route>
      <Route path="/cours">{() => <P><Courses /></P>}</Route>
      <Route path="/cours/:id">{() => <P><CourseDetail /></P>}</Route>
      <Route path="/tableau-de-bord">{() => <P><Dashboard /></P>}</Route>
      <Route path="/orientation">{() => <P><Orientation /></P>}</Route>
      <Route path="/opportunites">{() => <P><Opportunities /></P>}</Route>
      <Route path="/centres">{() => <P><Centers /></P>}</Route>
      <Route path="/ecoles">{() => <P><Schools /></P>}</Route>
      <Route path="/a-propos">{() => <P><About /></P>}</Route>
      <Route path="/admin">{() => <P><Admin /></P>}</Route>
      <Route path="/fiches">{() => <P><Flashcards /></P>}</Route>
      <Route path="/fiches/:courseId">{() => <P><Flashcards /></P>}</Route>
      <Route path="/calendrier">{() => <P><CalendarPage /></P>}</Route>
      <Route path="/forum">{() => <P><Forum /></P>}</Route>
      <Route path="/annales">{() => <P><Annales /></P>}</Route>
      <Route path="/espace-hors-ligne">{() => <P><OfflineSpace /></P>}</Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <PwaInstallBanner />
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
