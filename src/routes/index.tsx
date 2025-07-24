import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useFetchCharates } from "../api/hooks";
import type { Charater } from "../api/fetchers";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search) => ({
    page: parseInt(search.page as string) || 0,
    pageSize: parseInt(search.pageSize as string) || 20,
  }),
});

function Index() {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageIndex: search.page,
    pageSize: search.pageSize,
  });

  const { data: { info, results = [] } = {}, isPending } = useFetchCharates({
    page: pagination.pageIndex,
  });

  useEffect(() => {
    navigate({
      search: {
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      replace: true,
    });
  }, [navigate, pagination]);

  const columns: ColumnDef<Charater>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "location.name",
      header: "Location",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  const table = useReactTable({
    data: results,
    columns,
    rowCount: info?.count,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  if (isPending) {
    return <h1 className="text-4xl m-10 font-bold">Loading...</h1>;
  }

  return (
    <div className="w-full pt-2">
      <table>
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={headerGroup.id} className="px-10 py-3">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row, index) => {
            return (
              <tr
                key={row.id}
                className={`cursor-pointer hover:bg-gray-300 ${
                  index % 2 === 0 ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  navigate({
                    to: "/$charaterId",
                    params: { charaterId: row.original.id },
                  });
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-10 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row pt-4 items-center justify-between">
        <span>
          Page {pagination.pageIndex} of {info?.pages}
        </span>
        <div className="flex gap-1">
          <button
            className="rounded px-2 py-1 hover:bg-gray-200"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded px-2 py-1 hover:bg-gray-200"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded px-2 py-1 hover:bg-gray-200"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded px-2 py-1 hover:bg-gray-200"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
