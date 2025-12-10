
import { useAuth } from "../contexts/AuthContext";
import RecentPastes from "../components/home/RecentPastes";
import CreatePaste from "../components/home/CreatePaste";
import useFetchPastes from "../hooks/useFetchPastes";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useAuth();
  const { data: pasteList, loading, error, fetchPastes } = useFetchPastes(user?.$id);

  // Handler for create paste
  const handleCreatePaste = (pasteData) => {
    if (!user) {
      toast.error("Please login to create a paste");
      return;
    }
    return pasteData;
  };

    const sortedList = pasteList
    ? [...pasteList].sort(
        (a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt)
      )
    : [];

  return (
    <div className="min-h-screen ">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pass user and handleCreatePaste to CreatePaste */}
          <CreatePaste fetchData={fetchPastes} onCreate={handleCreatePaste} user={user} />
          
          <div className="lg:col-span-1">
            <RecentPastes pasteList={sortedList} loading={loading} fetchData={fetchPastes}/>
          </div>
        </div>
      </div>
    </div>
  );
}
