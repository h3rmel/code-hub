import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { cn, convertAmountToMiliunits } from '@/lib/utils';

import { ImportTable } from './import-table';
import { format, parse } from 'date-fns';

const dateFormat = 'yyyy-MM-dd HH:mm:ss';
const outputFormat = 'yyyy-MM-dd';

const requiredColumns = ['amount', 'date', 'payee'];

type SelectedColumnsState = Record<string, string | null>;

type ImportSectionProps = {
  onCancelImport: () => void;
  importResults: {
    data: string[][];
    errors: string[];
    meta: Record<string, unknown>;
  };
  onSubmitImport: (data: any[]) => void;
};

export function ImportSection({
  onCancelImport,
  importResults,
  onSubmitImport,
}: ImportSectionProps) {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {},
  );

  const headers = importResults.data[0];
  const body = importResults.data.slice(1);

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  function handleContinue() {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);

        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);

            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };
    
    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];

        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => {
      return {
        ...item,
        amount: convertAmountToMiliunits(parseFloat(item.amount)),
        date: format(
          parse(item.date, dateFormat, new Date()),
          outputFormat,
        ),
      };
    });

    onSubmitImport(formattedData);
  }

  function onTableHeadSelectChange(columnIndex: number, value: string | null) {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === 'skip') {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;

      return newSelectedColumns;
    });
  }

  return (
    <>
      <hgroup
        className={cn(
          'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2',
        )}
      >
        <h2
          className={cn('text-2xl font-semibold tracking-tight line-clamp-1')}
        >
          Import Transactions
        </h2>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="w-full lg:w-auto"
            onClick={onCancelImport}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="w-full lg:w-auto"
            onClick={handleContinue}
            disabled={progress < requiredColumns.length}
          >
            Continue ({progress} / {requiredColumns.length})
          </Button>
        </div>
      </hgroup>
      <ImportTable
        headers={headers}
        body={body}
        selectedColumns={selectedColumns}
        onTableHeadSelectChange={onTableHeadSelectChange}
      />
    </>
  );
}
