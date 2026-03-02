"use client";

import { groupPermissionReadAllAction } from "@/backend/group-permission/actions/group-permission-read-all.action";
import { GroupPermissionFilterDto } from "@/backend/group-permission/dtos/group-permission-filter.dto";
import { GroupPermissionDto } from "@/backend/group-permission/dtos/group-permission.dto";
import { GROUP_PERMISSION_TYPE } from "@/backend/group-permission/enum/group-permission-type.enum";
import { groupPermissionLabel } from "@/backend/group-permission/helpers/group-permission-label.helper";
import { PaginationDto } from "@/backend/shared/dtos/pagination.dto";
import { CustomTable } from "@/components/custom-table";
import { TableAction, TableActions } from "@/components/table-actions";
import { Badge } from "@/components/ui/badge";
import { IconEdit } from "@tabler/icons-react";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { GroupPermissionRemoveButton } from "./group-permission-remove-button";

export default function GroupPermissionTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GroupPermissionDto[]>([]);
  const [pagination, setPagination] = useState<PaginationDto>({
    size: 10,
    total: 0,
    current: 1,
    next: 1,
    previous: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  async function fetchData(page: number = 1, filter?: GroupPermissionFilterDto) {
    setIsLoading(true);
    const result = await groupPermissionReadAllAction({ page, ...filter });

    setData(result.data || []);
    setPagination(result.pagination || {
      size: 10,
      total: 0,
      current: 1,
      next: 1,
      previous: 1,
    });
    setIsLoading(false);
  }

  function handleRefresh() {
    const filter: GroupPermissionFilterDto = {};
    if (search.trim()) {
      filter.name = search;
    }
    fetchData(currentPage, filter);
  }

  const columns: ColumnDef<GroupPermissionDto>[] = useMemo(() => [
    {
      accessorKey: "header",
      header: "Nome",
      cell: ({ row }) => {
        return <div className="px-2">{row.original.name}</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: "Tipo de plano",
      cell: ({ row }) => (
        <div className="px-2">
          <div className="w-32">
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {groupPermissionLabel(row.original.type)}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      size: 100,
      minSize: 100,
      maxSize: 100,
      cell: ({ row }) => {
        const groupPermission = row.original;
        const isSystem = groupPermission.type === GROUP_PERMISSION_TYPE.BASE_SYSTEM;

        if (isSystem) {
          return;
        }

        const actions: TableAction[] = [
          {
            label: "Editar",
            icon: IconEdit,
            href: `/dashboard/grupos-de-permissoes/editar?id=${groupPermission.id}`,
          },
        ];

        return (
          <div className="px-2 flex items-center gap-0.5">
            <TableActions actions={actions} />
            <GroupPermissionRemoveButton
              groupPermissionId={groupPermission.id}
              groupPermissionName={groupPermission.name}
              onSuccess={handleRefresh}
            />
          </div>
        );
      },
    }
  ], [search, currentPage]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
    const filter: GroupPermissionFilterDto = {};
    if (value.trim()) {
      filter.name = value;
    }
    fetchData(1, filter);
  }

  function handleRemoveSearchFilter() {
    setSearchInput("");
    setSearch("");
    fetchData(1);
  }

  function handlePreviousPage() {
    const prevPage = pagination.previous;

    if (prevPage > 0 && prevPage < pagination.current) {
      setCurrentPage(prevPage);
      const filter: GroupPermissionFilterDto = {};
      if (search.trim()) {
        filter.name = search;
      }
      fetchData(prevPage, filter);
    }
  }

  function handleNextPage() {
    if (pagination.next && pagination.next !== pagination.current) {
      const newPage = pagination.next;
      setCurrentPage(newPage);
      const filter: GroupPermissionFilterDto = {};
      if (search.trim()) {
        filter.name = search;
      }
      fetchData(newPage, filter);
    }
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <CustomTable
      table={table}
      columns={columns}
      data={data}
      pagination={pagination}
      emptyMessage="Nenhum grupo de permissão encontrado"
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
      isLoading={isLoading}
      search={{
        value: searchInput,
        onChange: setSearchInput,
        onSearch: handleSearch,
        placeholder: "Buscar por nome...",
      }}
      activeFilters={
        search.trim()
          ? [
            {
              label: `Nome:`,
              value: search,
              onRemove: handleRemoveSearchFilter,
            },
          ]
          : []
      }
    />
  );
}