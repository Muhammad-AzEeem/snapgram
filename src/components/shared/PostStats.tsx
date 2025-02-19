import { Models } from "appwrite";
import { checkIsLiked } from "../../lib/utils";
import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "../../lib/react-query/queryandmutations";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

// == step 70 create comp
export default function PostStats({ post, userId }: PostStatsProps) {
  const likesList = post.likes.map((user: Models.Document) => user.$id); // == step 81
  const [likes, setLikes] = useState(likesList); // == step 82
  const [isSaved, setIsSaved] = useState(false); // == step 83g

  // == step 77
  const { mutate: likePost } = useLikePost();
  // == step 78
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  // == step 79
  const { mutate: deletePost, isPending: isDeletingSaved } =
    useDeleteSavePost();
  // == step 80
  const { data: currentUser } = useGetCurrentUser();

  // == step 87
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record?.post?.$id === post?.$id
  );
  // == step 88
  useEffect(
    function () {
      setIsSaved(savedPostRecord ? true : false);
    },
    [savedPostRecord]
  );

  // == step 84
  function handleLikePost(e: React.MouseEvent) {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id, likesArray: newLikes });
  }

  // == step 85
  function handleSavePost(e: React.MouseEvent) {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deletePost(savedPostRecord.$id);
    } else {
      savePost({ postId: post?.$id, userId });
      setIsSaved(true);
    }
  }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 ">
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

// == step 71 in api.ts
// == step 86 in querymutations
// == step 89 in Edit.tsx
