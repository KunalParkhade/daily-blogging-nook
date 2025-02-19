
import { useEffect, useState } from "react";
import { BlogPost } from "./BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  created_at: string;
  read_time: number;
  image_url: string;
  topic: string;
}

export const BlogGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let query = supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (selectedTopic !== "all") {
          query = query.eq('topic', selectedTopic);
        }

        const { data, error } = await query.limit(6);

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTopics = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('topic')
          .eq('status', 'published')
          .distinct();

        if (error) throw error;
        const uniqueTopics = data?.map(item => item.topic) || [];
        setTopics(["all", ...uniqueTopics]);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchPosts();
    fetchTopics();
  }, [selectedTopic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm">
            <SelectValue placeholder="Select topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPost
            key={post.id}
            title={post.title}
            excerpt={post.excerpt || ""}
            date={new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
            readTime={post.read_time.toString()}
            image={post.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
          />
        ))}
      </div>
      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts found for this topic</p>
        </div>
      )}
    </div>
  );
};
