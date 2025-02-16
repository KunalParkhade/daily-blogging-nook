
import { FeaturedPost } from "@/components/FeaturedPost";
import { BlogGrid } from "@/components/BlogGrid";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <header className="mb-16 text-center">
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
        <FeaturedPost />
        <BlogGrid />
      </motion.div>
    </div>
  );
};

export default Index;
