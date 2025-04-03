import { Upload } from 'lucide-react';
import { useCSVReader } from 'react-papaparse';

import { Button } from '@/components/ui/button';

type UploadButtonProps = {
  onUpload: (results: any) => void;
};

export function UploadButton({ onUpload }: UploadButtonProps) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button className="w-full lg:w-auto" size="sm" {...getRootProps()}>
          <Upload className="size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
}
