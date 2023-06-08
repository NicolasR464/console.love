import Doughnut from "./Doughnut";

const getData = async () => {
  const res = await fetch(`${process.env.HOSTNAME}/api/stats/total_langs`);
  const data = await res.json();
  return data;
};

export default async function Stats() {
  const statsLanguages = await getData();
  console.log(statsLanguages);

  return (
    <section>
      <Doughnut langs={statsLanguages} />
    </section>
  );
}
