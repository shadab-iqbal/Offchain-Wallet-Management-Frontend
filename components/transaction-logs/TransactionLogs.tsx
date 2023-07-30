import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";

import { transactionsService } from "@/resource/services/transactions.service";
import RoutingComponent from "../routing/RoutingComponent";
import PasswordModal from "./PasswordModal";
import HeaderComponent from "../header/HeaderComponent";

interface Data {
  trnx_id: string;
  user_id: string;
  user_sent: string;
  user_received: string;
}

export default function TransactionLogsComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["transactionLogs"],
    queryFn: transactionsService,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <HeaderComponent />

      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Image
          className="absolute top-20"
          src="/DCL_logo_1.png"
          alt="DCL Logo"
          width={300}
          height={0}
        />

        <div className="flex justify-center">
          <RoutingComponent side="logs" />
        </div>

        <div className="w-full max-w-5xl bg-white mt-3 p-10 shadow-xl rounded-lg border border-blue-500">
          <PasswordModal />

          <table className="w-full">
            <thead>
              <tr>
                <th>Transaction Hash</th>
                <th>User Sent</th>
                <th>User Received</th>
              </tr>
            </thead>
            <tbody>
              {data.userTransactions.map((transaction: Data, index: number) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{transaction.trnx_id}</td>
                  <td style={{ textAlign: "center" }}>{transaction.user_sent}</td>
                  <td style={{ textAlign: "center" }}>{transaction.user_received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
