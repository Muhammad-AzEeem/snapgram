import { useGetUsers } from "../../lib/react-query/queryandmutations";
import { useToast } from "../../components/ui/use-toast";
import Loader from "../../components/shared/Loader";
import UserCard from "../../components/shared/UserCard";

export default function AllUsers() {
  const { toast } = useToast();
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {Array.isArray(creators)
              ? creators.map((creator) => (
                  <li
                    key={creator?.$id}
                    className="flex-1 min-w-[200px] w-full"
                  >
                    <UserCard user={creator} />
                  </li>
                ))
              : creators?.documents?.map((creator: any) => (
                  <li
                    key={creator?.$id}
                    className="flex-1 min-w-[200px] w-full"
                  >
                    <UserCard user={creator} />
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
}
