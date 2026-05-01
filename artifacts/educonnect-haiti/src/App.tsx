import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
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

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Redirect to="/" />;

  return <>{children}</>;
}

function ProtectedAdmin() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [, navigate] = useLocation();

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  if (user?.role !== "admin" && user?.role !== "teacher") {
    navigate("/cours");
    return null;
  }

  return <Admin />;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) return <Redirect to="/cours" />;

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      {/* Public routes — accessible without login */}
      <Route path="/">
        <PublicOnlyRoute>
          <Home />
        </PublicOnlyRoute>
      </Route>

      <Route path="/connexion">
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      </Route>

      <Route path="/inscription">
        <PublicOnlyRoute>
          <Register />
        </PublicOnlyRoute>
      </Route>

      {/* Protected routes — require authentication */}
      <Route path="/cours">
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      </Route>

      <Route path="/cours/:id">
        {(params) => (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/orientation">
        <ProtectedRoute>
          <Orientation />
        </ProtectedRoute>
      </Route>

      <Route path="/opportunites">
        <ProtectedRoute>
          <Opportunities />
        </ProtectedRoute>
      </Route>

      <Route path="/centres">
        <ProtectedRoute>
          <Centers />
        </ProtectedRoute>
      </Route>

      <Route path="/ecoles">
        <ProtectedRoute>
          <Schools />
        </ProtectedRoute>
      </Route>

      <Route path="/a-propos">
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      </Route>

      <Route path="/fiches">
        <ProtectedRoute>
          <Flashcards />
        </ProtectedRoute>
      </Route>

      <Route path="/fiches/:courseId">
        {(params) => (
          <ProtectedRoute>
            <Flashcards />
          </ProtectedRoute>
        )}
      </Route>

      <Route path="/calendrier">
        <ProtectedRoute>
          <CalendarPage />
        </ProtectedRoute>
      </Route>

      <Route path="/admin" component={ProtectedAdmin} />

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
