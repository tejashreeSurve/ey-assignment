import { createFileRoute, useParams } from "@tanstack/react-router";
import { useCharater } from "../api/hooks";

export const Route = createFileRoute("/$charaterId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { charaterId } = useParams({ from: "/$charaterId" });

  const { data, isPending } = useCharater(charaterId);

  if (isPending) {
    return (
      <div className="flex flex-col border-1  border-gray-200 p-3 rounded-2xl items-center shadow-2xl bg-white">
        <div className="w-100 h-100 rounded-2xl"></div>
        <div className="flex flex-col items-start gap-3 pt-3 w-120"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-1  border-gray-200 p-3 rounded-2xl items-center shadow-2xl bg-white">
      <img src={data?.image} className="w-100 h-100 rounded-2xl" />
      <div className="w-full flex flex-col items-start justify-items-start pt-3 gap-3">
        <h1 className="text-5xl font-bold">{data?.name}</h1>
        <div className="w-full flex flex-col items-start justify-items-start">
          <div className="flex flex-row gap-2 items-center">
            Gender: <span className="text-xl font-medium">{data?.gender}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            Location:{" "}
            <span className="text-xl font-medium ">{data?.location.name}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            Status: <span className="text-xl font-medium">{data?.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
