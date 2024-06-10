const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="flex flex-col items-center justify-center my-6 md:my-14 space-y-2">
      <h1 className=" text-[8px] md:text-xl font-bold uppercase text-[#1A73E8]">
        .... {heading} ....
      </h1>
      <p className=" text-[10px] md:text-3xl lg:text-4xl font-extrabold uppercase text-[#FF7A00] text-center w-[90%] mx-auto">
        {subheading}
      </p>
    </div>
  );
};

export default SectionTitle;
