import { useQuery } from "@tanstack/react-query";
import { tokenBalanceService } from "@/resource/services/tokenBalance.service";
import { logout } from "../helpers/authHelper";
import router from "next/router";

export default function HeaderComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["tokenBalance"],
    queryFn: tokenBalanceService,
  });

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-end pt-4 bg-slate-100 pr-4">
      <h2 className="text-md font-medium py-2 text-green-700 mr-12">
        Balance: <span className="font-bold">{data}</span>
      </h2>
      <button
        className="text-md font-medium mr-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
