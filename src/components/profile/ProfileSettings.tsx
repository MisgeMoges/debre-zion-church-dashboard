import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Settings, User, Lock, LogOut, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  auth,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword as firebaseUpdatePassword,
} from "@/firebase"; // Adjust import based on your firebase setup
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface ProfileSettingsProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function ProfileSettings({ open, onClose, onLogout }: ProfileSettingsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Profile form state synced with Firebase user
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "", // optional
    photoURL: "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Settings state (you can persist in localStorage or elsewhere)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    autoSave: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setProfileData({
          name: user.displayName || "",
          email: user.email || "",
          phone: "", // You can fetch from your DB if you store phone/department
          department: "",
          role: "",
          photoURL: user.photoURL || "",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Update Firebase Auth profile info (displayName and photoURL) and email
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast({ title: "Error", description: "No user is signed in", variant: "destructive" });
      return;
    }

    try {
      if (profileData.name !== currentUser.displayName || profileData.photoURL !== currentUser.photoURL) {
        await firebaseUpdateProfile(currentUser, {
          displayName: profileData.name,
          photoURL: profileData.photoURL || null,
        });
      }

      if (profileData.email !== currentUser.email) {
        await firebaseUpdateEmail(currentUser, profileData.email);
      }

      // TODO: Save phone, department, role to your database if applicable

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  // Change password with reauthentication
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !currentUser.email) {
      toast({ title: "Error", description: "No user is signed in", variant: "destructive" });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Reauthenticate user before password update
      const credential = EmailAuthProvider.credential(currentUser.email, passwordData.currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await firebaseUpdatePassword(currentUser, passwordData.newPassword);

      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Failed to Change Password",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    onClose();
    onLogout();
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
          </DialogHeader>

          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-48 pr-6 border-r border-border">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}

                <Separator className="my-4" />

                <button
                  onClick={() => setShowLogoutDialog(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 pl-6 overflow-y-auto">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={profileData.photoURL || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg">
                          {profileData.name ? profileData.name[0].toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                        // Implement photo upload/change logic here if needed
                      >
                        <Camera className="w-3 h-3" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{profileData.name}</h3>
                      <p className="text-sm text-muted-foreground">{profileData.role || "User"}</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={profileData.department}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, department: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="btn-gradient">
                      Update Profile
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your password to keep your account secure.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <Button type="submit" className="btn-gradient">
                      Change Password
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your application preferences and settings.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for important updates
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                      </div>
                      <Switch
                        checked={settings.darkMode}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, darkMode: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Auto-save</Label>
                        <p className="text-sm text-muted-foreground">Automatically save changes</p>
                      </div>
                      <Switch
                        checked={settings.autoSave}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, autoSave: checked }))
                        }
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        className="btn-gradient"
                        onClick={() =>
                          toast({ title: "Settings saved", description: "Your preferences have been updated." })
                        }
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You will need to sign in again to access the dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm} className="bg-red-600 hover:bg-red-700">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

                     
