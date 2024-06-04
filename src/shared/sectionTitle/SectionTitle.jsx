const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="flex flex-col items-center justify-center my-14 space-y-2">
      <h1 className="text-xl font-bold uppercase text-[#1A73E8]">
        .... {heading} ....
      </h1>
      <p className="text-4xl font-extrabold uppercase text-[#FF7A00]">
        {subheading}
      </p>
    </div>
  );
};

export default SectionTitle;
