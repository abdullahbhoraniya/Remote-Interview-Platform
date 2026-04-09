// 🔥 Judge0 API
const JUDGE0_API = "https://ce.judge0.com";

// ⚡ Language mapping
const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62
};

/**
 * Execute code using Judge0
 */
export async function executeCode(language, code) {
  try {

    const languageId = LANGUAGE_IDS[language];

    // ❌ Invalid language
    if (!languageId) {
      console.error("❌ Unsupported language:", language);
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }


    // ❌ Empty code check
    if (!code || code.trim() === "") {
      console.warn("⚠️ Empty code submitted");
      return {
        success: false,
        error: "Code is empty",
      };
    }

    // 🔥 STEP 1: Submit code (WAIT = TRUE → no token headache)

    const submitRes = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
          stdin: ""
        }),
      }
    );

    // 🔥 Handle HTTP errors properly
    if (!submitRes.ok) {
      const errText = await submitRes.text();
      console.error("❌ HTTP Error:", errText);

      return {
        success: false,
        error: `HTTP ${submitRes.status}: ${errText}`,
      };
    }

    // ✅ Parse response ONCE
    const data = await submitRes.json();

    const statusId = data.status?.id;

    const output = data.stdout || "";
    const stderr = data.stderr || data.compile_output || "";

    // ❌ Runtime / compile error
    if (stderr) {
      console.error("❌ Execution Error:", stderr);
      return {
        success: false,
        output,
        error: stderr,
      };
    }


    return {
      success: true,
      output: output || "No output",
    };

  } catch (error) {
    console.error("💥 Execution crashed:", error);

    return {
      success: false,
      error: `Execution failed: ${error.message}`,
    };
  }
}