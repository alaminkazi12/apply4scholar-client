import img from "../../assets/pageImages/page-title.png";

const PageTitle = ({ title, subtitle }) => {
  return (
    <div
      className="relative bg-cover bg-center h-[330px] flex flex-col justify-center items-center text-white rounded-xl"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-2 uppercase">{title}</h1>
        {subtitle && <p className="text-xl uppercase">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageTitle;
