
import { motion } from "framer-motion";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

// Function to generate a consistent background color based on title
const getBackgroundGradient = (title: string) => {
  // Get a number from 0-5 based on the title's first character
  const colorIndex = title.toLowerCase().charCodeAt(0) % 6;
  
  const gradients = [
    'from-[#F2FCE2] to-[#FFDEE2]', // soft green to pink
    'from-[#FEF7CD] to-[#D3E4FD]', // soft yellow to blue
    'from-[#FEC6A1] to-[#E5DEFF]', // soft orange to purple
    'from-[#FFDEE2] to-[#FDE1D3]', // soft pink to peach
    'from-[#D3E4FD] to-[#F1F0FB]', // soft blue to gray
    'from-[#E5DEFF] to-[#FDE1D3]', // soft purple to peach
  ];

  return gradients[colorIndex];
};

export const BlogPost = ({ title, excerpt, date, readTime, image }: BlogPostProps) => {
  const backgroundGradient = getBackgroundGradient(title);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
    >
      <div className={`overflow-hidden rounded-lg bg-gradient-to-br ${backgroundGradient} transition-all duration-300 hover:shadow-lg`}>
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
