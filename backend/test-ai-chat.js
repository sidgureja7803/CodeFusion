// Test script for AI chat integration
import dotenv from 'dotenv';
import { generateAIResponse } from './src/libs/blackbox.lib.js';

dotenv.config();

async function testAIChat() {
  console.log('🧪 Testing AI chat integration with AIMLAPI...');
  
  try {
    // Check if API key is available
    const apiKey = process.env.AIMLAPI_GPT5;
    if (!apiKey) {
      console.error('❌ AIMLAPI_GPT5 environment variable is not set');
      console.log('Please set the AIMLAPI_GPT5 environment variable with your API key');
      return false;
    }
    
    console.log('✅ AIMLAPI_GPT5 environment variable is set');
    
    // Test prompt
    const testPrompt = 'Explain the time complexity of quicksort algorithm';
    const testContext = {
      problem: { title: 'Sorting Algorithms', difficulty: 'MEDIUM' },
      language: 'JavaScript',
      userCode: 'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < pivot) left.push(arr[i]);\n    else right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}'
    };
    
    console.log('📝 Test prompt:', testPrompt);
    console.log('📝 Test context:', {
      problemTitle: testContext.problem.title,
      difficulty: testContext.problem.difficulty,
      language: testContext.language,
      codeLength: testContext.userCode.length
    });
    
    console.log('🔄 Sending request to AIMLAPI...');
    const startTime = Date.now();
    
    try {
      const response = await generateAIResponse(testPrompt, testContext);
      const endTime = Date.now();
      
      console.log('✅ Response received successfully!');
      console.log(`⏱️ Response time: ${endTime - startTime}ms`);
      console.log('📊 Response length:', response.length);
      console.log('\n📝 Response:');
      console.log('----------------------------------------');
      console.log(response);
      console.log('----------------------------------------');
      
      return true;
    } catch (error) {
      console.error('❌ Error generating AI response:', error.message);
      console.error('Full error:', error);
      
      return false;
    }
  } catch (error) {
    console.error('❌ Unexpected error during test:', error);
    return false;
  }
}

// Run the test
console.log('🚀 Starting AI chat test...');
testAIChat()
  .then(success => {
    if (success) {
      console.log('✅ AI chat test completed successfully!');
      process.exit(0);
    } else {
      console.error('❌ AI chat test failed');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
