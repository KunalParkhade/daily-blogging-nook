
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { PostForm } from "@/components/PostForm";
import { PostsList } from "@/components/PostsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You do not have permission to access the admin panel.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
          <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </div>

        {isCreating ? (
          <PostForm onCancel={() => setIsCreating(false)} onSuccess={() => setIsCreating(false)} />
        ) : (
          <PostsList />
        )}
      </div>
    </div>
  );
};

export default Admin;
