import { useParams } from "react-router-dom";
import PostForm from "../../components/forms/PostForm";
import { useGetPostById } from "../../lib/react-query/queryandmutations";
import Loader from "../../components/shared/Loader";

export default function EditPost() {
  const { id } = useParams();

  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="w-full max-w-5xl flex-start gap-3 justify-start">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
}
