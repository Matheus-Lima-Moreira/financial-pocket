"use client";

import { PaginationDto } from "@/backend/shared/dtos/pagination.dto";
import { UserFilterDto, userReadAllAction } from "@/backend/user/actions/user-read-all.action";
import { UserReplyDto } from "@/backend/user/dtos/user-reply.dto";
import { UserState } from "@/backend/user/enum/user-state";
import { CustomTable } from "@/components/custom-table";
import { TableAction, TableActions } from "@/components/table-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IconEdit, IconPower } from "@tabler/icons-react";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusBadge(state: UserState) {
  switch (state) {
    case UserState.ACTIVE:
      return (
        <Badge variant="outline" className="border-green-500 text-green-600">
          Ativo
        </Badge>
      );
    case UserState.INACTIVE:
      return (
        <Badge variant="outline" className="border-red-500 text-red-600">
          Inativo
        </Badge>
      );
    case UserState.INVITE_PENDING:
      return (
        <Badge variant="outline" className="border-zinc-300">
          Convite Pendente
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          {state}
        </Badge>
      );
  }
}

const columns: ColumnDef<UserReplyDto>[] = [
  {
    accessorKey: "name",
    id: "user",
    header: "Usuário",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="px-2 flex items-center gap-3 w-full">
          <Avatar className="size-9">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-zinc-200 text-zinc-700 text-xs font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-900">{user.name}</span>
            <span className="text-xs text-zinc-500">{user.email}</span>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    id: "status",
    header: "Status",
    size: 120,
    minSize: 100,
    maxSize: 150,
    cell: ({ row }) => {
      return <div className="px-2">{getStatusBadge(row.original.state)}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    size: 100,
    minSize: 100,
    maxSize: 100,
    cell: ({ row }) => {
      const user = row.original;
      const isActive = user.state === UserState.ACTIVE;
      const isInvitePending = user.state === UserState.INVITE_PENDING;

      const actions: TableAction[] = [
        {
          label: "Editar",
          icon: IconEdit,
          href: `/dashboard/usuarios/editar?id=${user.id}`,
        },
        {
          label: isActive ? "Inativar" : "Ativar",
          icon: IconPower,
          variant: "destructive",
          disabled: isInvitePending,
          onClick: () => {
            // TODO: Implementar ativar/inativar
            console.log(isActive ? "Inativar:" : "Ativar:", user.id);
          },
        },
      ];

      return (
        <div className="px-2">
          <TableActions actions={actions} />
        </div>
      );
    },
  }
];

export default function UserListTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UserReplyDto[]>([]);
  const [pagination, setPagination] = useState<PaginationDto>({
    size: 10,
    total: 0,
    current: 1,
    next: 1,
    previous: 1,
  });

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  async function fetchData(page: number = 1, filter?: UserFilterDto) {
    setIsLoading(true);
    const result = await userReadAllAction({ page, ...filter });

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

  function handleTabChange(value: string) {
    setActiveTab(value);
    setSearchInput("");
    setSearch("");
    const filter: UserFilterDto = {};

    if (value === "active") {
      filter.state = UserState.ACTIVE;
    } else if (value === "inactive") {
      filter.state = UserState.INACTIVE;
    }

    fetchData(1, filter);
  }

  function handleSearch(value: string) {
    setSearch(value);
    const filter: UserFilterDto = {};
    if (value.trim()) {
      filter.name = value;
    }

    if (activeTab === "active") {
      filter.state = UserState.ACTIVE;
    } else if (activeTab === "inactive") {
      filter.state = UserState.INACTIVE;
    }

    fetchData(1, filter);
  }

  function handleRemoveSearchFilter() {
    setSearchInput("");
    setSearch("");
    const filter: UserFilterDto = {};

    if (activeTab === "active") {
      filter.state = UserState.ACTIVE;
    } else if (activeTab === "inactive") {
      filter.state = UserState.INACTIVE;
    }

    fetchData(1, filter);
  }

  function handlePreviousPage() {
    const prevPage = pagination.previous;

    if (prevPage > 0 && prevPage < pagination.current) {
      const filter: UserFilterDto = {};
      if (search.trim()) {
        filter.name = search;
      }

      if (activeTab === "active") {
        filter.state = UserState.ACTIVE;
      } else if (activeTab === "inactive") {
        filter.state = UserState.INACTIVE;
      }

      fetchData(prevPage, filter);
    }
  }

  function handleNextPage() {
    if (pagination.next && pagination.next !== pagination.current) {
      const newPage = pagination.next;
      const filter: UserFilterDto = {};
      if (search.trim()) {
        filter.name = search;
      }

      if (activeTab === "active") {
        filter.state = UserState.ACTIVE;
      } else if (activeTab === "inactive") {
        filter.state = UserState.INACTIVE;
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
      emptyMessage="Nenhum usuário encontrado"
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
      isLoading={isLoading}
      rowHeight="lg"
      tabs={{
        value: activeTab,
        onChange: handleTabChange,
        items: [
          { value: "all", label: "Todos" },
          { value: "active", label: "Ativos" },
          { value: "inactive", label: "Inativos" },
        ],
      }}
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