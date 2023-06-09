const truncateStringByBytes = (str, bytes) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

function formatObject(obj, indent = 0) {
  const indentString = "  ".repeat(indent); // Indentation string for each level

  return Object.entries(obj)
    .map(function ([key, value]) {
      if (typeof value === "object" && value !== null) {
        // Recursively format nested objects
        const nested = formatObject(value, indent + 1);
        return indentString + key + ":\n" + nested;
      } else {
        // Format key-value pair
        return indentString + key + ": " + value;
      }
    })
    .join("\n");
}

const formattedText = (arr) => {
  const formattedArray = arr.map(function (obj) {
    return formatObject(obj);
  });

  return formattedArray.join("\n\n");
};

module.exports = {
  truncateStringByBytes,
  formattedText,
};
