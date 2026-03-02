"use client";

import { PaginationDTO } from "@/backend/shared/dtos/reply.dto";
import { EmptyState } from "./empty";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";


export type CaroonaTableItem = {
  id: string;
  label: string;
  value: unknown;
  customCell?: boolean;
  metadata?: Record<string, unknown>;
  colSpan?: number;
}

export type CaroonaTableColumn = {
  label: string;

}

export type CaroonaTableRow = {
  id: string;
  values: CaroonaTableItem[];
}

type Props = {
  tableId: string;
  columns: CaroonaTableColumn[];
  rows: CaroonaTableRow[];
  pagination: PaginationDTO;
  emptyStateMessage: string;
  onNextClick: () => void;
  onPreviousClick: () => void;
}


export default function CaroonaTable(input: Props) {

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-accent border-t">
          {input.columns.map((header) => {
            return (
              <TableHead key={`${input.tableId}-header-${header.label}`} className="text-zinc-800 px-4">
                {header.label}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {input.rows.length > 0 ? (
          input.rows.map((row, index) => (
            <TableRow key={`${input.tableId}-row-${index}`}>
              {row.values.map((cell, cellIndex) => {
                return (
                  <TableCell key={`${input.tableId}-row-${index}-cell-${cellIndex}`}>
                    {cell.value as React.ReactNode}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow className="p-10">
            <TableCell
              colSpan={input.columns.length}
              className="text-center"
            >
              <EmptyState message={input.emptyStateMessage} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {
        (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>
                <span className="text-sm text-muted-foreground">
                  Página {input.pagination.page} de{" "}
                  {input.pagination.totalPages}
                </span>
              </TableCell>
              <TableCell colSpan={input.columns.length - 1}>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={input.onPreviousClick}
                    disabled={(input.pagination.page === 1) || (input.rows.length == 0)}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={input.onNextClick}
                    disabled={(input.pagination.page === input.pagination.totalPages) || (input.rows.length == 0)}
                  >
                    Próxima
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )
      }
    </Table>
  )
}