import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea.tsx";
import FileUploader from "../shared/FileUploader.tsx";
import { useNavigate } from "react-router-dom";
import { PostValidation } from "../../lib/validation/index.ts";
import { Models } from "appwrite";
import {
  useCreatePost,
  useUpdatePost,
} from "../../lib/react-query/queryandmutations.ts";
import { useUserContext } from "../../context/AuthContext.tsx";
import { useToast } from "../ui/use-toast.ts";
import Loader from "../shared/Loader.tsx";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

// == step 47 create comp
export default function PostForm({ post, action }: PostFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  // == step 57
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();

  // == step 97
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  // == step 59
  const { user } = useUserContext();

  // == step 50 to use PostValidation
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // == step 98
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost)
        toast({
          title: `Please try again.`,
        });

      return navigate(`/posts/${post.$id}`);
    }

    // == step 58
    const newPost = await createPost({
      ...values,
      // == step 60
      userId: user.id,
    });

    // == step 61
    if (!newPost) {
      toast({
        title: `Please try again.`,
      });
    }
    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label ">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                {/* // == step 48 create FileUploader   */}
                <FileUploader
                  fieldChange={field.onChange}
                  // == mediaurl here using for upade the exisiting post
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Js, React, Nextjs"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || (isLoadingUpdate && <Loader />)}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
}

// == step 48 in FileUploader
// == step 51 in api.ts
// == step 62 in Home
// == step 98 in PostDetails
