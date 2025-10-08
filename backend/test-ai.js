// Test AI Assistant configuration script
require('dotenv').config();
const OpenAI = require('openai');

async function testAIML() {
  console.log('🧪 Testing AIML API configuration...');
  
  // Get API key from environment variables
  const apiKey = process.env.AIMLAPI_GPT5;
  
  // Check if API key is available
  if (!apiKey) {
    console.error('❌ AIMLAPI_GPT5 is not configured in environment variables');
    return;
  }
  
  console.log(`🔑 Using API key from AIMLAPI_GPT5: ${apiKey.substring(0, 5)}...`);
  
  try {
    // Create OpenAI client with AIMLAPI configuration
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.aimlapi.com/v1',
    });
    
    console.log('🔄 Making test API call to AIMLAPI...');
    
    // Make a simple test request
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant for CodeFusion." },
        { role: "user", content: "Hello! This is a test message to verify the AIML API connection." },
      ],
      model: "openai/gpt-5-2025-08-07", // Use AIMLAPI's GPT-5 model
      stream: false,
      temperature: 0.5,
      max_tokens: 50,
    });
    
    console.log('✅ API call successful!');
    console.log('📝 Response:', completion.choices[0].message.content);
    
    return true;
  } catch (error) {
    console.error('❌ AIML API test failed:', error);
    
    // Provide helpful troubleshooting guidance
    console.log('\n🔍 Troubleshooting tips:');
    
    if (error.message.includes('401')) {
      console.log('- Authentication failed. Check your AIMLAPI_GPT5 API key.');
      console.log('- Make sure you\'re using a valid API key from AIML.com.');
    } else if (error.message.includes('429')) {
      console.log('- Rate limit exceeded. Try again later or check your subscription limits.');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.log('- Network connection issue. Check your internet connection.');
      console.log('- Make sure you can reach api.aimlapi.com.');
    }
    
    return false;
  }
}

// Run the test
testAIML();
