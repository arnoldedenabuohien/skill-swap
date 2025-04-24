import axios from 'axios';

const API_URL = 'http://localhost:5001/api/swaps';

export interface InterestedUser {
  name: string;
  email: string;
  preferredTime: string;
  preferredLocation: string;
}

export interface SkillSwap {
  _id: string;
  studentName: string;
  department: string;
  canHelpWith: string;
  needsHelpWith: string;
  notes: string;
  postedAt: string;
  interestedUsers: InterestedUser[];
}

export const fetchSwaps = async (): Promise<SkillSwap[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createSwap = async (swapData: Omit<SkillSwap, '_id' | 'postedAt' | 'interestedUsers'>): Promise<SkillSwap> => {
  const response = await axios.post(API_URL, swapData);
  return response.data;
};

export const addInterestedUser = async (swapId: string, userData: InterestedUser): Promise<SkillSwap> => {
  try {
    console.log(`Submitting interest for swap ${swapId}:`, userData);
    console.log(`API URL: ${API_URL}/${swapId}/interested`);
    
    // Log the request headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const response = await axios.post(`${API_URL}/${swapId}/interested`, userData, config);
    console.log('Interest submission successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in addInterestedUser:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Request data:', error.config?.data);
      console.error('Request URL:', error.config?.url);
    }
    throw error;
  }
};

export const deleteSwap = async (swapId: string): Promise<void> => {
  try {
    console.log(`Deleting swap ${swapId}`);
    await axios.delete(`${API_URL}/${swapId}`);
    console.log('Swap deleted successfully');
  } catch (error) {
    console.error('Error in deleteSwap:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
};

export const updateSwap = async (swapId: string, swapData: Partial<SkillSwap>): Promise<SkillSwap> => {
  try {
    console.log(`Updating swap ${swapId}:`, swapData);
    const response = await axios.put(`${API_URL}/${swapId}`, swapData);
    console.log('Swap updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in updateSwap:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
};

export const deleteInterestedUser = async (swapId: string, userIndex: number): Promise<SkillSwap> => {
  try {
    console.log(`Deleting interested user at index ${userIndex} from swap ${swapId}`);
    const response = await axios.delete(`${API_URL}/${swapId}/interested/${userIndex}`);
    console.log('Interested user deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in deleteInterestedUser:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
};

export const updateInterestedUser = async (
  swapId: string, 
  userIndex: number, 
  userData: Partial<InterestedUser>
): Promise<SkillSwap> => {
  try {
    console.log(`Updating interested user at index ${userIndex} in swap ${swapId}:`, userData);
    const response = await axios.put(`${API_URL}/${swapId}/interested/${userIndex}`, userData);
    console.log('Interested user updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in updateInterestedUser:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
}; 