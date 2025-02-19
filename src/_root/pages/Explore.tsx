import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import SearchResults from "../../components/shared/SearchResults";
import GridPostList from "../../components/shared/GridPostList";
import {
  useGetPosts,
  useSearchPosts,
} from "../../lib/react-query/queryandmutations";
import useDebounce from "../../hooks/useDebounce";
import Loader from "../../components/shared/Loader";
import { useInView } from "react-intersection-observer";

// == step 105 from line 6 to 40
export default function Explore() {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts(); // == step 117

  const [searchValue, setSearchValue] = useState("");
  const debounce = useDebounce(searchValue, 500); // == step 116

  const { ref, inView } = useInView(); // == step 121

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debounce); // == step 114

  const shouldShowSearchResults = searchValue !== ""; //  == step 107

  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages?.every((item) => item?.documents.length === 0); // == step 108

  // == step 122
  useEffect(
    function () {
      if (inView && !searchValue) fetchNextPage();
    },
    [inView, searchValue]
  );

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7 ">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      {/*  == step 106 */}
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts?.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
      {/*  == step 120 */}
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
}

// == step 109 create SearchResults.tsx in shared folder
// == step 115 create hooks folder and create useDebounce.tsx
// == step 118 in GridPostList.tsx
// == step 123 in savePosts
