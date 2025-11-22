export default function convertNumber(num) {
  if (num < 1000) {
    // Just return with commas
    return num.toLocaleString();
  } 
  else if (num < 1_000_000) {
    return (num / 1000).toFixed(1) + "K";
  } 
  else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } 
  else if (num < 1_000_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } 
  else {
    return (num / 1_000_000_000_000).toFixed(1) + "T";
  }
}
