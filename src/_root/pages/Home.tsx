import { Models } from "appwrite";
import Loader from "../../components/shared/Loader";
import { useGetRecentPosts } from "../../lib/react-query/queryandmutations";
import PostCard from "../../components/shared/PostCard";

// == step 62 create comp
export default function Home() {
  const { data: posts, isLoading: isPostLoading } = useGetRecentPosts(); //== step 66
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// == step 63 in query&mutation
//== step 67 create PostCard.tsx
