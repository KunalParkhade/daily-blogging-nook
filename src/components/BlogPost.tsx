
import { motion } from "framer-motion";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export const BlogPost = ({ title, excerpt, date, readTime, image }: BlogPostProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg bg-blog-card transition-all duration-300 hover:shadow-lg">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 text-sm text-blog-muted">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600">
            {title}
          </h3>
          <p className="mt-2 text-blog-muted line-clamp-2">
            {excerpt}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
