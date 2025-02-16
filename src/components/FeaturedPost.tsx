
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface FeaturedPost {
  title: string;
  excerpt: string;
  created_at: string;
  read_time: number;
  image_url: string;
}

export const FeaturedPost = () => {
  const [post, setPost] = useState<FeaturedPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching featured post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPost();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] bg-gray-100 rounded-xl">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative mb-16 overflow-hidden rounded-xl bg-blog-card"
    >
      <div className="aspect-[21/9] w-full overflow-hidden">
        <img
          src={post.image_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 p-8 text-white">
        <div className="flex items-center space-x-2 text-sm">
          <span>Featured Post</span>
          <span>•</span>
          <span>{new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</span>
          <span>•</span>
          <span>{post.read_time} min read</span>
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          {post.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-200">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  );
};
