import { useQueryClient } from "@tanstack/react-query";
import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <RouteComponent />,
});

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className="w-full h-full p-2 flex flex-col gap-2 items-center justify-content-center my-10">
      <div className="flex items-start justify-between gap-1">
        {location.pathname !== "/" ? (
          <button
            className="bg-black  border-white border-1 px-4 py-1 rounded text-white font-bold"
            onClick={() => navigate({ to: "/" })}
          >
            Back
          </button>
        ) : (
          <span className="font-bold text-xl">Home</span>
        )}
        <button
          className="bg-gray-600 border-white border-1 px-4 py-1 rounded text-white font-bold hover:bg-gray-400"
          onClick={() => {
            if (location.pathname !== "/") {
              queryClient.invalidateQueries({ queryKey: ["charater"] });
            } else {
              queryClient.invalidateQueries({ queryKey: ["charaters"] });
            }
          }}
        >
          Refetch
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
