
import { motion } from "framer-motion";

export const FeaturedPost = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative mb-16 overflow-hidden rounded-xl bg-blog-card"
    >
      <div className="aspect-[21/9] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Featured Post"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 p-8 text-white">
        <div className="flex items-center space-x-2 text-sm">
          <span>Featured Post</span>
          <span>•</span>
          <span>Mar 16, 2024</span>
          <span>•</span>
          <span>7 min read</span>
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          The Journey of a Daily Blogger
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-200">
          Embarking on a journey of daily blogging has transformed my perspective on writing, creativity, and personal growth.
        </p>
      </div>
    </motion.div>
  );
};
