import { CSV } from "https://js.sabae.cc/CSV.js";
import { Time } from "https://js.sabae.cc/DateTime.js";

const data = CSV.toJSON(await CSV.fetch("2022-06-10_tks-community.csv"));
const parseTime = (s) => {
  const t = s.substring(s.indexOf("&t=") + 3);
  return new Time(t);
};
for (let i = 0; i < data.length - 1; i++) {
  const d = data[i];
  const d2 = data[i + 1];
  d.duration = parseTime(d2.url).sub(parseTime(d.url)).toString();
}
data.pop();
console.log(data);
await Deno.writeTextFile("2022-06-10_tks-community.json", JSON.stringify(data, null, 2));
