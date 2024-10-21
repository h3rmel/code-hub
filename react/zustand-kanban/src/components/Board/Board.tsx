import { Column } from "./Column";

export const Board = () => {
  return (
    <section className="flex gap-4 w-[80%] p-4">
      <Column title="TODO" state="TODO" />
      <Column title="DOING" state="DOING" />
      <Column title="DONE" state="DONE" />
    </section>
  );
};
