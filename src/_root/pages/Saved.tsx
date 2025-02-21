import { Models } from "appwrite";
import { useGetCurrentUser } from "../../lib/react-query/queryandmutations";
import Loader from "../../components/shared/Loader";
import GridPostList from "../../components/shared/GridPostList";

export default function Saved() {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .filter((savePost: Models.Document) => savePost.post !== null)
    .map((savePost: Models.Document) => ({
      ...savePost.post,
    }));

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      {/*  == step 126 */}
      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full max-w-5xl flex justify-center">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
}
