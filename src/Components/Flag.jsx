export default function Flag({ countryCode }) {
  return countryCode ? <span className={`fi fi-${countryCode}`} /> : null;
}