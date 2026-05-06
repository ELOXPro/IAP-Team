import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import TodoApp from "./TodoApp";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-auto text-2xl gap-8">
      <TodoApp />
      <button
        className="w-48 h-10 bg-red-500 font-bold text-white hover:bg-red-800 text-center rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
