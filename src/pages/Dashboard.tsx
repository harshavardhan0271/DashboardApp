import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchComments } from '../api';
import type { Comment, SortDirection, SortField } from '../api/types';
import CommentTable from '../components/CommentTable';
import SearchBar from '../components/SearchBar';
import PaginationControls from '../components/PaginationControls';
import { Button, Container, Typography, Box } from '@mui/material';

export default function Dashboard() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments();
        setComments(data);
        setFilteredComments(data);
        setLoading(false);
        
        const persistedState = localStorage.getItem('dashboardState');
        if (persistedState) {
          const { searchTerm, sortField, sortDirection, currentPage, pageSize } = JSON.parse(persistedState);
          setSearchTerm(searchTerm || '');
          setSortField(sortField || '');
          setSortDirection(sortDirection || undefined);
          setCurrentPage(currentPage || 1);
          setPageSize(pageSize || 10);
        }
      } catch (error) {
        console.error('Error loading comments:', error);
        setLoading(false);
      }
    };

    loadComments();
  }, []);

  useEffect(() => {
    let result = [...comments];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(comment => 
        comment.name.toLowerCase().includes(term) ||
        comment.email.toLowerCase().includes(term) ||
        comment.body.toLowerCase().includes(term)
      );
    }
    
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        const aValue = a[sortField as keyof Comment];
        const bValue = b[sortField as keyof Comment];
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setFilteredComments(result);
    setCurrentPage(1);
    
    const stateToPersist = {
      searchTerm,
      sortField,
      sortDirection,
      currentPage,
      pageSize
    };
    localStorage.setItem('dashboardState', JSON.stringify(stateToPersist));
  }, [comments, searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field !== sortField) {
      setSortField(field);
      setSortDirection('asc');
    } else {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField('');
        setSortDirection(undefined);
      } else {
        setSortDirection('asc');
      }
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredComments.length / pageSize);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Comments Dashboard
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/profile')}
          sx={{ mb: 2 }}
        >
          View Profile
        </Button>
        
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        
        {loading ? (
          <Typography>Loading comments...</Typography>
        ) : (
          <>
            <CommentTable 
              comments={paginatedComments} 
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </Box>
    </Container>
  );
}