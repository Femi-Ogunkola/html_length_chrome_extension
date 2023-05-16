document.addEventListener("DOMContentLoaded", async function () {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: countLines,
    });

    const lineCount = result[0].result;
    displayLineCount(lineCount);
  } catch (error) {
    console.error(error);
    displayLineCount("err");
  }
});

function countLines() {
  const lineCount = document.documentElement.outerHTML.split("\n").length;
  console.log(lineCount);
  return lineCount;
}

function displayLineCount(count) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Number of lines of HTML code: " + count;
}
