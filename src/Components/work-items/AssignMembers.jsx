import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Input } from '@mui/joy';
import { Add, Person } from '@mui/icons-material';

// Example function to fetch members based on search query (replace with your actual API call)
const fetchMembers = async (query) => {
  // Perform API call to fetch members based on search query
  // Return dummy data for demonstration purposes
  return [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    // Add more members as needed
  ];
};

export default function AssignMembers() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  
  // Function to handle search input change
  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      // Fetch members based on search query
      const members = await fetchMembers(query);
      setSearchResults(members);
    } else {
      setSearchResults([]); // Clear search results if query is empty
    }
  };

  // Function to handle adding a member to the work item
  const handleAddMember = (member) => {
    // Perform logic to add the selected member to the work item
    console.log('Added member:', member);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        <Person /> Assign Member To
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', paddingTop: "10px"}}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 800,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Add Members to This Work Item
          </Typography>
          <div className="flex">
            <Input
              placeholder='Search'
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {/* Display search results */}
          {searchResults.map(member => (
            <div key={member.id} className="flex items-center my-2 justify-between">
              <Person className="mr-2 " />
              <Typography>{member.name}</Typography>
              <Button
                variant="outlined"
                color="primary"
                className="ml-auto"
                onClick={() => handleAddMember(member)}
              >
                Add
              </Button>
            </div>
          ))}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
