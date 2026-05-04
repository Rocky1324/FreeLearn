import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";

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
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

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
      <Route path="/admin" component={Admin} />
      <Route path="/fiches" component={Flashcards} />
      <Route path="/fiches/:courseId" component={Flashcards} />
      <Route path="/calendrier" component={CalendarPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
