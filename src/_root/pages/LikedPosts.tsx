import GridPostList from "../../components/shared/GridPostList";
import Loader from "../../components/shared/Loader";
import { useGetCurrentUser } from "../../lib/react-query/queryandmutations";

export default function LikedPosts() {
  const { data: currentUser } = useGetCurrentUser(); // == step 127

  // == step 128
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // == step 128 from line 18 to 24
  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
}

// == step 129 api.ts
