import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../api';
import type { User } from '../api/types'; // Added 'type' keyword
import { Button, Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await fetchUsers();
        setUser(users[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading user:', error);
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        
        {loading ? (
          <Typography>Loading profile...</Typography>
        ) : user ? (
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {user.name}
              </Typography>
              
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                @{user.username}
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone" secondary={user.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Website" secondary={user.website} />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Address" 
                    secondary={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Company" 
                    secondary={`${user.company.name} - ${user.company.catchPhrase}`} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        ) : (
          <Typography>No user data available</Typography>
        )}
      </Box>
    </Container>
  );
}