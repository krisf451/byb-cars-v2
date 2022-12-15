const NavMenuCircleEffect = () => (
  <div className="animate-[spin_30s_linear_infinite] absolute -z-10 h-[400px] w-[400px] md:h-[500px] md:w-[500px] lg:h-[650px] lg:w-[650px] 2xl:h-[800px] 2xl:w-[800px] bg-transparent border-2 border-darkBg dark:border-white rounded-full shadow-md shadow-black dark:shadow-white">
    <div className="absolute -left-3 top-1/2 h-5 w-5 bg-red-600 rounded-full" />
    <div className="absolute -right-3 top-1/2 h-5 w-5 bg-red-600 rounded-full" />
  </div>
);

export default NavMenuCircleEffect;
