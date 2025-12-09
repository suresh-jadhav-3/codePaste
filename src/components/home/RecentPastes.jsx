import { Clock } from "lucide-react";
import { LANGUAGES } from "../../utils/Languages";
import Button from "../common/Button";
import Loader from "../Loader";
import Card from "../common/Card";
import { useNavigate } from "react-router-dom";
import PasteCard from "../common/PasteCard";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function RecentPastes({ pasteList, loading }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewAll = () => {
    if (!user) {
      toast.error("Please login to view all pastes");
      return;
    }
    navigate("/pastes");
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-400" />
          Recent Pastes
        </h3>
        <Button
          onClick={handleViewAll}
          className="bg-transparent text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <Loader />
        ) : (
          <PasteCard
            pasteList={pasteList}
            LANGUAGES={LANGUAGES}
            onView={(id) => navigate(`/pastedCode/${id}`)}
            onEdit={(id) => navigate(`/pastedCode/${id}?edit=true`)}
            onDelete={(id) => console.log("Delete paste", id)}
          />
        )}
      </div>
    </Card>
  );
}

export default RecentPastes;
