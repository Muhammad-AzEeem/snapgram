import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts?: any;
};

// == step 109 create comp
export default function SearchResults({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) {
  if (isSearchFetching) return <Loader />;
  if (searchedPosts && searchedPosts.length > 0) {
    return <GridPostList posts={searchedPosts} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
}

// == step 110 in api.ts
