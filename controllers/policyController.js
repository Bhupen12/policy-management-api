import { aggregatePoliciesByUser, findPoliciesByUsername } from "../services/policyService.js";

export const  handlePolicySearch = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const policies = await findPoliciesByUsername(username);

    if (!policies) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ policies });
  } catch (error) {
    console.error('Error searching policies:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const  handlePolicyAggregation = async (req, res) => {
  try {
    const aggregationResult = await aggregatePoliciesByUser();
    return res.status(200).json({ data: aggregationResult });
  } catch (error) {
    console.error('Error aggregating policies by user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}