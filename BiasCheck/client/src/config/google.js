// Google Sign-In Configuration
// Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual Google OAuth 2.0 Client ID

export const GOOGLE_CONFIG = {
  client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
  // For development, you can use a placeholder or get a real one from Google Cloud Console
};

// Instructions to get Google Client ID:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google+ API
// 4. Go to Credentials
// 5. Create OAuth 2.0 Client ID
// 6. Add your domain to authorized origins
// 7. Copy the Client ID and replace 'YOUR_GOOGLE_CLIENT_ID' above

export const GOOGLE_BUTTON_CONFIG = {
  theme: 'outline',
  size: 'large',
  type: 'standard',
  text: 'continue_with',
  shape: 'rectangular',
  logo_alignment: 'left',
  width: '100%',
}; 