const axios = require('axios');

async function testServer() {
  try {
    // Test the server
    const testResponse = await axios.get('http://localhost:5001/test');
    console.log('Test endpoint response:', testResponse.data);

    // Get all swaps
    const swapsResponse = await axios.get('http://localhost:5001/api/swaps');
    console.log('Swaps endpoint response:', swapsResponse.data);

    // Create a new swap
    const newSwap = {
      studentName: 'Test Student',
      department: 'Computer Science',
      canHelpWith: 'JavaScript',
      needsHelpWith: 'Python',
      notes: 'Test notes'
    };

    const createResponse = await axios.post('http://localhost:5001/api/swaps', newSwap);
    console.log('Create swap response:', createResponse.data);

    // Get the ID of the newly created swap
    const swapId = createResponse.data._id;

    // Add an interested user
    const interestedUser = {
      name: 'Test User',
      email: 'test@example.com',
      preferredTime: 'Afternoon',
      preferredLocation: 'Library'
    };

    const interestResponse = await axios.post(`http://localhost:5001/api/swaps/${swapId}/interested`, interestedUser);
    console.log('Add interested user response:', interestResponse.data);

    console.log('All tests passed!');
  } catch (error) {
    console.error('Error testing server:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testServer(); 