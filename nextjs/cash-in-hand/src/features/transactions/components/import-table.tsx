import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { TableHeadSelect } from './table-head-select';

type ImportTableProps = {
  selectedColumns: Record<string, string | null>;
  headers: string[];
  body: string[][];
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
};

export function ImportTable({
  selectedColumns,
  headers,
  body,
  onTableHeadSelectChange,
}: ImportTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow className="p-4">
            {headers.map((_header: string, index: number) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], index: number) => (
            <TableRow key={index}>
              {row.map((cell: string, index: number) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
