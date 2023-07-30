import { useRouter } from "next/router";
import Link from "next/link";

interface RoutingComponentProps {
  side: string;
}

const RoutingComponent: React.FC<RoutingComponentProps> = ({ side }) => {
  const router = useRouter();

  const isSideActive = (currentSide: string) => currentSide === side;

  return (
    <div className="flex justify-center">
      <Link
        href={{
          pathname: "trade",
          query: { ...router.query, side: "buy" },
        }}
        shallow={true}
        className={isSideActive("buy") ? "text-blue-500" : "text-gray-500"}
      >
        <div className="text-center pb-2 cursor-pointer">Buy</div>
      </Link>
      <Link
        href={{
          pathname: "trade",
          query: { ...router.query, side: "sell" },
        }}
        shallow={true}
        className={isSideActive("sell") ? "text-blue-500 ml-16" : "text-gray-500 ml-16"}
      >
        <div className="text-center pb-2 cursor-pointer">Sell</div>
      </Link>
      <Link
        href={{
          pathname: "withdraw-tokens",
        }}
        shallow={true}
        className={isSideActive("withdraw") ? "ml-16 text-blue-500" : "ml-16 text-gray-500"}
      >
        <div className="text-center pb-2 cursor-pointer">Withdraw</div>
      </Link>
      <Link
        href={{
          pathname: "transaction-logs",
        }}
        shallow={true}
        className={isSideActive("logs") ? "ml-16 text-blue-500" : "ml-16 text-gray-500"}
      >
        <div className="text-center pb-2 cursor-pointer">Logs</div>
      </Link>
    </div>
  );
};

export default RoutingComponent;
