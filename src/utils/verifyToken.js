import jwt from "jsonwebtoken"; // Assuming you're using the jsonwebtoken library

// This function verifies the token and returns user data if valid
async function verifyToken(authToken) {
  try {
    // Replace 'your-secret-key' with your actual secret key used for signing tokens
    const decoded = await jwt.verify(authToken, process.env.NEXTAUTH_SECRET);

    // Return the decoded user data
    return decoded;
  } catch (error) {
    // Token verification failed
    return null;
  }
}

export default verifyToken;
