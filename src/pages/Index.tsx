
import { FeaturedPost } from "@/components/FeaturedPost";
import { BlogGrid } from "@/components/BlogGrid";
import { ImageGenerator } from "@/components/ImageGenerator";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <header className="mb-16 text-center relative">
          <div className="absolute right-0 top-0">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Daily Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-lg text-gray-600"
          >
            Thoughts, stories and ideas.
          </motion.p>
        </header>
        <div className="mb-8">
          <ImageGenerator />
        </div>
        <FeaturedPost />
        <BlogGrid />
      </motion.div>
    </div>
  );
};

export default Index;
