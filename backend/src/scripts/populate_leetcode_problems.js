import { db } from "../libs/db.js";
import { parseLeetCodeCSV } from "../libs/csv-parser.js";

const populateLeetCodeProblems = async () => {
  try {
    console.log("🚀 Starting LeetCode problems population...");
    
    // Parse the CSV data
    const problems = await parseLeetCodeCSV();
    console.log(`📊 Found ${problems.length} problems in CSV`);

    // Check how many LeetCode problems are already in the database
    const existingCount = await db.problem.count({
      where: {
        leetcodeId: { not: null }
      }
    });

    console.log(`💾 Found ${existingCount} LeetCode problems already in database`);

    if (existingCount > 0) {
      console.log("⚠️  LeetCode problems already exist in database. Skipping population.");
      console.log("   Use --force flag to overwrite existing problems.");
      return;
    }

    // Insert problems in batches to avoid memory issues
    const batchSize = 100;
    let insertedCount = 0;

    for (let i = 0; i < problems.length; i += batchSize) {
      const batch = problems.slice(i, i + batchSize);
      
      console.log(`📝 Inserting batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(problems.length/batchSize)} (${batch.length} problems)`);
      
      try {
        await db.problem.createMany({
          data: batch.map(problem => ({
            ...problem,
            id: `leetcode_${problem.leetcodeId}`, // Use consistent ID format
          })),
          skipDuplicates: true, // Skip if duplicate IDs exist
        });
        
        insertedCount += batch.length;
      } catch (batchError) {
        console.error(`❌ Error inserting batch ${Math.floor(i/batchSize) + 1}:`, batchError.message);
        
        // Try inserting one by one to identify problematic records
        for (const problem of batch) {
          try {
            await db.problem.create({
              data: {
                ...problem,
                id: `leetcode_${problem.leetcodeId}`,
              }
            });
            insertedCount++;
          } catch (singleError) {
            console.error(`❌ Failed to insert problem ${problem.leetcodeId}: ${problem.title}`, singleError.message);
          }
        }
      }
    }

    console.log(`✅ Successfully populated ${insertedCount} LeetCode problems!`);
    
  } catch (error) {
    console.error("❌ Error populating LeetCode problems:", error);
    throw error;
  }
};

const clearLeetCodeProblems = async () => {
  try {
    console.log("🗑️  Clearing existing LeetCode problems...");
    
    const deleteResult = await db.problem.deleteMany({
      where: {
        leetcodeId: { not: null }
      }
    });

    console.log(`✅ Deleted ${deleteResult.count} LeetCode problems`);
  } catch (error) {
    console.error("❌ Error clearing LeetCode problems:", error);
    throw error;
  }
};

// Main execution
const main = async () => {
  const args = process.argv.slice(2);
  const forceFlag = args.includes('--force');
  const clearFlag = args.includes('--clear');

  try {
    if (clearFlag) {
      await clearLeetCodeProblems();
      return;
    }

    if (forceFlag) {
      console.log("🔄 Force flag detected. Clearing existing LeetCode problems first...");
      await clearLeetCodeProblems();
    }

    await populateLeetCodeProblems();
    
  } catch (error) {
    console.error("💥 Script failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
};

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { populateLeetCodeProblems, clearLeetCodeProblems }; 