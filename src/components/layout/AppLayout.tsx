
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Upload, Search, CreditCard, Settings, Home, FileText, BarChart3, LogIn, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import AuthDialog from "@/components/auth/AuthDialog";
import { useTheme } from "@/contexts/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";

export const AppLayout = () => {
  const location = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const menuItems = [
    { 
      title: "Home", 
      path: "/", 
      icon: Home 
    },
    { 
      title: "Upload Documents", 
      path: "/#upload", 
      icon: Upload 
    },
    { 
      title: "Match Documents", 
      path: "/#match", 
      icon: Search 
    },
    { 
      title: "My Documents", 
      path: "/#documents", 
      icon: FileText 
    },
    { 
      title: "Credits", 
      path: "/#credits", 
      icon: CreditCard 
    },
    { 
      title: "Admin Dashboard", 
      path: "/admin", 
      icon: Settings 
    }
  ];

  const handleThemeToggle = () => {
    toggleTheme();
    toast.success(`Switched to ${theme === "dark" ? "light" : "dark"} mode`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-white/10">
          <SidebarHeader className="flex items-center px-4 py-3 bg-sidebar-accent">
            <div className="flex items-center">
              <BarChart3 className="w-6 h-6 text-primary mr-2" />
              <h1 className="text-xl font-bold text-gradient tracking-tight">DocMatch</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-bold uppercase tracking-wider">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={cn(
                        "font-medium transition-all duration-200 hover:bg-primary/20",
                        location.pathname + location.hash === item.path 
                          ? "bg-primary/20 border-l-2 border-primary" 
                          : ""
                      )}>
                        <Link to={item.path} className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-secondary/30">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <Toggle 
                  pressed={theme === "light"}
                  onPressedChange={handleThemeToggle}
                  className="mr-4 border border-primary/20 hover:bg-primary/10"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Toggle>
              </div>
              <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20">
                    <LogIn className="h-4 w-4" />
                    <span>Login / Sign Up</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthDialog onClose={() => setAuthOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
