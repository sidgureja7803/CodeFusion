# LeetCode Dataset Integration

## Overview

The CodeFusion platform has been successfully integrated with a comprehensive LeetCode dataset containing **1,825 problems**. This integration brings real-world coding challenges from LeetCode directly into the platform.

## What's New

### Backend Changes

#### 1. Database Schema Updates
- **New Problem Model Fields**:
  - `leetcodeId`: Original LeetCode problem ID
  - `isPremium`: Whether the problem requires premium access
  - `acceptanceRate`: Success rate of submissions
  - `frequency`: How often the problem is attempted
  - `url`: Direct link to the original LeetCode problem
  - `discussCount`: Number of discussion comments
  - `accepted`/`submissions`: Submission statistics
  - `companies`: Array of companies that ask this problem
  - `relatedTopics`: LeetCode topic tags
  - `likes`/`dislikes`: Community rating
  - `rating`: Calculated like ratio
  - `askedByFaang`: Whether asked by major tech companies
  - `similarQuestions`: Related problems

#### 2. CSV Parser Library (`backend/src/libs/csv-parser.js`)
- Parses the LeetCode dataset CSV file
- Handles data normalization and type conversion
- Provides filtering and pagination capabilities
- Converts raw CSV data to Problem model format

#### 3. Updated Problem Controller
- **Enhanced `getAllProblems`**: Now supports:
  - Pagination (`page`, `limit`)
  - Filtering by difficulty, company, topic
  - Search functionality
  - Source filtering (`leetcode`, `custom`, `all`)
- **Updated `getProblemById`**: Handles both LeetCode and custom problems
- Maintains backward compatibility with existing custom problems

#### 4. Database Population Script
- `npm run populate-leetcode`: Populate database with LeetCode problems
- `npm run populate-leetcode-force`: Force refresh existing data
- `npm run clear-leetcode`: Remove all LeetCode problems

### Frontend Changes

#### 1. Enhanced Problem Table
- **New Stats Display**: Shows acceptance rate, frequency, FAANG indicator
- **Company Tags**: Visual indicators for companies asking each problem
- **LeetCode Badge**: Distinguishes LeetCode problems from custom ones
- **Enhanced Filtering**: Support for company and topic filtering

#### 2. Updated Problem Store
- Enhanced `getProblems` method with filtering options
- Intelligent caching for better performance
- Support for paginated requests

## Dataset Details

The integrated dataset includes:
- **Total Problems**: 1,825 LeetCode problems
- **Difficulties**: Easy, Medium, Hard
- **Companies**: 100+ tech companies
- **Topics**: 50+ programming topics (Arrays, Graphs, DP, etc.)
- **Statistics**: Acceptance rates, frequency data, community ratings

### Sample Problem Data:
```json
{
  "leetcodeId": 1,
  "title": "Two Sum",
  "difficulty": "EASY",
  "acceptanceRate": 0.467,
  "companies": ["Amazon", "Google", "Apple"],
  "relatedTopics": ["Array", "Hash Table"],
  "askedByFaang": true,
  "likes": 12543,
  "rating": 0.89
}
```

## Usage Instructions

### 1. Setup (Backend)
```bash
cd backend

# Install dependencies (csv-parser already included)
npm install

# Run database migration (already done)
npx prisma migrate dev

# Populate with LeetCode problems (optional - problems load from CSV by default)
npm run populate-leetcode
```

### 2. API Endpoints

#### Get All Problems
```
GET /api/problems/get-all-problems
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)
- `difficulty`: Filter by difficulty (easy, medium, hard)
- `search`: Search in title/description
- `company`: Filter by company name
- `topic`: Filter by topic/tag
- `source`: Filter by source (leetcode, custom, all)

#### Get Problem by ID
```
GET /api/problems/get-problem/:id
```
Supports both custom UUIDs and LeetCode IDs (prefixed with `leetcode_`)

### 3. Frontend Usage

The frontend automatically handles the new data structure. Key features:

- **Problem Filtering**: Users can filter by company, topic, difficulty
- **Enhanced Display**: Shows LeetCode stats alongside problem information
- **Seamless Integration**: LeetCode and custom problems appear together
- **Performance**: Intelligent caching and pagination

## Architecture Benefits

### 1. Hybrid Approach
- **CSV-First**: Problems load directly from CSV for performance
- **Database Option**: Can optionally populate database for advanced querying
- **Flexibility**: Supports both LeetCode and custom problems simultaneously

### 2. Performance Optimizations
- **Lazy Loading**: CSV parsed only when needed
- **Caching**: Frontend caches problem lists
- **Pagination**: Efficient handling of large datasets
- **Filtering**: Server-side filtering reduces data transfer

### 3. Scalability
- **Extensible**: Easy to add more problem sources
- **Maintainable**: Clear separation between LeetCode and custom problems
- **Future-Proof**: Schema designed to accommodate additional fields

## Development Notes

### ID Convention
- **Custom Problems**: Standard UUID format
- **LeetCode Problems**: `leetcode_{original_id}` format

### Data Validation
- Difficulty values normalized to enum (EASY, MEDIUM, HARD)
- Array fields safely parsed with fallbacks
- Numeric fields validated and converted appropriately

### Error Handling
- Graceful fallback to custom problems if CSV fails
- Detailed logging for debugging
- User-friendly error messages

## Future Enhancements

1. **Auto-sync**: Periodic updates from LeetCode API
2. **Advanced Analytics**: Problem difficulty ratings, solution patterns
3. **Recommendation Engine**: Suggest problems based on user progress
4. **Contest Integration**: Support for LeetCode contest problems
5. **Multi-source**: Integration with other coding platforms

## Troubleshooting

### Common Issues

1. **CSV Not Found**: Ensure `leetcode_dataset - lc.csv` is in `backend/src/data/`
2. **Parse Errors**: Check CSV file encoding (should be UTF-8)
3. **Database Issues**: Run `npx prisma generate` to update client
4. **Frontend Display**: Clear browser cache if old data persists

### Logs
- Backend: Check console for CSV parsing messages
- Frontend: Use browser dev tools to monitor API calls

## Migration Guide

For existing installations:

1. **Database**: Run the migration (already done)
2. **Dependencies**: `npm install csv-parser` in backend
3. **Frontend**: No changes needed (backward compatible)
4. **Data**: Existing custom problems remain unchanged

## Testing

```bash
# Test CSV parsing
cd backend
npm run test-csv

# Test API endpoints
curl "http://localhost:5000/api/problems/get-all-problems?source=leetcode&limit=10"

# Test problem retrieval
curl "http://localhost:5000/api/problems/get-problem/leetcode_1"
```

The integration provides a robust foundation for coding practice with real-world problems while maintaining the flexibility to create custom challenges. 