"use client";

import { PaginationDto } from "@/backend/shared/dtos/pagination.dto";
import { EmptyState } from "@/components/empty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconAdjustments, IconChevronLeft, IconChevronRight, IconSearch, IconX } from "@tabler/icons-react";
import { ColumnDef, flexRender, Table as TanstackTable } from "@tanstack/react-table";
import * as React from "react";

type CustomTableProps<T> = {
  table: TanstackTable<T>;
  columns: ColumnDef<T>[];
  data: T[];
  pagination: PaginationDto;
  emptyMessage: string;
  onPreviousPage: () => void;
  onNextPage: () => void;
  search?: {
    value: string;
    onChange: (value: string) => void;
    onSearch: (value: string) => void;
    placeholder?: string;
  };
  activeFilters?: Array<{
    label: string;
    value: string;
    onRemove: () => void;
  }>;
  filters?: {
    items: Array<{
      label: string;
      onClick: () => void;
    }>;
  };
  tabs?: {
    value: string;
    onChange: (value: string) => void;
    items: Array<{
      value: string;
      label: string;
    }>;
  };
  rowHeight?: "sm" | "md" | "lg";
  isLoading?: boolean;
  skeletonRows?: number;
};

function getColumnWidthClass(columnId: string | undefined): string {
  if (columnId === 'user') {
    return 'w-full';
  }
  return '';
}

function getColumnStyle(columnDef: ColumnDef<any>): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (columnDef.minSize) {
    style.minWidth = `${columnDef.minSize}px`;
  }

  if (columnDef.maxSize) {
    style.maxWidth = `${columnDef.maxSize}px`;
  }

  if (columnDef.size) {
    style.width = `${columnDef.size}px`;
  }

  return style;
}

function renderSkeletonRows(
  columns: ColumnDef<any>[],
  rowCount: number,
  rowHeightClass: string,
  rowPaddingClass: string
) {
  return Array.from({ length: rowCount }).map((_, rowIndex) => (
    <TableRow key={`skeleton-${rowIndex}`} className={`border-b border-zinc-200 ${rowHeightClass}`}>
      {columns.map((column, colIndex) => {
        const widthClass = getColumnWidthClass(column.id as string);
        const columnStyle = getColumnStyle(column);
        return (
          <TableCell
            key={`skeleton-${rowIndex}-${colIndex}`}
            className={`border-r border-zinc-200 ${colIndex === 0 ? 'border-l-0' : ''} ${widthClass} last:border-r-0 p-0! ${rowPaddingClass}`}
            style={columnStyle}
          >
            <div className="px-2">
              <Skeleton className="h-4 w-full" />
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  ));
}

export function CustomTable<T>({
  table,
  columns,
  data,
  pagination,
  emptyMessage,
  onPreviousPage,
  onNextPage,
  search,
  activeFilters,
  filters,
  tabs,
  rowHeight = "sm",
  isLoading = false,
  skeletonRows = 5,
}: CustomTableProps<T>) {
  const rowHeightConfig = {
    sm: { height: "h-9", padding: "py-1.5" },
    md: { height: "h-12", padding: "py-2" },
    lg: { height: "h-16", padding: "py-3" },
  };

  const { height: rowHeightClass, padding: rowPaddingClass } = rowHeightConfig[rowHeight];
  return (
    <div className="overflow-hidden rounded-0 border-t border-b border-zinc-200 h-full flex flex-col">
      {tabs && (
        <div className="bg-gray-50 border-b border-zinc-200">
          <Tabs value={tabs.value} className="px-0" onValueChange={tabs.onChange}>
            <TabsList variant="line" className="w-fit">
              {tabs.items.map((tab) => (
                <TabsTrigger
                  className="cursor-pointer"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}
      <Table className="flex-1">
        <TableHeader className="bg-muted [&_tr]:border-b [&_tr]:border-zinc-200">
          {search && (
            <TableRow className="bg-white hover:bg-white">
              <TableHead colSpan={columns.length} className="border-r-0 px-2 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        search.onSearch(search.value);
                      }}
                      className="relative max-w-xs w-full"
                    >
                      <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground z-10" />
                      <Input
                        type="text"
                        placeholder={search.placeholder || "Buscar..."}
                        value={search.value}
                        onChange={(e) => search.onChange(e.target.value)}
                        className="h-9 pl-8 pr-8 text-sm border-zinc-300 outline-amber-300 md:pr-8"
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 hover:bg-transparent md:hidden"
                      >
                        <IconSearch className="size-4 text-muted-foreground" />
                      </Button>
                    </form>
                    {activeFilters && activeFilters.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {activeFilters.map((filter, index) => (
                          <Badge
                            key={index}

                            variant="outline"
                            className="flex border-zinc-300 items-center gap-1.5 px-2 py-0.5 font-normal cursor-pointer hover:bg-muted h-8"
                            onClick={filter.onRemove}
                          >
                            <span className="font-semibold">
                              {filter.label}</span>
                            {filter.value}
                            <IconX className="size-3" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  {filters && filters.items.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9 border-zinc-300 text-sm font-semibold">
                          <IconAdjustments className="size-4" />
                          Filtros
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {filters.items.map((filter, index) => (
                          <DropdownMenuItem key={index} onClick={filter.onClick}>
                            {filter.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </TableHead>
            </TableRow>
          )}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const widthClass = getColumnWidthClass(header.id);
                const columnStyle = getColumnStyle(header.column.columnDef);

                return (
                  <TableHead
                    key={header.id}
                    className={`border-r border-zinc-200 ${index === 0 ? 'border-l-0' : ''} ${widthClass} last:border-r-0 font-semibold text-zinc-800 p-0! py-1.5`}
                    style={columnStyle}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="px-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {isLoading ? (
            renderSkeletonRows(columns, skeletonRows, rowHeightClass, rowPaddingClass)
          ) : (
            <>
              {data.length > 0 && (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className={`border-b border-zinc-200 ${rowHeightClass}`}>
                    {row.getVisibleCells().map((cell, index) => {
                      const widthClass = getColumnWidthClass(cell.column.id);
                      const columnStyle = getColumnStyle(cell.column.columnDef);

                      return (
                        <TableCell
                          key={cell.id}
                          className={`border-r border-zinc-200 ${index === 0 ? 'border-l-0' : ''} ${widthClass} last:border-r-0 p-0! ${rowPaddingClass}`}
                          style={columnStyle}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
              {data.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <EmptyState message={emptyMessage} />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="border-t border-zinc-200">
            <TableCell colSpan={columns.length}>
              <div className="w-full flex items-center justify-between">
                <div className="flex text-zinc-700">
                  Página {pagination.current} de {pagination.total} página(s)
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-zinc-800 border border-zinc-200"
                    onClick={onPreviousPage}
                    disabled={pagination.previous <= 0 || pagination.previous >= pagination.current}
                  >
                    <IconChevronLeft /> Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-zinc-800 border border-zinc-200"
                    onClick={onNextPage}
                    disabled={!pagination.next || pagination.next === pagination.current}
                  >
                    Próxima <IconChevronRight />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

