
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { RichTextEditor } from "./RichTextEditor";

interface PostFormProps {
  post?: {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    image_url?: string;
    status: "draft" | "published";
    topic?: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PostForm = ({ post, onSuccess, onCancel }: PostFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    image_url: post?.image_url || "",
    status: post?.status || "draft",
    topic: post?.topic || "general",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const postData = {
        ...formData,
        author_id: user.id,
        read_time: Math.ceil(formData.content.split(" ").length / 200), // Rough estimate: 200 words per minute
      };

      const { error } = post
        ? await supabase
            .from("posts")
            .update(postData)
            .eq("id", post.id)
        : await supabase
            .from("posts")
            .insert([postData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: post ? "Post updated successfully" : "Post created successfully",
      });
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <RichTextEditor
            content={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          />
        </div>

        <div>
          <Label htmlFor="topic">Topic</Label>
          <Input
            id="topic"
            value={formData.topic}
            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
            placeholder="Enter topic (e.g., technology, lifestyle, travel)"
            required
          />
        </div>

        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "draft" | "published" }))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post ? "Update" : "Create"} Post
        </Button>
      </div>
    </form>
  );
};
