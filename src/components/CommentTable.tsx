import type { Comment } from '../api/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

type SortField = 'postId' | 'name' | 'email' | '';
type SortDirection = 'asc' | 'desc' | undefined; // Changed from '' to undefined

interface CommentTableProps {
  comments: Comment[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export default function CommentTable({ comments, sortField, sortDirection, onSort }: CommentTableProps) {
  const getSortDirection = (field: SortField) => {
    return sortField === field ? sortDirection : undefined;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortField === 'postId'}
                direction={getSortDirection('postId')}
                onClick={() => onSort('postId')}
              >
                Post ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'name'}
                direction={getSortDirection('name')}
                onClick={() => onSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'email'}
                direction={getSortDirection('email')}
                onClick={() => onSort('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>{comment.postId}</TableCell>
              <TableCell>{comment.name}</TableCell>
              <TableCell>{comment.email}</TableCell>
              <TableCell>{comment.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}