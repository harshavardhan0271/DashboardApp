import { Button, Box, Select, MenuItem, Typography, FormControl, InputLabel } from '@mui/material';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      <Box>
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          sx={{ mr: 1 }}
        >
          First
        </Button>
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          sx={{ mr: 1 }}
        >
          Previous
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          sx={{ mr: 1 }}
        >
          Next
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          Last
        </Button>
      </Box>
      
      <Box display="flex" alignItems="center">
        <Typography sx={{ mr: 1 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel>Size</InputLabel>
          <Select
            value={pageSize}
            label="Size"
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}