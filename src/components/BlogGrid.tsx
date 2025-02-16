
import { BlogPost } from "./BlogPost";

const posts = [
  {
    title: "Getting Started with Daily Blogging",
    excerpt: "Learn how to build a consistent writing habit and share your thoughts with the world.",
    date: "Mar 15, 2024",
    readTime: "5",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "The Art of Personal Writing",
    excerpt: "Discover how to find your unique voice and connect with your audience through authentic storytelling.",
    date: "Mar 14, 2024",
    readTime: "4",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    title: "Why Every Developer Should Blog",
    excerpt: "Explore the benefits of sharing your knowledge and experiences through technical writing.",
    date: "Mar 13, 2024",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  }
];

export const BlogGrid = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogPost key={index} {...post} />
      ))}
    </div>
  );
};
