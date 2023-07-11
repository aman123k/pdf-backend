const extractStrings = (obj) => {
  const strings = [];
  for (const key in obj) {
    if (
      typeof obj[key] === "string" &&
      !(obj[key] === "ltr") &&
      !(obj[key] === "Times")
    ) {
      strings.push(obj.str);
    } else if (typeof obj[key] === "object") {
      strings.push(...extractStrings(obj[key]));
    }
  }
  return strings;
};
export default extractStrings;
