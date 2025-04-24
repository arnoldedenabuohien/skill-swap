import SkillSwap from '../models/SkillSwap.js';

// Get all skill swaps
export const getAllSwaps = async (req, res) => {
  try {
    const swaps = await SkillSwap.find().sort({ postedAt: -1 });
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new skill swap
export const createSwap = async (req, res) => {
  const swap = new SkillSwap({
    studentName: req.body.studentName,
    department: req.body.department,
    canHelpWith: req.body.canHelpWith,
    needsHelpWith: req.body.needsHelpWith,
    notes: req.body.notes
  });

  try {
    const newSwap = await swap.save();
    res.status(201).json(newSwap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add an interested user to a swap
export const addInterestedUser = async (req, res) => {
  try {
    console.log('Adding interested user to swap:', req.params.id);
    console.log('User data:', req.body);
    
    // Validate required fields
    const { name, email, preferredTime, preferredLocation } = req.body;
    if (!name || !email || !preferredTime || !preferredLocation) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          preferredTime: !preferredTime ? 'Preferred time is required' : null,
          preferredLocation: !preferredLocation ? 'Preferred location is required' : null
        }
      });
    }
    
    const swap = await SkillSwap.findById(req.params.id);
    
    if (!swap) {
      console.log('Swap not found:', req.params.id);
      return res.status(404).json({ message: 'Skill swap not found' });
    }
    
    const interestedUser = {
      name,
      email,
      preferredTime,
      preferredLocation
    };
    
    swap.interestedUsers.push(interestedUser);
    const updatedSwap = await swap.save();
    
    console.log('Successfully added interested user to swap');
    res.status(200).json(updatedSwap);
  } catch (error) {
    console.error('Error adding interested user:', error);
    res.status(400).json({ 
      message: 'Failed to add interested user',
      error: error.message
    });
  }
};

// Delete a skill swap
export const deleteSwap = async (req, res) => {
  try {
    console.log('Deleting skill swap:', req.params.id);
    
    const swap = await SkillSwap.findById(req.params.id);
    
    if (!swap) {
      console.log('Swap not found:', req.params.id);
      return res.status(404).json({ message: 'Skill swap not found' });
    }
    
    await SkillSwap.findByIdAndDelete(req.params.id);
    console.log('Successfully deleted skill swap');
    
    res.status(200).json({ message: 'Skill swap deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill swap:', error);
    res.status(400).json({ 
      message: 'Failed to delete skill swap',
      error: error.message
    });
  }
};

// Update a skill swap
export const updateSwap = async (req, res) => {
  try {
    console.log('Updating skill swap:', req.params.id);
    console.log('Update data:', req.body);
    
    const swap = await SkillSwap.findById(req.params.id);
    
    if (!swap) {
      console.log('Swap not found:', req.params.id);
      return res.status(404).json({ message: 'Skill swap not found' });
    }
    
    // Update fields
    if (req.body.studentName) swap.studentName = req.body.studentName;
    if (req.body.department) swap.department = req.body.department;
    if (req.body.canHelpWith) swap.canHelpWith = req.body.canHelpWith;
    if (req.body.needsHelpWith) swap.needsHelpWith = req.body.needsHelpWith;
    if (req.body.notes !== undefined) swap.notes = req.body.notes;
    
    const updatedSwap = await swap.save();
    console.log('Successfully updated skill swap');
    
    res.status(200).json(updatedSwap);
  } catch (error) {
    console.error('Error updating skill swap:', error);
    res.status(400).json({ 
      message: 'Failed to update skill swap',
      error: error.message
    });
  }
};

// Delete an interested user from a swap
export const deleteInterestedUser = async (req, res) => {
  try {
    console.log('Deleting interested user from swap:', req.params.id);
    console.log('User index:', req.params.userIndex);
    
    const swap = await SkillSwap.findById(req.params.id);
    
    if (!swap) {
      console.log('Swap not found:', req.params.id);
      return res.status(404).json({ message: 'Skill swap not found' });
    }
    
    const userIndex = parseInt(req.params.userIndex);
    
    if (isNaN(userIndex) || userIndex < 0 || userIndex >= swap.interestedUsers.length) {
      return res.status(400).json({ message: 'Invalid user index' });
    }
    
    // Remove the user at the specified index
    swap.interestedUsers.splice(userIndex, 1);
    const updatedSwap = await swap.save();
    
    console.log('Successfully deleted interested user');
    res.status(200).json(updatedSwap);
  } catch (error) {
    console.error('Error deleting interested user:', error);
    res.status(400).json({ 
      message: 'Failed to delete interested user',
      error: error.message
    });
  }
};

// Update an interested user in a swap
export const updateInterestedUser = async (req, res) => {
  try {
    console.log('Updating interested user in swap:', req.params.id);
    console.log('User index:', req.params.userIndex);
    console.log('Update data:', req.body);
    
    const swap = await SkillSwap.findById(req.params.id);
    
    if (!swap) {
      console.log('Swap not found:', req.params.id);
      return res.status(404).json({ message: 'Skill swap not found' });
    }
    
    const userIndex = parseInt(req.params.userIndex);
    
    if (isNaN(userIndex) || userIndex < 0 || userIndex >= swap.interestedUsers.length) {
      return res.status(400).json({ message: 'Invalid user index' });
    }
    
    // Update fields
    if (req.body.name) swap.interestedUsers[userIndex].name = req.body.name;
    if (req.body.email) swap.interestedUsers[userIndex].email = req.body.email;
    if (req.body.preferredTime) swap.interestedUsers[userIndex].preferredTime = req.body.preferredTime;
    if (req.body.preferredLocation) swap.interestedUsers[userIndex].preferredLocation = req.body.preferredLocation;
    
    const updatedSwap = await swap.save();
    console.log('Successfully updated interested user');
    
    res.status(200).json(updatedSwap);
  } catch (error) {
    console.error('Error updating interested user:', error);
    res.status(400).json({ 
      message: 'Failed to update interested user',
      error: error.message
    });
  }
}; 