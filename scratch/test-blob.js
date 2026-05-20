const { put } = require("@vercel/blob");

async function test() {
  const token = "vercel_blob_rw_65nQ8sYE7zzr4bV8_jzsetfgsHdNeyOElcfJ0jUL2mdp2zO";
  console.log("Testing new corrected token...");
  try {
    const res = await put("test.txt", "hello", {
      access: "private",
      token: token
    });
    console.log("Success with corrected token!", res.url);
  } catch (err) {
    console.error("Failed with corrected token:", err.message);
  }
}

test();
