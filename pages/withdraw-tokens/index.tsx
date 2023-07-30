import { isLoggedIn } from "@/components/helpers/authHelper";
import WithdrawTokensComponent from "@/components/withdraw-tokens/WithdrawTokens";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TransactionLogsIndex() {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      setPageLoading(false);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (pageLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <WithdrawTokensComponent />
    </div>
  );
}
