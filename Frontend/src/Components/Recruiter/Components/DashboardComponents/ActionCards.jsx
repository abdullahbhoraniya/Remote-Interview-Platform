const cards = [
  { title: "New Applications", value: 8 },
  { title: "Pending Reviews", value: 5 },
  { title: "Interviews Today", value: 2 },
  { title: "Shortlisted", value: 3 }
];

const ActionCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-base-100 p-4 rounded-xl shadow"
        >
          <p className="text-sm text-base-content/60">{c.title}</p>
          <h2 className="text-2xl font-bold">{c.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default ActionCards;